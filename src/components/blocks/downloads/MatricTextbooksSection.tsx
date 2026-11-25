"use client";

import { useState, useMemo } from "react";
import {
  BookOpen,
  Download,
  ExternalLink,
  Search,
  CheckCircle2,
  FlaskConical,
  Cpu,
  Calculator,
  Sparkles,
  FileText,
  Layers,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { MATRIC_TEXTBOOKS } from "~/data/matric-textbooks";

interface MatricTextbooksSectionProps {
  title?: string;
  subtitle?: string;
}

export function MatricTextbooksSection({
  title = "New Syllabus Matric Textbooks & Comprehensive Notes",
  subtitle = "Download official Punjab Curriculum & Textbook Board (PCTB) complete e-textbooks and high-yield MSNS notes for Class 9 and Class 10. Aligned with the Single National Curriculum (SNC) & BISE Gujranwala board examination patterns.",
}: MatricTextbooksSectionProps) {
  const [selectedGrade, setSelectedGrade] = useState<"Class 9" | "Class 10">(
    "Class 9",
  );
  const [selectedGroup, setSelectedGroup] = useState<
    "ALL" | "Science" | "Computer Science" | "Compulsory"
  >("ALL");
  const [resourceType, setResourceType] = useState<"ALL" | "BOOKS" | "NOTES">(
    "ALL",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = useMemo(() => {
    return MATRIC_TEXTBOOKS.filter((book) => {
      if (book.grade !== selectedGrade) return false;

      if (selectedGroup !== "ALL") {
        if (selectedGroup === "Compulsory" && book.group !== "Compulsory")
          return false;
        if (
          selectedGroup === "Science" &&
          book.group !== "Science" &&
          book.group !== "Compulsory"
        )
          return false;
        if (
          selectedGroup === "Computer Science" &&
          book.group !== "Computer Science" &&
          book.group !== "Compulsory"
        )
          return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = book.subject.toLowerCase().includes(q);
        const matchUrdu = book.urduSubject.toLowerCase().includes(q);
        const matchDesc = book.description.toLowerCase().includes(q);
        const matchChapters = book.keyChapters.some((c) =>
          c.toLowerCase().includes(q),
        );
        return matchName || matchUrdu || matchDesc || matchChapters;
      }

      return true;
    });
  }, [selectedGrade, selectedGroup, searchQuery]);

  const getSubjectIcon = (subject: string) => {
    const s = subject.toLowerCase();
    if (
      s.includes("physics") ||
      s.includes("chemistry") ||
      s.includes("biology")
    ) {
      return FlaskConical;
    }
    if (s.includes("computer")) {
      return Cpu;
    }
    if (s.includes("math")) {
      return Calculator;
    }
    return BookOpen;
  };

  return (
    <section
      className="mb-20 border-t border-slate-200 pt-8"
      id="matric-textbooks"
    >
      {/* Header */}
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-800 uppercase shadow-2xs">
          <BookOpen className="h-3.5 w-3.5 text-emerald-700" /> PCTB & BISE
          Official E-Library Portal
        </span>
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 md:text-base">
          {subtitle}
        </p>
      </div>

      {/* Controls: Grade Switcher + Resource Filter + Search */}
      <div className="mb-8 space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-xs md:p-6">
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          {/* Grade Selector Tabs */}
          <div className="inline-flex w-full rounded-2xl border border-slate-200/80 bg-slate-100 p-1.5 lg:w-auto">
            <button
              onClick={() => setSelectedGrade("Class 9")}
              className={`flex-1 rounded-xl px-6 py-2.5 text-xs font-bold transition-all lg:flex-initial ${
                selectedGrade === "Class 9"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Class 9 (9th Matric)
            </button>
            <button
              onClick={() => setSelectedGrade("Class 10")}
              className={`flex-1 rounded-xl px-6 py-2.5 text-xs font-bold transition-all lg:flex-initial ${
                selectedGrade === "Class 10"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Class 10 (10th Matric)
            </button>
          </div>

          {/* Resource Type Filter */}
          <div className="inline-flex w-full rounded-2xl border border-slate-200/80 bg-slate-100 p-1.5 lg:w-auto">
            <button
              onClick={() => setResourceType("ALL")}
              className={`flex-1 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                resourceType === "ALL"
                  ? "bg-white font-bold text-emerald-800 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Resources
            </button>
            <button
              onClick={() => setResourceType("BOOKS")}
              className={`flex-1 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                resourceType === "BOOKS"
                  ? "bg-white font-bold text-emerald-800 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Full Textbooks
            </button>
            <button
              onClick={() => setResourceType("NOTES")}
              className={`flex-1 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                resourceType === "NOTES"
                  ? "bg-white font-bold text-emerald-800 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Syllabuses & Notes
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search subject or chapter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-xs transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Group Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
          <span className="mr-1 flex items-center gap-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            <Layers className="h-3.5 w-3.5" /> Group:
          </span>
          {(["ALL", "Science", "Computer Science", "Compulsory"] as const).map(
            (grp) => (
              <button
                key={grp}
                onClick={() => setSelectedGroup(grp)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                  selectedGroup === grp
                    ? "border border-emerald-300 bg-emerald-100 font-bold text-emerald-800"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {grp === "ALL" ? "All Subjects (10)" : grp}
              </button>
            ),
          )}
          <span className="ml-auto text-xs font-medium text-slate-400">
            Showing {filteredBooks.length} subjects
          </span>
        </div>
      </div>

      {/* Textbooks Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((book) => {
          const Icon = getSubjectIcon(book.subject);

          return (
            <div
              key={book.id}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:border-emerald-300 hover:shadow-xl"
            >
              <div>
                {/* Card Top */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-2xs transition-colors duration-200 group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-full border border-emerald-200/60 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
                      {book.group}
                    </span>
                  </div>
                </div>

                {/* Subtitle & Title */}
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <span className="text-[11px] font-bold tracking-wider text-emerald-700 uppercase">
                    {book.grade} - {book.medium}
                  </span>
                  <span className="font-serif text-sm font-bold text-slate-600">
                    {book.urduSubject}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-900">
                  {book.subject}
                </h3>

                <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-slate-600">
                  {book.description}
                </p>

                {/* Chapter Topics Preview */}
                <div className="mb-4 space-y-1 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <span className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Key Topics ({book.totalChapters} Chapters)
                  </span>
                  {book.keyChapters.slice(0, 3).map((chap) => (
                    <div
                      key={chap}
                      className="flex items-center gap-1.5 truncate text-[11px] text-slate-700"
                    >
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-600" />
                      <span className="truncate">{chap}</span>
                    </div>
                  ))}
                  {book.keyChapters.length > 3 && (
                    <span className="block pt-0.5 text-[10px] font-medium text-slate-400">
                      + {book.keyChapters.length - 3} more chapters in full
                      syllabus
                    </span>
                  )}
                </div>
              </div>

              {/* Action Downloads (Textbook & Notes) */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                {/* 1. Full Textbook Download */}
                {resourceType !== "NOTES" && (
                  <div className="flex items-center justify-between gap-2 rounded-2xl border border-emerald-100/80 bg-emerald-50/60 p-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 truncate text-[11px] font-bold text-emerald-950">
                        <BookOpen className="h-3.5 w-3.5 shrink-0 text-emerald-700" />{" "}
                        Complete Textbook
                      </div>
                      <div className="text-[10px] font-semibold text-emerald-700">
                        {book.fileSize}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <a
                        href={book.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-emerald-100/60 hover:text-emerald-800"
                        title={`Preview ${book.subject} Textbook`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={book.downloadUrl}
                        download={book.filename}
                        className="inline-flex items-center gap-1 rounded-xl bg-emerald-700 px-3 py-1.5 text-[11px] font-bold text-white shadow-xs transition-all hover:bg-emerald-800 active:bg-emerald-900"
                        title={`Direct Download ${book.grade} ${book.subject} Full Textbook`}
                      >
                        <Download className="h-3 w-3" /> Book PDF
                      </a>
                    </div>
                  </div>
                )}

                {/* 2. Syllabus & High-Yield Notes Download */}
                {resourceType !== "BOOKS" && (
                  <div className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200/70 bg-slate-50 p-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 truncate text-[11px] font-bold text-slate-900">
                        <FileText className="h-3.5 w-3.5 shrink-0 text-slate-600" />{" "}
                        Syllabus & Short Notes
                      </div>
                      <div className="text-[10px] font-medium text-slate-500">
                        {book.notesSize}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <a
                        href={book.notesDownloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
                        title={`Preview ${book.subject} Notes`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={book.notesDownloadUrl}
                        download={book.notesFilename}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-800 shadow-2xs transition-all hover:bg-slate-100"
                        title={`Direct Download ${book.grade} ${book.subject} Short Notes & Syllabus`}
                      >
                        <Download className="h-3 w-3 text-emerald-700" /> Notes
                        PDF
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Info Banner - 100% Direct Cloudflare Delivery */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-5 text-white shadow-md md:flex-row">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/20 text-emerald-300">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="flex items-center gap-1.5 text-sm font-bold text-emerald-100">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Direct
              Cloudflare High-Speed Storage
            </h4>
            <p className="mt-0.5 max-w-2xl text-xs leading-relaxed text-slate-300">
              All complete original textbooks, institutional documents, and
              board examination notes are served directly via Cloudflare global
              edge storage. Free and unrestricted universal download access for
              all students, parents, and educators worldwide—with zero external
              redirects.
            </p>
          </div>
        </div>
        <div className="flex w-full shrink-0 items-center justify-end gap-2 md:w-auto">
          <a
            href="/api/documents/msns-matriculation-scheme-of-studies.pdf"
            download="msns-matriculation-scheme-of-studies.pdf"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-bold text-emerald-950 shadow-xs transition-colors hover:bg-emerald-300"
          >
            <GraduationCap className="h-3.5 w-3.5" /> Scheme of Studies (PDF)
          </a>
          <a
            href="/api/documents/msns-bise-matric-resource-guide.pdf"
            download="msns-bise-matric-resource-guide.pdf"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/20"
          >
            <Download className="h-3.5 w-3.5" /> BISE Resource Guide (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
