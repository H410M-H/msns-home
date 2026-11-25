import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function Affiliations() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
        <div className="mb-2 flex items-center gap-2 text-blue-400">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-[10px] font-bold tracking-wider uppercase">
            Regulatory Status
          </span>
        </div>
        <p className={"text-slate-700"}>
          {
            "Strict compliance with HEC Pakistan directives under Ordinance No. LIII (2002)."
          }
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="flex items-center gap-2 font-semibold text-slate-800">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          Primary Affiliations
        </h4>
        <ul className="grid gap-2">
          <li className="rounded-lg border border-slate-200/50 bg-slate-50/50 p-3">
            <span className="block font-medium text-slate-800">
              BISE Gujranwala
            </span>
            <span className="text-xs text-slate-600">
              Secondary & Higher Secondary Education
            </span>
          </li>
          <li className="rounded-lg border border-slate-200/50 bg-slate-50/50 p-3">
            <span className="block font-medium text-slate-800">
              HEC Compliance
            </span>
            <span className="text-xs text-slate-600">
              Institutional Legitimacy Standards
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
