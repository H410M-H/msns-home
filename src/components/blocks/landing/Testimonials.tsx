'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '~/components/ui/button'

interface GoogleReview {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
}

interface ApiResponse {
  reviews: GoogleReview[]
}

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [supportsLazyLoading, setSupportsLazyLoading] = useState(true)

  useEffect(() => {
    setSupportsLazyLoading('loading' in HTMLIFrameElement.prototype)
  }, [])

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    if (e.targetTouches?.[0]) {
      setTouchStart(e.targetTouches[0].clientX)
    }
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches?.[0]) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) goNext()
    if (isRightSwipe) goPrev()
  }

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch('/api/google-reviews')
      const data = await response.json() as ApiResponse;
      setReviews(data.reviews || [])
    } catch (error) {
      console.error('Error fetching reviews:', error)
      setReviews([])
    }
  }, [])

  useEffect(() => {
    void fetchReviews()
  }, [fetchReviews])

  const goNext = useCallback(() => {
    if (reviews.length === 0) return
    setCurrentReviewIndex(prev => (prev + 1) % reviews.length)
  }, [reviews.length])

  const goPrev = useCallback(() => {
    if (reviews.length === 0) return
    setCurrentReviewIndex(prev => (prev - 1 + reviews.length) % reviews.length)
  }, [reviews.length])

  const currentReview = reviews[currentReviewIndex]

  return (
    <section className="py-12 md:py-16 bg-linear-to-br from-green-800/60 to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <iframe
            title="School Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3371.371635373706!2d74.13877557608704!3d32.32873130675971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f27141ae512e1%3A0x4a728b0cac341ccf!2sM.S.%20NAZ%20HIGH%20SCHOOL%C2%AE%20%7C%20M.S.N.S%E2%84%A2!5e0!3m2!1sen!2s!4v1738881226323!5m2!1sen!2s"
            className="w-full aspect-video rounded-xl"
            {...(supportsLazyLoading ? { loading: "lazy" } : {})}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <h2 className="text-6xl  pt-12 font-bold my-4 text-center bg-linear-to-r from-emerald-900/90 via-green-900/60 to-blue-900 bg-clip-text text-transparent">
          What Our Community Says
        </h2>

        <div
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Button
            onClick={goPrev}
            disabled={!reviews.length}
            className="p-2 hover:bg-slate-500 rounded-full transition-transform duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-8 h-8 text-slate-100" />
          </Button>

          <div className="flex-1 max-w-2xl min-h-[300px] w-full">
            <AnimatePresence mode='wait'>
              {currentReview ? (
                <motion.div
                  key={currentReviewIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-center gap-2 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <StarIcon
                          className={`w-6 h-6 ${i < (currentReview.rating ?? 0)
                              ? 'text-amber-400'
                              : 'text-slate-200'
                            }`}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-slate-900 mb-4 italic text-lg md:text-xl leading-relaxed">
                    &quot;{currentReview.text || 'No review text available'}&quot;
                  </p>
                  <div className="border-t border-slate-100 pt-4">
                    <p className="font-semibold text-slate-800">
                      {currentReview.author_name || 'Anonymous'}
                    </p>
                    <p className="text-sm text-slate-500">
                      {currentReview.relative_time_description || 'Recently'}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <p className="text-slate-600 text-center">
                    {reviews.length === 0 ? 'No reviews available' : 'Loading reviews...'}
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <Button
            onClick={goNext}
            disabled={!reviews.length}
            className="p-2 hover:bg-slate-100 rounded-full transition-transform duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next review"
          >
            <ChevronRight className="w-8 h-8 text-slate-600" />
          </Button>
        </div>

        {reviews.length > 0 && (
          <div className="flex justify-center gap-2 mb-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReviewIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentReviewIndex ? 'bg-amber-500 scale-125' : 'bg-slate-500'
                  }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  )
}