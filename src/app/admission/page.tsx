"use client";


import { Card, CardContent } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { AdmissionsBanner } from "~/components/blocks/landing/AdmissionBanner"
import { AdmissionsProcess } from "~/components/blocks/landing/AdmissionProcess"
import { ContactAdmissions } from "~/components/blocks/landing/AdmissionContact"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { CalendarIcon, DollarSignIcon, ClipboardCheckIcon, MailIcon, ArrowRight } from "lucide-react"
import { AdmissionsCriteria } from "~/components/blocks/landing/AdmissionCriteria";
import { FeeStructure } from "~/components/blocks/landing/FeeStructure";
import { AdmissionsFaq } from "~/components/blocks/landing/AdmissionsFaq";

const AnimatedTabsContent = motion.create(TabsContent)
const tabContentVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export default function Admission() {
  return (
    <main className="flex min-h-screen flex-col pt-16 bg-yellow-300/20">
      <AdmissionsBanner />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Admissions Overview
            </h1>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              Welcome to our admissions page. We are delighted that you are considering our school for your children
              education. Our admissions process is designed to be straightforward and supportive.
            </p>
          </div>

          <Tabs defaultValue="process" className="mb-12">
            <TabsList className="flex w-full overflow-x-auto md:grid md:grid-cols-5">
              <TabsTrigger value="process" className="gap-2">
                <ClipboardCheckIcon className="h-4 w-4" /> Process
              </TabsTrigger>
              <TabsTrigger value="criteria" className="gap-2">
                <CalendarIcon className="h-4 w-4" /> Criteria
              </TabsTrigger>
              <TabsTrigger value="fees" className="gap-2">
                <DollarSignIcon className="h-4 w-4" /> Fees
              </TabsTrigger>
              <TabsTrigger value="apply" className="gap-2">
                <MailIcon className="h-4 w-4" /> Apply
              </TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
            </TabsList>

            <AnimatedTabsContent
              value="process"
              variants={tabContentVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="pt-6 "
            >
              <AdmissionsProcess />
            </AnimatedTabsContent>

            <AnimatedTabsContent
              value="criteria"
              variants={tabContentVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="pt-6"
            >
              <AdmissionsCriteria />
            </AnimatedTabsContent>

            <AnimatedTabsContent
              value="fees"
              variants={tabContentVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="pt-6"
            >
              <FeeStructure />
            </AnimatedTabsContent>

            {/* Repeat AnimatedTabsContent for other tabs */}

            <AnimatedTabsContent value="apply" className="pt-6">
              <div className="text-center">
                <h2 className="mb-6 text-2xl font-bold">Apply for Admission</h2>
                <p className="mb-8 text-muted-foreground">
                  Ready to join our school community? Complete our online application form to begin the admissions
                  process.
                </p>
                <Button
                  size="lg"
                  className="group rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-6 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                  asChild
                >
                  <Link href="/admissions/apply">
                    Start Application
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </AnimatedTabsContent>

            <AnimatedTabsContent
              value="faq"
              variants={tabContentVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="pt-6"
            >
              <AdmissionsFaq />
            </AnimatedTabsContent>
          </Tabs>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                    Admission Calendar
                  </h2>
                  <div className="space-y-4">
                    {admissionDates.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex justify-between items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <span className="font-medium">{item.label}</span>
                        <span className="text-blue-600 font-medium">{item.date}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ContactAdmissions />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

const admissionDates = [
  { label: "Application Opens", date: "February - April (Dates may vary)" },
  { label: "Application Deadline", date: "March 31, 2025" },
  { label: "Assessment Tests", date: "April 10-20, 2025" },
  { label: "Results Announced", date: "May 5, 2025" },
  { label: "Classes Begin", date: "August 15, 2025" },
]