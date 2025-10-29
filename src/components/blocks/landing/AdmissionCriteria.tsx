import { BookOpenCheck, Cake, School, Star, BadgeCheck } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "~/lib/utils"

const ageRequirements = [
  { grade: "Nursery", age: "3 years" },
  { grade: "Pre-Kindergarten", age: "4 years" },
  { grade: "Kindergarten", age: "5 years" },
  { grade: "Grade 1", age: "6 years" },
  { grade: "Other Grades", age: "Age appropriate for the grade level" },
]

const academicConsiderations = [
  "Performance in the entrance assessment",
  "Previous academic records",
  "Teacher recommendations (for transfers)",
  "Interview performance",
]

const additionalConsiderations = [
  "Student character and values alignment with our school philosophy",
  "Participation in extracurricular activities",
  "Special talents or abilities",
  "Siblings of current students (priority consideration)",
  "Children of alumni (priority consideration)",
]

export const AdmissionsCriteria = () => {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h2 className="text-3xl font-bold bg-linear-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
          Admissions Criteria
        </h2>

        {/* Age Requirements Section */}
        <div className="rounded-2xl border bg-linear-to-b from-blue-50/50 to-transparent p-6">
          <div className="mb-6 flex items-center gap-3">
            <Cake className="h-8 w-8 text-primary" />
            <h3 className="text-2xl font-semibold">Age Requirements</h3>
          </div>
          
          <div className="overflow-hidden rounded-lg border shadow-xs">
            <table className="w-full">
              <thead className="bg-linear-to-r from-primary/5 to-cyan-500/5">
                <tr>
                  <th className="p-4 text-left font-semibold text-primary">Grade Level</th>
                  <th className="p-4 text-left font-semibold text-primary">Age Requirement (as of January 31st, 2025)</th>
                </tr>
              </thead>
              <tbody>
                {ageRequirements.map((requirement, index) => (
                  <tr 
                    key={requirement.grade}
                    className={cn(
                      "border-t transition-colors hover:bg-muted/50",
                      index % 2 === 0 && "bg-muted/10"
                    )}
                  >
                    <td className="p-4 font-medium">{requirement.grade}</td>
                    <td className="p-4 text-muted-foreground">{requirement.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Academic Requirements Section */}
        <motion.div 
          className="rounded-2xl border bg-linear-to-b from-cyan-50/50 to-transparent p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <BookOpenCheck className="h-8 w-8 text-primary" />
            <h3 className="text-2xl font-semibold">Academic Requirements</h3>
          </div>
          
          <p className="mb-6 text-muted-foreground">
            Our school seeks students who demonstrate academic potential and a willingness to learn. 
            Admission decisions are based on:
          </p>
          
          <ul className="grid gap-3 md:grid-cols-2">
            {academicConsiderations.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-xs"
              >
                <School className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Additional Considerations Section */}
        <motion.div 
          className="rounded-2xl border bg-linear-to-b from-purple-50/50 to-transparent p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <Star className="h-8 w-8 text-primary" />
            <h3 className="text-2xl font-semibold">Additional Considerations</h3>
          </div>
          
          <p className="mb-6 text-muted-foreground">
            While academic performance is important, we also consider:
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            {additionalConsiderations.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-xs"
              >
                <BadgeCheck className="mt-0.5 h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}