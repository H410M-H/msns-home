"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

interface ApiResponse {
  reviews: GoogleReview[];
}

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [supportsLazyLoading, setSupportsLazyLoading] = useState(true);

  useEffect(() => {
    setSupportsLazyLoading("loading" in HTMLIFrameElement.prototype);
  }, []);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    if (e.targetTouches?.[0]) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches?.[0]) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goNext();
    if (isRightSwipe) goPrev();
  };

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch("/api/google-reviews");
      const data = (await response.json()) as ApiResponse;
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  }, []);

  useEffect(() => {
    void fetchReviews();
  }, [fetchReviews]);

  const goNext = useCallback(() => {
    if (reviews.length === 0) return;
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const goPrev = useCallback(() => {
    if (reviews.length === 0) return;
    setCurrentReviewIndex(
      (prev) => (prev - 1 + reviews.length) % reviews.length,
    );
  }, [reviews.length]);

  const currentReview = reviews[currentReviewIndex];

  return (
    <section className="bg-linear-to-br from-green-800/60 to-emerald-50 py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl shadow-xl transition-shadow duration-300 hover:shadow-2xl">
          <iframe
            title="School Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3371.371635373706!2d74.13877557608704!3d32.32873130675971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f27141ae512e1%3A0x4a728b0cac341ccf!2sM.S.%20NAZ%20HIGH%20SCHOOL%C2%AE%20%7C%20M.S.N.S%E2%84%A2!5e0!3m2!1sen!2s!4v1738881226323!5m2!1sen!2s"
            className="aspect-video w-full rounded-xl"
            {...(supportsLazyLoading ? { loading: "lazy" } : {})}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <h2 className="my-4 bg-linear-to-r from-emerald-900/90 via-green-900/60 to-blue-900 bg-clip-text pt-12 text-center text-6xl font-bold text-transparent">
          What Our Community Says
        </h2>

        <div
          className="mb-12 flex flex-col items-center justify-center gap-4 md:mb-16 md:flex-row md:gap-8"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Button
            onClick={goPrev}
            disabled={!reviews.length}
            className="rounded-full p-2 transition-transform duration-200 hover:scale-110 hover:bg-slate-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-8 w-8 text-slate-100" />
          </Button>

          <div className="min-h-[300px] w-full max-w-2xl flex-1">
            <AnimatePresence mode="wait">
              {currentReview ? (
                <motion.div
                  key={currentReviewIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-grab rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg active:cursor-grabbing md:p-8"
                >
                  <div className="mb-4 flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <StarIcon
                          className={`h-6 w-6 ${
                            i < (currentReview.rating ?? 0)
                              ? "text-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <p className="mb-4 text-lg leading-relaxed text-slate-900 italic md:text-xl">
                    &quot;{currentReview.text || "No review text available"}
                    &quot;
                  </p>
                  <div className="border-t border-slate-100 pt-4">
                    <p className="font-semibold text-slate-800">
                      {currentReview.author_name || "Anonymous"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {currentReview.relative_time_description || "Recently"}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="rounded-xl bg-white p-8 shadow-md">
                  <p className="text-center text-slate-600">
                    {reviews.length === 0
                      ? "No reviews available"
                      : "Loading reviews..."}
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <Button
            onClick={goNext}
            disabled={!reviews.length}
            className="rounded-full p-2 transition-transform duration-200 hover:scale-110 hover:bg-slate-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Next review"
          >
            <ChevronRight className="h-8 w-8 text-slate-600" />
          </Button>
        </div>

        {reviews.length > 0 && (
          <div className="mb-2 flex justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReviewIndex(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentReviewIndex
                    ? "scale-125 bg-amber-500"
                    : "bg-slate-500"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
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
  );
}
