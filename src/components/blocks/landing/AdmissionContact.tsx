import { Mail, Phone, Clock, CalendarDays } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { motion } from "framer-motion"
import { cn } from "~/lib/utils"

const contactItems = [
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Phone",
    content: "+92 (318) 7625415",
    color: "text-blue-600",
    link: "tel:+12345678900"
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email",
    content: "admissions@msns.edu.pk",
    color: "text-cyan-600",
    link: "mailto:admissions@msns.edu.pk"
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Office Hours",
    content: ["Monday to Friday: 8:00 AM - 4:00 PM", "Saturday: 9:00 AM - 12:00 PM"],
    color: "text-purple-600"
  }
]

export const ContactAdmissions = () => {
  return (
    <Card className="relative overflow-hidden border-0 bg-linear-to-br from-blue-50/50 to-cyan-50/50 shadow-lg">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
      <CardContent className="relative p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="rounded-lg bg-primary p-2.5">
            <CalendarDays className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-linear-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
            Contact Admissions
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {contactItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group rounded-xl border bg-white/50 p-6 backdrop-blur-xs",
                "transition-all hover:border-primary/20 hover:shadow-md",
                item.link && "cursor-pointer hover:bg-white"
              )}
              onClick={() => item.link && window.open(item.link, "_blank")}
            >
              <div className={`mb-3 ${item.color}`}>{item.icon}</div>
              <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
              {Array.isArray(item.content) ? (
                item.content.map((line, i) => (
                  <p key={i} className="text-muted-foreground">{line}</p>
                ))
              ) : (
                <p className="text-muted-foreground">{item.content}</p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="mt-8"
        >
          <Button
            size="lg"
            className="w-full rounded-xl bg-linear-to-r from-primary to-cyan-600 py-7 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-105"
          >
            <CalendarDays className="mr-3 h-5 w-5" />
            Schedule a Campus Tour
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}