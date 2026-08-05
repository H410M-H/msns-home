"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Send,
  Bus,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

const GRADES = [
  "Playgroup",
  "Nursery",
  "Prep",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9 (Matric)",
  "Grade 10 (Matric)",
];

export function OnlineAdmissionForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "Male",
    gradeApplying: "Grade 1",
    cnicOrBForm: "",
    previousSchool: "",
    guardianName: "",
    relationToStudent: "Father",
    mobileNo: "",
    emergencyContact: "",
    email: "",
    address: "",
    academicSession: "2026–2027",
    transportNeeded: "No",
    remarks: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admission/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await res.json()) as { success?: boolean; error?: string; registrationId?: string };

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Failed to submit application");
      }

      setSubmittedRef(data.registrationId ?? "MSN-ADM-2026-0001");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submittedRef) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-emerald-500/30 bg-white dark:bg-slate-900 p-8 md:p-12 shadow-2xl text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 mb-6">
            <CheckCircle2 className="h-12 w-12" />
          </div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Application Submitted Successfully!
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base mb-6">
            Thank you for applying to M. S. Naz High School. Your online admission application has been received and logged into our system.
          </p>

          <div className="inline-block bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-2xl p-6 mb-8 text-left w-full max-w-md">
            <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-1">
              Application Reference Number
            </p>
            <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white mb-4">
              {submittedRef}
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <p>• <strong>Student Name:</strong> {formData.studentName}</p>
              <p>• <strong>Grade:</strong> {formData.gradeApplying}</p>
              <p>• <strong>Guardian Mobile:</strong> {formData.mobileNo}</p>
            </div>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto">
            A confirmation has been sent to our admissions office at <strong>admin@msns.edu.pk</strong> and <strong>msnazhighschool@gmail.com</strong>. Our team will contact you shortly regarding the next steps.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/admission">
              <Button variant="outline" className="rounded-full px-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admissions
              </Button>
            </Link>
            <Button
              onClick={() => window.print()}
              className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6"
            >
              Print Receipt
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <Link
          href="/admission"
          className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Admission Info
        </Link>
        <div className="flex justify-center mb-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Online Admission Application Form
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-xl mx-auto">
          M. S. Naz High School — Academic Session 2026–2027. Please complete all required information below.
        </p>
      </div>

      {/* Form Container */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-6 md:p-10 shadow-xl backdrop-blur-md space-y-8"
      >
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Section 1: Student Details */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Student Information
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="studentName">Student Full Name *</Label>
              <Input
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="e.g. Muhammad Ali"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="fatherName">Father&apos;s Name *</Label>
              <Input
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="e.g. Tariq Mehmood"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="motherName">Mother&apos;s Name</Label>
              <Input
                id="motherName"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="Optional"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender *</Label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <Label htmlFor="gradeApplying">Grade / Class Applying For *</Label>
              <select
                id="gradeApplying"
                name="gradeApplying"
                value={formData.gradeApplying}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {GRADES.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="cnicOrBForm">Student B-Form / CNIC Number</Label>
              <Input
                id="cnicOrBForm"
                name="cnicOrBForm"
                value={formData.cnicOrBForm}
                onChange={handleChange}
                placeholder="34101-XXXXXXX-X"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="previousSchool">Previous School Attended (If Any)</Label>
              <Input
                id="previousSchool"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleChange}
                placeholder="e.g. Army Public School"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Guardian Details */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              2. Guardian & Contact Details
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="guardianName">Guardian Full Name *</Label>
              <Input
                id="guardianName"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="Full name of parent/guardian"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="relationToStudent">Relation to Student *</Label>
              <Input
                id="relationToStudent"
                name="relationToStudent"
                value={formData.relationToStudent}
                onChange={handleChange}
                placeholder="e.g. Father / Mother / Uncle"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="mobileNo">Primary Mobile / WhatsApp No. *</Label>
              <Input
                id="mobileNo"
                name="mobileNo"
                type="tel"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="03XX-XXXXXXX"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="emergencyContact">Emergency Contact Number</Label>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                type="tel"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Secondary phone number"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="parent@example.com"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="academicSession">Academic Session</Label>
              <Input
                id="academicSession"
                name="academicSession"
                value={formData.academicSession}
                onChange={handleChange}
                readOnly
                className="mt-1 bg-slate-100 dark:bg-slate-800 cursor-not-allowed"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="address">Residential Address *</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address, city, district"
                required
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Preferences */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Bus className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Transport & Additional Information
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="transportNeeded">School Transport Required? *</Label>
              <select
                id="transportNeeded"
                name="transportNeeded"
                value={formData.transportNeeded}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="remarks">Additional Notes / Special Requests</Label>
              <Textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Any medical condition, scholarship request, or additional information..."
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-6 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-base shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting Application...
              </>
            ) : (
              <>
                Submit Online Application <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
