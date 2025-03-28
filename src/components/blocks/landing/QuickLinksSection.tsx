"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardHeader } from "~/components/ui/card"
import Image from "next/image"

export function QuickLinksSection() {
  const socialLinks = {
    whatsapp: "https://wa.me/923187625415",
    instagram: "https://www.instagram.com/msnazhighschool/",
    facebook: "https://www.facebook.com/msnazhighschool.msns",
    youtube: "https://www.youtube.com/@msns-edu-pk",
    email: "mailto:msnazhighschool@gmail.com",
  }

  const socialIcons = [
    {
      name: "whatsapp",
      src: "https://res.cloudinary.com/dvvbxrs55/image/upload/v1737823588/whatsapp-one_cmzkaf.png",
      link: socialLinks.whatsapp,
    },
    {
      name: "instagram",
      src: "https://res.cloudinary.com/dvvbxrs55/image/upload/v1737823587/insta_rgb_xtkjny.png",
      link: socialLinks.instagram,
    },
    {
      name: "facebook",
      src: "https://res.cloudinary.com/dvvbxrs55/image/upload/v1737823587/facebook3d_flb7sm.png",
      link: socialLinks.facebook,
    },
    {
      name: "email",
      src: "https://res.cloudinary.com/dvvbxrs55/image/upload/v1737823739/mail-3d_ese59y.png",
      link: socialLinks.email,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <section className="py-8 px-4 md:px-8 bg-transparent backdrop-blur-lg rounded-xl border border-green-900/20">
        <div className="max-w-4xl mx-auto font-serif">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl  font-bold mb-4 text-center bg-gradient-to-r from-emerald-900/90 via-green-900/60 to-blue-900 bg-clip-text text-transparent">
              Connect With Us
            </h2>
            <p className="text-green-900 text-center mb-8 text-lg">
              Follow our social channels for updates and announcements
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gray-800/20 border border-gray-700 backdrop-blur-sm rounded-xl hover:shadow-2xl transition-all duration-300 w-full max-w-2xl">
              <CardHeader className="flex flex-col items-center space-y-6 p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                  {socialIcons.map((icon, _index) => (
                    <motion.div
                      key={icon.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="flex justify-center"
                    >
                      <Link
                        href={icon.link}
                        target="_blank"
                        className="p-4 rounded-lg bg-gray-700/30 hover:bg-gray-600/50 transition-colors duration-200 w-full flex justify-center"
                      >
                        <Image
                          src={icon.src || "/placeholder.svg"}
                          alt={`${icon.name} icon`}
                          width={48}
                          height={48}
                          className="hover:drop-shadow-glow transition-filter duration-300"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <p className="bg-gradient-to-r from-emerald-900/90 via-green-900/60 to-blue-900 bg-clip-text text-pretty mb-2 ">Direct Contact: 
                  <Link
                    href="mailto:msnazhighschool@gmail.com"
                    className="text-green-900 hover:text-blue-500 transition-colors text-lg font-medium pl-6"
                  >
                    msnazhighschool@gmail.com
                  </Link>
                  </p>

                </div>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

