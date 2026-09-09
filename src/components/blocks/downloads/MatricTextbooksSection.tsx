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
  Sparkles
} from "lucide-react";
import { MATRIC_TEXTBOOKS } from "~/data/matric-textbooks";

interface MatricTextbooksSectionProps {
  title?: string;
  subtitle?: string;
}

export function MatricTextbooksSection({
  title = "New Syllabus Matric Textbooks (PCTB E-Books)",
  subtitle = "Download official Punjab Curriculum & Textbook Board (PCTB) e-textbooks for Class 9 and Class 10. Aligned with the Single National Curriculum (SNC) & BISE Gujranwala board examination patterns.",
}: MatricTextbooksSectionProps) {
  const [selectedGrade, setSelectedGrade] = useState<"Class 9" | "Class 10">("Class 9");
  const [selectedGroup, setSelectedGroup] = useState<"ALL" | "Science" | "Computer Science" | "Compulsory">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = useMemo(() => {
    return MATRIC_TEXTBOOKS.filter((book) => {
      if (book.grade !== selectedGrade) return false;

      if (selectedGroup !== "ALL") {
        if (selectedGroup === "Compulsory" && book.group !== "Compulsory") return false;
        if (selectedGroup === "Science" && book.group !== "Science" && book.group !== "Compulsory") return false;
        if (selectedGroup === "Computer Science" && book.group !== "Computer Science" && book.group !== "Compulsory") return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = book.subject.toLowerCase().includes(q);
        const matchUrdu = book.urduSubject.toLowerCase().includes(q);
        const matchDesc = book.description.toLowerCase().includes(q);
        const matchChapters = book.keyChapters.some((c) => c.toLowerCase().includes(q));
        return matchName || matchUrdu || matchDesc || matchChapters;
      }

      return true;
    });
  }, [selectedGrade, selectedGroup, searchQuery]);

  const getSubjectIcon = (subject: string) => {
    const s = subject.toLowerCase();
    if (s.includes("physics") || s.includes("chemistry") || s.includes("biology")) {
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
    <section className="mb-20 pt-8 border-t border-slate-200" id="matric-textbooks">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 border border-emerald-200 mb-3 shadow-2xs">
          <BookOpen className="w-3.5 h-3.5 text-emerald-700" /> PCTB Lahore E-Library Portal
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          {title}
        </h2>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Controls: Grade Switcher + Filter + Search */}
      <div className="p-4 md:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Grade Selector Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 w-full md:w-auto">
            <button
              onClick={() => setSelectedGrade("Class 9")}
              className={`flex-1 md:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedGrade === "Class 9"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Class 9 (9th Matric)
            </button>
            <button
              onClick={() => setSelectedGrade("Class 10")}
              className={`flex-1 md:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedGrade === "Class 10"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Class 10 (10th Matric)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search textbook or chapter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Group Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Group:
          </span>
          {(["ALL", "Science", "Computer Science", "Compulsory"] as const).map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedGroup === grp
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {grp === "ALL" ? "All Subjects (10)" : grp}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-400 font-medium">
            Showing {filteredBooks.length} textbooks
          </span>
        </div>
      </div>

      {/* Textbooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => {
          const Icon = getSubjectIcon(book.subject);

          return (
            <div
              key={book.id}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-emerald-200"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                      {book.group}
                    </span>
                  </div>
                </div>

                {/* Subtitle & Title */}
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    {book.grade} - {book.medium}
                  </span>
                  <span className="font-serif text-slate-600 text-sm font-bold">
                    {book.urduSubject}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-900 transition-colors">
                  {book.subject}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {book.description}
                </p>

                {/* Chapter Topics Preview */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Key Topics ({book.totalChapters} Chapters)
                  </span>
                  {book.keyChapters.slice(0, 3).map((chap) => (
                    <div key={chap} className="text-[11px] text-slate-700 truncate flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{chap}</span>
                    </div>
                  ))}
                  {book.keyChapters.length > 3 && (
                    <span className="text-[10px] text-slate-400 font-medium block pt-0.5">
                      + {book.keyChapters.length - 3} more chapters in full syllabus
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-400">{book.fileSize}</span>
                
                <div className="flex items-center gap-1.5">
                  <a
                    href={book.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-emerald-800 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Preview PDF"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Preview
                  </a>
                  <a
                    href={book.downloadUrl}
                    download={book.filename}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 transition-all px-3 py-1.5 rounded-xl shadow-xs hover:shadow-md"
                    title={`Download ${book.grade} ${book.subject} PDF`}
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Info Banner */}
      <div className="mt-8 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            All textbooks are hosted on high-speed Cloudflare R2 storage for instant direct download. For paper print editions, visit the Punjab Curriculum and Textbook Board.
          </span>
        </div>
        <a
          href="https://pctb.punjab.gov.pk/E-Books"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-emerald-800 hover:text-emerald-900 shrink-0 inline-flex items-center gap-1"
        >
          PCTB Official E-Books Portal <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
