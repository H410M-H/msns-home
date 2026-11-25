"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardHeader } from "~/components/ui/card";
import Image from "next/image";

export function QuickLinksSection() {
  const socialLinks = {
    whatsapp: "https://wa.me/923187625415",
    instagram: "https://www.instagram.com/msnazhighschool/",
    facebook: "https://www.facebook.com/msnazhighschool",
    youtube: "https://www.youtube.com/@msns-edu-pk",
    email: "mailto:info@msns.edu.pk",
  };

  const socialIcons = [
    {
      name: "whatsapp",
      src: "/api/images/social/whatsapp-one_cmzkaf.png",
      link: socialLinks.whatsapp,
    },
    {
      name: "instagram",
      src: "/api/images/social/insta_rgb_xtkjny.png",
      link: socialLinks.instagram,
    },
    {
      name: "facebook",
      src: "/api/images/social/facebook3d_flb7sm.png",
      link: socialLinks.facebook,
    },
    {
      name: "email",
      src: "/api/images/social/mail-3d_ese59y.png",
      link: socialLinks.email,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <section className="rounded-xl border border-green-900/20 bg-transparent px-4 py-8 backdrop-blur-lg md:px-8">
        <div className="mx-auto max-w-4xl font-serif">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-4 bg-linear-to-r from-emerald-900/90 via-green-900/60 to-blue-900 bg-clip-text text-center text-6xl font-bold text-transparent">
              Connect With Us
            </h2>
            <p className="mb-8 text-center text-lg text-green-900">
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
            <Card className="w-full max-w-2xl rounded-xl border border-gray-700 bg-gray-800/20 backdrop-blur-xs transition-all duration-300 hover:shadow-2xl">
              <CardHeader className="flex flex-col items-center space-y-6 p-8">
                <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-4">
                  {socialIcons.map((icon, _index) => (
                    <motion.div
                      key={icon.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                      className="flex justify-center"
                    >
                      <Link
                        href={icon.link}
                        target="_blank"
                        className="flex w-full justify-center rounded-lg bg-gray-700/30 p-4 transition-colors duration-200 hover:bg-gray-600/50"
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
                  <p className="mb-2 bg-linear-to-r from-emerald-900/90 via-green-900/60 to-blue-900 bg-clip-text text-pretty">
                    Direct Contact:
                    <Link
                      href="mailto:info@msns.edu.pk"
                      className="pl-6 text-lg font-medium text-green-900 transition-colors hover:text-blue-500"
                    >
                      info@msns.edu.pk
                    </Link>
                  </p>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
