import { CheckCircle, ClipboardList, SearchCheck, ClipboardCheck, CalendarCheck, BadgeDollarSign, MailCheck } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "~/lib/utils"

const stepIcons = {
  0: <ClipboardList className="h-6 w-6" />,
  1: <SearchCheck className="h-6 w-6" />,
  2: <ClipboardCheck className="h-6 w-6" />,
  3: <CalendarCheck className="h-6 w-6" />,
  4: <MailCheck className="h-6 w-6" />,
  5: <BadgeDollarSign className="h-6 w-6" />,
}

export const AdmissionsProcess = () => {
  const steps = [
    {
      title: "Submit Application",
      description: "Complete the online application form with all required information and documentation.",
    },
    {
      title: "Application Review",
      description: "Our admissions team will review your application and contact you for the next steps.",
    },
    {
      title: "Assessment Test",
      description: "Students will be invited to take an assessment test appropriate for their grade level.",
    },
    {
      title: "Interview",
      description: "Selected candidates and their parents will be invited for an interview with school administrators.",
    },
    {
      title: "Admission Decision",
      description: "Admission decisions will be communicated to parents within two weeks of the interview.",
    },
    {
      title: "Fee Payment",
      description: "Upon acceptance, secure your child's place by paying the registration fee and first term fees.",
    },
  ]
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="mb-8 text-3xl font-bold bg-linear-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
          Our 6-Step Admission Journey
        </h2>
        
        <div className="relative space-y-12 pl-8 before:absolute before:left-[35px] before:top-4 before:h-[calc(100%-60px)] before:w-1 before:bg-linear-to-b before:from-primary before:via-cyan-500 before:to-primary before:opacity-30">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex gap-6"
            >
              {/* Timeline dot */}
              <div className="absolute -left-14 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                  {stepIcons[index as keyof typeof stepIcons]}
                </div>
              </div>

              <div className="flex-1 rounded-xl border bg-card p-6 shadow-xs transition-all hover:shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-primary">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border bg-linear-to-br from-cyan-50/50 to-blue-50/50 p-8 shadow-xs"
      >
        <div className="mb-6 flex items-center gap-3">
          <CheckCircle className="h-8 w-8 text-primary" />
          <h3 className="text-2xl font-semibold">Required Documentation</h3>
        </div>
        
        <ul className="grid gap-4 md:grid-cols-2">
          {[
            "Completed application form",
            "Birth certificate",
            "Previous school records/report cards",
            "Passport-sized photographs",
            "Immunization records",
            "Parent/guardian ID proof",
            "Proof of address",
            "Transfer certificate (if applicable)",
          ].map((item, i) => (
            <motion.li
              key={i}
              whileHover={{ x: 5 }}
              className={cn(
                "flex items-center gap-3 rounded-lg bg-white/50 p-4 backdrop-blur-xs",
                "border transition-colors hover:border-primary/20"
              )}
            >
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">{item}</span>
            </motion.li>
          ))}
        </ul>
        
        <p className="mt-6 text-sm text-muted-foreground">
          *All documents must be certified copies. International students require additional documentation.
        </p>
      </motion.div>
    </div>
  )
}