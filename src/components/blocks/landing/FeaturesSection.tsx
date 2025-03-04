"use client"

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardTitle } from "~/components/ui/card"

export const FeaturesSection = () => {
  const featureCards = [
    {
      image: "https://res.cloudinary.com/dvvbxrs55/image/upload/v1737373450/designJpg/gnbgxijeskoscsmhet5r.png", // Ensure PNG with transparency
      title: "Academic Excellence",
      description: "Our rigorous curriculum prepares students for success in higher education and beyond."
    },
    {
      image: "https://res.cloudinary.com/dvvbxrs55/image/upload/v1741081698/favpng_education-school_xka8ck.png",
      title: "Dedicated Faculty",
      description: "Experienced teachers committed to nurturing each student's potential."
    },
    {
      image: "https://res.cloudinary.com/dvvbxrs55/image/upload/v1737373454/designJpg/j7enn3yegbeql8xvr5pm.png",
      title: "Diverse Programs",
      description: "A wide range of academic and extracurricular activities to foster well-rounded development."
    },
    {
      image: "https://res.cloudinary.com/dvvbxrs55/image/upload/v1737373457/designJpg/hcgcdx4imkrowoeu7ehb.png",
      title: "Modern Facilities",
      description: "State-of-the-art classrooms, labs, and sports facilities to enhance learning experiences."
    }
  ];

  return (
    <section className="bg-gradient-to-br from-green-50 via-emerald-100 to-green-50 py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          Why Choose M.S.N.S?
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {featureCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.1 
                }}
                className="cursor-pointer"
              >
                <FeatureCard
                  image={card.image}
                  title={card.title}
                  description={card.description}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-emerald-200/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-green-300/20 blur-3xl" />
      </div>
    </section>
  )
}

function FeatureCard({ image, title, description }: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <Card className="h-full bg-emerald-100/30 backdrop-blur-xl border border-emerald-200/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group hover:border-emerald-300/70">
      <CardContent className="p-8 flex flex-col items-center">
        <motion.div 
          className="mb-8 p-6 bg-white/20 rounded-3xl shadow-lg border border-white/30"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative w-28 h-28">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain object-center"
              style={{ filter: 'drop-shadow(0 8px 16px rgba(16, 185, 129, 0.2))' }}
            />
          </div>
        </motion.div>
        
        <CardTitle className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600">
          {title}
        </CardTitle>
        
        <CardDescription className="text-emerald-800/90 text-center text-lg leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}