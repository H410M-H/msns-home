"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
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
  MessageSquare,
  Globe,
  Share2,
  Sparkles,
  Printer,
  BookOpen,
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

const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/923187625415",
    icon: MessageSquare,
    bg: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white border-emerald-500/20",
  },
  {
    label: "Call Desk",
    href: "tel:+923187625415",
    icon: Phone,
    bg: "bg-teal-500/10 text-teal-600 hover:bg-teal-500 hover:text-white border-teal-500/20",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/msnazhighschool",
    icon: Share2,
    bg: "bg-blue-500/10 text-blue-600 hover:bg-blue-600 hover:text-white border-blue-500/20",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/msnazhighschool",
    icon: Sparkles,
    bg: "bg-pink-500/10 text-pink-600 hover:bg-pink-600 hover:text-white border-pink-500/20",
  },
  {
    label: "LMS Portal",
    href: "https://lms.msns.edu.pk",
    icon: Globe,
    bg: "bg-purple-500/10 text-purple-600 hover:bg-purple-600 hover:text-white border-purple-500/20",
  },
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
    // Honeypot: hidden from people; bots that fill every field get filtered.
    website: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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

      const data = (await res.json()) as {
        success?: boolean;
        error?: string;
        registrationId?: string;
      };

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Failed to submit application");
      }

      setSubmittedRef(data.registrationId ?? "(pending)");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submittedRef) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 px-4 py-12">
        {/* Ambient Glowing Orbs */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[140px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-3xl rounded-3xl border border-emerald-500/30 bg-slate-900/90 p-8 text-center text-white shadow-[0_20px_60px_rgba(16,185,129,0.15)] backdrop-blur-2xl md:p-12"
        >
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-500/30">
            <CheckCircle2 className="h-14 w-14" />
          </div>

          <span className="mb-3 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-300 uppercase">
            Registration Confirmed
          </span>

          <h2 className="mb-3 bg-gradient-to-r from-emerald-200 via-teal-100 to-white bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Application Submitted Successfully!
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-slate-300">
            Thank you for applying to <strong>M. S. Naz High School</strong>.
            Your application has been logged into our admissions system.
          </p>

          <div className="mx-auto mb-8 max-w-lg rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-800/80 to-slate-900/90 p-6 text-left shadow-inner">
            <div className="mb-3 flex items-center justify-between border-b border-slate-700/60 pb-3">
              <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                Application Reference ID
              </p>
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/20 px-2.5 py-1 font-mono text-xs text-emerald-300">
                2026–2027
              </span>
            </div>
            <p className="mb-5 font-mono text-3xl font-extrabold tracking-wider text-amber-300">
              {submittedRef}
            </p>
            <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-xs text-slate-300">
              <div>
                <span className="text-slate-500">Student:</span>{" "}
                <strong className="block text-white">
                  {formData.studentName}
                </strong>
              </div>
              <div>
                <span className="text-slate-500">Grade:</span>{" "}
                <strong className="block text-emerald-400">
                  {formData.gradeApplying}
                </strong>
              </div>
              <div>
                <span className="text-slate-500">Guardian:</span>{" "}
                <strong className="block text-white">
                  {formData.guardianName}
                </strong>
              </div>
              <div>
                <span className="text-slate-500">Mobile:</span>{" "}
                <strong className="block text-teal-300">
                  {formData.mobileNo}
                </strong>
              </div>
            </div>
          </div>

          <p className="mx-auto mb-8 max-w-md text-xs text-slate-400">
            An email confirmation has been dispatched to{" "}
            <strong>admin@msns.edu.pk</strong> &{" "}
            <strong>msnazhighschool@gmail.com</strong>. Our admissions desk will
            contact you via WhatsApp/Phone shortly.
          </p>

          {/* Social Links & Actions */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/admission">
              <Button
                variant="outline"
                className="cursor-pointer rounded-full border-slate-700 px-6 text-white hover:bg-slate-800"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admissions
              </Button>
            </Link>
            <Button
              onClick={() => window.print()}
              className="cursor-pointer rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-700"
            >
              <Printer className="mr-2 h-4 w-4" /> Print Receipt
            </Button>
            <a
              href={`https://wa.me/923187625415?text=Hello%20MSNS,%20I%20have%20submitted%20online%20application%20Ref:%20${submittedRef}%20for%20${encodeURIComponent(formData.studentName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-500"
            >
              <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp Admissions
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-950 pt-20 pb-16 font-sans text-slate-100 md:pt-24">
      {/* Dynamic Backdrop Glow Orbs */}
      <div className="pointer-events-none absolute top-0 right-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-1/3 left-10 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[150px]" />

      {/* Top Banner Navigation & Quick Social Bar */}
      <div className="relative z-20 border-b border-emerald-500/10 bg-slate-900/60 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <Link
            href="/admission"
            className="inline-flex items-center text-xs font-semibold tracking-wider text-emerald-400 uppercase transition-colors hover:text-emerald-300"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Admission Overview
          </Link>

          {/* Social & Direct Contact Links */}
          <div className="flex flex-wrap items-center gap-2">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300 ${item.bg}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-8 md:pt-12">
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-300 uppercase shadow-inner backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Admissions
            Open 2026–2027
          </div>

          <h1 className="bg-gradient-to-r from-yellow-100 via-emerald-300 to-teal-100 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent drop-shadow-md md:text-5xl">
            Online Admission Application Form
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            Welcome to <strong>M. S. Naz High School®</strong>. Please complete
            the digital application form below to begin your child&apos;s
            educational journey with us.
          </p>
        </motion.div>

        {/* Main Application Card */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-10 rounded-3xl border border-emerald-500/20 bg-slate-900/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:p-10"
        >
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-px w-px overflow-hidden"
          >
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300 shadow-md"
            >
              <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
              <p>{error}</p>
            </motion.div>
          )}

          {/* SECTION 1: STUDENT INFORMATION */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-emerald-500/20 pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-wide text-white">
                  1. Student Information
                </h2>
                <p className="text-xs text-slate-400">
                  Personal & academic details of the applicant
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="studentName"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Student Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute top-3.5 left-3.5 h-4 w-4 text-emerald-400/70" />
                  <Input
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="e.g. Muhammad Ali"
                    required
                    className="h-11 rounded-xl border-slate-800 bg-slate-950/60 pl-10 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="fatherName"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Father&apos;s Name *
                </Label>
                <div className="relative">
                  <User className="absolute top-3.5 left-3.5 h-4 w-4 text-emerald-400/70" />
                  <Input
                    id="fatherName"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="e.g. Tariq Mehmood"
                    required
                    className="h-11 rounded-xl border-slate-800 bg-slate-950/60 pl-10 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="motherName"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Mother&apos;s Name
                </Label>
                <div className="relative">
                  <User className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="motherName"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="h-11 rounded-xl border-slate-800 bg-slate-950/60 pl-10 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="dob"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Date of Birth *
                </Label>
                <div className="relative">
                  <Calendar className="absolute top-3.5 left-3.5 h-4 w-4 text-emerald-400/70" />
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="h-11 rounded-xl border-slate-800 bg-slate-950/60 pl-10 text-white [color-scheme:dark] focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="gender"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Gender *
                </Label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <Label
                  htmlFor="gradeApplying"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Grade / Class Applying For *
                </Label>
                <select
                  id="gradeApplying"
                  name="gradeApplying"
                  value={formData.gradeApplying}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm font-semibold text-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                >
                  {GRADES.map((grade) => (
                    <option
                      key={grade}
                      value={grade}
                      className="bg-slate-900 text-white"
                    >
                      {grade}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label
                  htmlFor="cnicOrBForm"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  B-Form / CNIC Number
                </Label>
                <div className="relative">
                  <FileText className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="cnicOrBForm"
                    name="cnicOrBForm"
                    value={formData.cnicOrBForm}
                    onChange={handleChange}
                    placeholder="34101-XXXXXXX-X"
                    className="h-11 rounded-xl border-slate-800 bg-slate-950/60 pl-10 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="previousSchool"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Previous School (If Any)
                </Label>
                <div className="relative">
                  <Building className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="previousSchool"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    placeholder="Previous institute name"
                    className="h-11 rounded-xl border-slate-800 bg-slate-950/60 pl-10 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: GUARDIAN & CONTACT DETAILS */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-teal-500/20 pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-md shadow-teal-500/20">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-wide text-white">
                  2. Guardian & Contact Details
                </h2>
                <p className="text-xs text-slate-400">
                  Parent/Guardian contact info for notifications
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="guardianName"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Guardian Full Name *
                </Label>
                <Input
                  id="guardianName"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  placeholder="Full name of parent/guardian"
                  required
                  className="h-11 rounded-xl border-slate-800 bg-slate-950/60 text-white placeholder:text-slate-600 focus:border-teal-500 focus:ring-teal-500/20"
                />
              </div>

              <div>
                <Label
                  htmlFor="relationToStudent"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Relation to Student *
                </Label>
                <Input
                  id="relationToStudent"
                  name="relationToStudent"
                  value={formData.relationToStudent}
                  onChange={handleChange}
                  placeholder="Father / Mother / Guardian"
                  required
                  className="h-11 rounded-xl border-slate-800 bg-slate-950/60 text-white placeholder:text-slate-600 focus:border-teal-500 focus:ring-teal-500/20"
                />
              </div>

              <div>
                <Label
                  htmlFor="mobileNo"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Primary Mobile / WhatsApp No. *
                </Label>
                <div className="relative">
                  <Phone className="absolute top-3.5 left-3.5 h-4 w-4 text-teal-400/70" />
                  <Input
                    id="mobileNo"
                    name="mobileNo"
                    type="tel"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    placeholder="03XX-XXXXXXX"
                    required
                    className="h-11 rounded-xl border-slate-800 bg-slate-950/60 pl-10 text-white placeholder:text-slate-600 focus:border-teal-500 focus:ring-teal-500/20"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="emergencyContact"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Emergency Contact Number
                </Label>
                <div className="relative">
                  <Phone className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    placeholder="Secondary contact number"
                    className="h-11 rounded-xl border-slate-800 bg-slate-950/60 pl-10 text-white placeholder:text-slate-600 focus:border-teal-500 focus:ring-teal-500/20"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute top-3.5 left-3.5 h-4 w-4 text-teal-400/70" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="parent@example.com"
                    required
                    className="h-11 rounded-xl border-slate-800 bg-slate-950/60 pl-10 text-white placeholder:text-slate-600 focus:border-teal-500 focus:ring-teal-500/20"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="academicSession"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Academic Session
                </Label>
                <div className="relative">
                  <BookOpen className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="academicSession"
                    name="academicSession"
                    value={formData.academicSession}
                    readOnly
                    className="h-11 cursor-not-allowed rounded-xl border-slate-800/60 bg-slate-950/30 pl-10 text-slate-400"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label
                  htmlFor="address"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Residential Address *
                </Label>
                <div className="relative">
                  <MapPin className="absolute top-3.5 left-3.5 h-4 w-4 text-teal-400/70" />
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Full home address (Street, Town/City, District)"
                    required
                    className="h-11 rounded-xl border-slate-800 bg-slate-950/60 pl-10 text-white placeholder:text-slate-600 focus:border-teal-500 focus:ring-teal-500/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: TRANSPORT & PREFERENCES */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20">
                <Bus className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-wide text-white">
                  3. Transport & Additional Preferences
                </h2>
                <p className="text-xs text-slate-400">
                  Bus service and extra notes
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="transportNeeded"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  School Transport Facility Required? *
                </Label>
                <select
                  id="transportNeeded"
                  name="transportNeeded"
                  value={formData.transportNeeded}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                >
                  <option value="No">No — Private Transport</option>
                  <option value="Yes">Yes — School Bus Service Needed</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <Label
                  htmlFor="remarks"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Special Notes / Medical Info / Remarks
                </Label>
                <Textarea
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Mention any medical condition, previous academic achievements, or special requests..."
                  rows={3}
                  className="rounded-xl border-slate-800 bg-slate-950/60 text-white placeholder:text-slate-600 focus:border-amber-500 focus:ring-amber-500/20"
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-4 sm:flex-row">
            <p className="text-xs text-slate-400">
              * Required fields. Form details will be transmitted to our
              admissions office.
            </p>

            <Button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-full border border-emerald-400/20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 px-8 py-6 text-base font-bold text-white shadow-[0_4px_25px_rgba(16,185,129,0.3)] transition-all hover:from-emerald-400 hover:to-cyan-500 hover:shadow-[0_6px_30px_rgba(16,185,129,0.4)] sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting
                  Application...
                </>
              ) : (
                <>
                  Submit Online Application <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </motion.form>

        {/* Integrated Social Footer Banner */}
        <div className="mt-12 space-y-3 text-center text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} M. S. Naz High School®. All rights
            reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-emerald-400/80">
            <a href="https://www.msns.edu.pk" className="hover:underline">
              Main Website
            </a>
            <span>•</span>
            <a href="https://lms.msns.edu.pk" className="hover:underline">
              LMS Portal
            </a>
            <span>•</span>
            <a
              href="https://www.facebook.com/msnazhighschool"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Facebook
            </a>
            <span>•</span>
            <a
              href="https://www.instagram.com/msnazhighschool"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
