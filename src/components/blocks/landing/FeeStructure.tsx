import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Banknote, Book, Building, Calculator, Calendar, CreditCard, School, Ticket } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "~/lib/utils"

const feeData = {
  primary: {
    registration: 500,
    tuition: 3000,
    examination: 100
  },
  middle: {
    registration: 600,
    tuition: 3500,
    examination: 150
  },
  high: {
    registration: 700,
    tuition: 4000,
    examination: 200
  }
}

export const FeeStructure = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold bg-linear-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
          Fee Structure & Payment
        </h2>
      </motion.div>

      <Tabs defaultValue="primary">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-2 rounded-xl h-auto">
          {Object.entries(feeData).map(([level]) => (
            <TabsTrigger 
              key={level} 
              value={level}
              className="data-[state=active]:bg-background data-[state=active]:shadow-xs py-4 rounded-lg gap-2"
            >
              <School className="h-5 w-5" />
              {level.charAt(0).toUpperCase() + level.slice(1)} School
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(feeData).map(([level, fees]) => (
          <TabsContent key={level} value={level}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="overflow-hidden rounded-xl border shadow-xs">
                <table className="w-full">
                  <thead className="bg-linear-to-r from-primary/5 to-cyan-500/5">
                    <tr>
                      <th className="p-4 text-left font-semibold text-primary"><Book className="h-5 w-5 inline mr-2" />Fee Type</th>
                      <th className="p-4 text-left font-semibold text-primary"><Calculator className="h-5 w-5 inline mr-2" />Amount</th>
                      <th className="p-4 text-left font-semibold text-primary"><Calendar className="h-5 w-5 inline mr-2" />Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: "Application Fee", amount: "PKR/- 5000", frequency: "One-time (non-refundable)" },
                      { type: "Registration Fee", amount: `PKR/-${fees.registration}`, frequency: "One-time (non-refundable)" },
                      { type: "Tuition Fee", amount: `PKR/-${fees.tuition.toLocaleString()}`, frequency: "Per term (3 terms/year)" },
                      { type: "Development Fund", amount: "PKR/-300", frequency: "Annual" },
                      { type: "Technology Fee", amount: "PKR/-200", frequency: "Annual" },
                      { type: "Examination Fee", amount: `PKR/-${fees.examination}`, frequency: "Per term" },
                    ].map((fee, index) => (
                      <tr 
                        key={fee.type}
                        className={cn(
                          "border-t transition-colors hover:bg-muted/50",
                          index % 2 === 0 && "bg-muted/10"
                        )}
                      >
                        <td className="p-4 font-medium">{fee.type}</td>
                        <td className="p-4 text-primary font-semibold">{fee.amount}</td>
                        <td className="p-4 text-muted-foreground">{fee.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <motion.div 
                  className="rounded-xl border bg-linear-to-b from-blue-50/50 p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <Ticket className="h-8 w-8 text-primary" />
                    <h3 className="text-xl font-semibold">Additional Costs</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Uniform: PKR/-150-200 (varies by grade)",
                      "Books/stationery: PKR/-200-400/year",
                      "School trips: Varies by destination",
                      "Extracurricular fees: Activity dependent",
                    ].map((item, _index) => (
                      <li 
                        key={item}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  className="rounded-xl border bg-linear-to-b from-cyan-50/50 p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <CreditCard className="h-8 w-8 text-primary" />
                    <h3 className="text-xl font-semibold">Payment Details</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-2 font-medium">Payment Methods</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: Banknote, label: "School Portal" },
                          { icon: Building, label: "Bank Transfer" },
                          { icon: CreditCard, label: "Credit/Debit" },
                          { icon: Book, label: "Cheque" },
                        ].map((method) => (
                          <div key={method.label} className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                            <method.icon className="h-5 w-5 text-primary" />
                            <span className="text-sm">{method.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium">Payment Schedule</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Term 1</span>
                          <span className="font-medium">Due Aug 1</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Term 2</span>
                          <span className="font-medium">Due Dec 1</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Term 3</span>
                          <span className="font-medium">Due Apr 1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="rounded-xl border bg-linear-to-b from-purple-50/50 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Note:</span> Late payment fee: PKR/-50. 
                  Sibling discounts: 10% (2nd child), 15% (3rd+ children). 
                  Payment plans available upon request.
                </p>
              </motion.div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}