import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'

// Rendered per request so a missing key at build time is never baked in, but
// the Places API call itself is cached for a day (it is billed per call).
export const dynamic = "force-dynamic";

const PLACE_ID = 'ChIJ4RLlGhQnHzkRzxw0rAyLcko'

interface GoogleReview {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
}

interface PlaceDetailsResponse {
  result?: {
    reviews?: GoogleReview[]
  }
  status: string
}

const fetchReviews = unstable_cache(
  async (apiKey: string): Promise<GoogleReview[] | null> => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=review&key=${apiKey}`
    )
    const data = await response.json() as PlaceDetailsResponse
    if (data.status !== 'OK' || !data.result?.reviews) {
      // Throwing skips caching, so a transient API error isn't kept for a day.
      throw new Error(`Places API status ${data.status}`)
    }
    return data.result.reviews
  },
  ['google-reviews'],
  { revalidate: 86400 }
)

export async function GET() {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'Google Maps API key not configured', reviews: [] },
      { status: 500 }
    )
  }

  try {
    const reviews = await fetchReviews(API_KEY)
    const filteredReviews = (reviews ?? []).filter(
      (review) => review.rating >= 4
    )

    return NextResponse.json(
      { reviews: filteredReviews },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } }
    )
  } catch (error) {
    console.error('Google Places API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews', reviews: [] },
      { status: 500 }
    )
  }
}