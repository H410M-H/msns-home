import { ContactInfo } from "~/components/blocks/landing/ContactInfo"
import { GeometricBackground } from "~/components/blocks/landing/GeometricBg"


export default function ContactPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      
      <GeometricBackground />

      <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-4 py-16">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              We are here to help! Reach out to us through any of the contact methods below and our team will get back to
              you as soon as possible.
            </p>
          </div>

          <ContactInfo />
        </div>
      </div>
    </div>
  )
}

