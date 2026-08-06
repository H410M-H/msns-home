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
  MessageSquare,
  Globe,
  Share2,
  Sparkles,
  Printer,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
  { label: "WhatsApp", href: "https://wa.me/923187625415", icon: MessageSquare, bg: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white border-emerald-500/20" },
  { label: "Call Desk", href: "tel:+923187625415", icon: Phone, bg: "bg-teal-500/10 text-teal-600 hover:bg-teal-500 hover:text-white border-teal-500/20" },
  { label: "Facebook", href: "https://www.facebook.com/msnazhighschool", icon: Share2, bg: "bg-blue-500/10 text-blue-600 hover:bg-blue-600 hover:text-white border-blue-500/20" },
  { label: "Instagram", href: "https://www.instagram.com/msnazhighschool", icon: Sparkles, bg: "bg-pink-500/10 text-pink-600 hover:bg-pink-600 hover:text-white border-pink-500/20" },
  { label: "LMS Portal", href: "https://lms.msns.edu.pk", icon: Globe, bg: "bg-purple-500/10 text-purple-600 hover:bg-purple-600 hover:text-white border-purple-500/20" },
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
      <div className="relative min-h-screen py-12 px-4 flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 overflow-hidden">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-3xl w-full rounded-3xl border border-emerald-500/30 bg-slate-900/90 backdrop-blur-2xl p-8 md:p-12 shadow-[0_20px_60px_rgba(16,185,129,0.15)] text-center text-white"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-500/30 mb-6">
            <CheckCircle2 className="h-14 w-14" />
          </div>

          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 mb-3">
            Registration Confirmed
          </span>

          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-200 via-teal-100 to-white bg-clip-text text-transparent mb-3">
            Application Submitted Successfully!
          </h2>
          <p className="text-slate-300 text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Thank you for applying to <strong>M. S. Naz High School</strong>. Your application has been logged into our admissions system.
          </p>

          <div className="mx-auto bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 mb-8 text-left max-w-lg shadow-inner">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-700/60">
              <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                Application Reference ID
              </p>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                2026–2027
              </span>
            </div>
            <p className="text-3xl font-mono font-extrabold text-amber-300 tracking-wider mb-5">
              {submittedRef}
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <div><span className="text-slate-500">Student:</span> <strong className="text-white block">{formData.studentName}</strong></div>
              <div><span className="text-slate-500">Grade:</span> <strong className="text-emerald-400 block">{formData.gradeApplying}</strong></div>
              <div><span className="text-slate-500">Guardian:</span> <strong className="text-white block">{formData.guardianName}</strong></div>
              <div><span className="text-slate-500">Mobile:</span> <strong className="text-teal-300 block">{formData.mobileNo}</strong></div>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-8 max-w-md mx-auto">
            An email confirmation has been dispatched to <strong>admin@msns.edu.pk</strong> & <strong>msnazhighschool@gmail.com</strong>. Our admissions desk will contact you via WhatsApp/Phone shortly.
          </p>

          {/* Social Links & Actions */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/admission">
              <Button variant="outline" className="rounded-full px-6 border-slate-700 hover:bg-slate-800 text-white cursor-pointer">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admissions
              </Button>
            </Link>
            <Button
              onClick={() => window.print()}
              className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 shadow-lg shadow-emerald-500/25 cursor-pointer"
            >
              <Printer className="mr-2 h-4 w-4" /> Print Receipt
            </Button>
            <a
              href={`https://wa.me/923187625415?text=Hello%20MSNS,%20I%20have%20submitted%20online%20application%20Ref:%20${submittedRef}%20for%20${encodeURIComponent(formData.studentName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all shadow-lg shadow-emerald-600/30"
            >
              <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp Admissions
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-950 text-slate-100 font-sans pt-20 md:pt-24 pb-16 overflow-hidden">
      {/* Dynamic Backdrop Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Banner Navigation & Quick Social Bar */}
      <div className="relative z-20 border-b border-emerald-500/10 bg-slate-900/60 backdrop-blur-md py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/admission"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
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
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${item.bg}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-8 md:pt-12">
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm shadow-inner">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Admissions Open 2026–2027
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-100 via-emerald-300 to-teal-100 bg-clip-text text-transparent drop-shadow-md">
            Online Admission Application Form
          </h1>
          <p className="mt-3 text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Welcome to <strong>M. S. Naz High School®</strong>. Please complete the digital application form below to begin your child&apos;s educational journey with us.
          </p>
        </motion.div>

        {/* Main Application Card */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="rounded-3xl border border-emerald-500/20 bg-slate-900/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl p-6 md:p-10 space-y-10"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm shadow-md"
            >
              <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
              <p>{error}</p>
            </motion.div>
          )}

          {/* SECTION 1: STUDENT INFORMATION */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-emerald-500/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide">
                  1. Student Information
                </h2>
                <p className="text-xs text-slate-400">Personal & academic details of the applicant</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="studentName" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Student Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-emerald-400/70" />
                  <Input
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="e.g. Muhammad Ali"
                    required
                    className="pl-10 bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl h-11"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="fatherName" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Father&apos;s Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-emerald-400/70" />
                  <Input
                    id="fatherName"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="e.g. Tariq Mehmood"
                    required
                    className="pl-10 bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl h-11"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="motherName" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Mother&apos;s Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="motherName"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="pl-10 bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl h-11"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="dob" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Date of Birth *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-emerald-400/70" />
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-slate-950/60 border-slate-800 text-white focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl h-11 [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gender" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Gender *
                </Label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <Label htmlFor="gradeApplying" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Grade / Class Applying For *
                </Label>
                <select
                  id="gradeApplying"
                  name="gradeApplying"
                  value={formData.gradeApplying}
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-emerald-300 font-semibold focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  {GRADES.map((grade) => (
                    <option key={grade} value={grade} className="bg-slate-900 text-white">
                      {grade}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="cnicOrBForm" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  B-Form / CNIC Number
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="cnicOrBForm"
                    name="cnicOrBForm"
                    value={formData.cnicOrBForm}
                    onChange={handleChange}
                    placeholder="34101-XXXXXXX-X"
                    className="pl-10 bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl h-11"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="previousSchool" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Previous School (If Any)
                </Label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="previousSchool"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    placeholder="Previous institute name"
                    className="pl-10 bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl h-11"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: GUARDIAN & CONTACT DETAILS */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-teal-500/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-md shadow-teal-500/20">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide">
                  2. Guardian & Contact Details
                </h2>
                <p className="text-xs text-slate-400">Parent/Guardian contact info for notifications</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="guardianName" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Guardian Full Name *
                </Label>
                <Input
                  id="guardianName"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  placeholder="Full name of parent/guardian"
                  required
                  className="bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl h-11"
                />
              </div>

              <div>
                <Label htmlFor="relationToStudent" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Relation to Student *
                </Label>
                <Input
                  id="relationToStudent"
                  name="relationToStudent"
                  value={formData.relationToStudent}
                  onChange={handleChange}
                  placeholder="Father / Mother / Guardian"
                  required
                  className="bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl h-11"
                />
              </div>

              <div>
                <Label htmlFor="mobileNo" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Primary Mobile / WhatsApp No. *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400/70" />
                  <Input
                    id="mobileNo"
                    name="mobileNo"
                    type="tel"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    placeholder="03XX-XXXXXXX"
                    required
                    className="pl-10 bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl h-11"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="emergencyContact" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Emergency Contact Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    placeholder="Secondary contact number"
                    className="pl-10 bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl h-11"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400/70" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="parent@example.com"
                    required
                    className="pl-10 bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl h-11"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="academicSession" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Academic Session
                </Label>
                <div className="relative">
                  <BookOpen className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="academicSession"
                    name="academicSession"
                    value={formData.academicSession}
                    readOnly
                    className="pl-10 bg-slate-950/30 border-slate-800/60 text-slate-400 cursor-not-allowed rounded-xl h-11"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Residential Address *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400/70" />
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Full home address (Street, Town/City, District)"
                    required
                    className="pl-10 bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl h-11"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: TRANSPORT & PREFERENCES */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-amber-500/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20">
                <Bus className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide">
                  3. Transport & Additional Preferences
                </h2>
                <p className="text-xs text-slate-400">Bus service and extra notes</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="transportNeeded" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  School Transport Facility Required? *
                </Label>
                <select
                  id="transportNeeded"
                  name="transportNeeded"
                  value={formData.transportNeeded}
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="No">No — Private Transport</option>
                  <option value="Yes">Yes — School Bus Service Needed</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="remarks" className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                  Special Notes / Medical Info / Remarks
                </Label>
                <Textarea
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Mention any medical condition, previous academic achievements, or special requests..."
                  rows={3}
                  className="bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <p className="text-xs text-slate-400">
              * Required fields. Form details will be transmitted to our admissions office.
            </p>

            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-6 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-base shadow-[0_4px_25px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_30px_rgba(16,185,129,0.4)] transition-all cursor-pointer border border-emerald-400/20"
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

        {/* Integrated Social Footer Banner */}
        <div className="mt-12 text-center text-xs text-slate-400 space-y-3">
          <p>© {new Date().getFullYear()} M. S. Naz High School®. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 text-emerald-400/80">
            <a href="https://www.msns.edu.pk" className="hover:underline">Main Website</a>
            <span>•</span>
            <a href="https://lms.msns.edu.pk" className="hover:underline">LMS Portal</a>
            <span>•</span>
            <a href="https://www.facebook.com/msnazhighschool" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
            <span>•</span>
            <a href="https://www.instagram.com/msnazhighschool" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
}

