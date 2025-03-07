import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Mail, Phone, Plus, Minus, BookOpen, Bus, GraduationCap, Coins } from "lucide-react"
import { motion } from "framer-motion"


export const AdmissionsFaq = () => {
  const faqs = [
    {
      question: "When can I apply for admission?",
      answer:
        "Our main admission cycle begins in January for the academic year starting in August. However, we accept applications throughout the year for mid-term admissions, subject to seat availability.",
    },
    {
      question: "How can I check the status of my application?",
      answer:
        "You can log in to the parent portal using the credentials provided during application submission to check your application status. Alternatively, you can contact our admissions office directly.",
    },
    {
      question: "What is the student-teacher ratio at your school?",
      answer:
        "We maintain a student-teacher ratio of 15:1 in primary classes and 20:1 in middle and high school classes to ensure personalized attention for each student.",
    },
    {
      question: "Do you offer financial aid or scholarships?",
      answer:
        "Yes, we offer merit-based scholarships and need-based financial aid. Applications for financial assistance should be submitted along with the admission application. Please contact our admissions office for more details.",
    },
    {
      question: "Is there a waiting list if classes are full?",
      answer:
        "Yes, when classes reach capacity, qualified applicants are placed on a waiting list. We contact families as soon as a spot becomes available.",
    },
    {
      question: "What curriculum does the school follow?",
      answer:
        "Our school follows an international curriculum that combines elements of the American and British educational systems, with a focus on holistic development and 21st-century skills.",
    },
    {
      question: "Are there transportation services available?",
      answer:
        "Yes, we provide bus transportation services covering major areas of the city. Transportation fees vary depending on the distance from the school.",
    },
    {
      question: "What extracurricular activities are offered?",
      answer:
        "We offer a wide range of extracurricular activities including sports, performing arts, visual arts, robotics, debate, community service, and various academic clubs.",
    },
  ]
  const iconMap = {
    admission: <GraduationCap className="h-5 w-5" />,
    financial: <Coins className="h-5 w-5" />,
    curriculum: <BookOpen className="h-5 w-5" />,
    transportation: <Bus className="h-5 w-5" />,
  }
      return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
            Your Admissions Questions Answered
          </h2>
        </motion.div>
  
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index}`} className="rounded-xl border">
                <AccordionTrigger className="flex w-full items-center justify-between p-6 text-left hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {Object.values(iconMap)[index % 4]}
                    </div>
                    <span className="text-lg font-semibold">{faq.question}</span>
                  </div>
                  <div className="ml-4 shrink-0">
                    <Plus className="h-6 w-6 accordion-open:hidden" />
                    <Minus className="h-6 w-6 hidden accordion-open:block" />
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="p-6 pt-0 text-muted-foreground">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {faq.answer}
                    {index === 3 && (
                      <div className="mt-4 rounded-lg bg-blue-50/50 p-4 text-sm">
                        Scholarship applications deadline: March 15, 2025
                      </div>
                    )}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
  
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border bg-gradient-to-br from-primary/5 to-cyan-500/5 p-8 text-center shadow-sm"
        >
          <div className="mx-auto max-w-md">
            <h3 className="mb-4 text-2xl font-semibold">Still have questions?</h3>
            <p className="mb-6 text-muted-foreground">
              Our admissions team is ready to assist you with any inquiries
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="tel:+1234567890"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-white transition-all hover:bg-primary/90 sm:w-auto"
              >
                <Phone className="h-5 w-5" />
                Call Admissions
              </a>
              <a
                href="mailto:admissions@school.edu"
                className="flex w-full items-center justify-center gap-2 rounded-lg border bg-background px-6 py-3 transition-all hover:border-primary/50 sm:w-auto"
              >
                <Mail className="h-5 w-5" />
                Email Inquiry
              </a>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Response time: Typically within 24 hours
            </p>
          </div>
        </motion.div>
      </div>
    )
  }
