import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function Affiliations() {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-center gap-2 mb-2 text-blue-400">
          <ShieldCheck className="w-4 h-4" />
          <span className="font-bold uppercase tracking-wider text-[10px]">Regulatory Status</span>
        </div>
        <p className={"text-slate-700"}>
          {"Strict compliance with HEC Pakistan directives under Ordinance No. LIII (2002)."}
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="text-slate-800 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Primary Affiliations
        </h4>
        <ul className="grid gap-2">
          <li className="bg-slate-50/50 p-3 rounded-lg border border-slate-200/50">
            <span className="block text-slate-800 font-medium">BISE Gujranwala</span>
            <span className="text-xs text-slate-600">Secondary & Higher Secondary Education</span>
          </li>
          <li className="bg-slate-50/50 p-3 rounded-lg border border-slate-200/50">
            <span className="block text-slate-800 font-medium">HEC Compliance</span>
            <span className="text-xs text-slate-600">Institutional Legitimacy Standards</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
