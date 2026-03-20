import React from "react";

export default function LMSKnowledge() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-slate-200">
      <p>
        The MSNS Learning Management System (LMS) is engineered to replace fragmented manual record-keeping methodologies with a highly secure, centralized digital platform.[3]
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Architectural Stack:</strong> Built on a modern, decoupled full-stack infrastructure utilizing Node.js, Next.js (App Router), and tRPC for end-to-end type safety.[3] 
        </li>
        <li>
          <strong>Data Integrity & Security:</strong> Relational data integrity is enforced via the Prisma ORM, while authentication is securely managed by NextAuth.js using bcrypt-hashed JSON Web Tokens (JWTs).[3] Binary assets are isolated in Google Cloud Storage.[3]
        </li>
        <li>
          <strong>Operational Modules:</strong> Comprehensive lifecycle governance encompassing Academic Structure, Double-Entry Financial Ledgers, Subject Diaries, Examination Lifecycles, and Biometric Attendance.[3]
        </li>
        <li>
          <strong>Role-Based Access Control (RBAC):</strong> Absolute data privacy is enforced at the API layer, restricting data visibility dynamically across Admin, Principal, Head, Clerk, Teacher, and Student roles.[3]
        </li>
      </ul>
    </div>
  );
}



export default function LMSMarketing() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-slate-200">
      <p>
        The MSNS LMS transcends traditional administrative software by acting as an <strong>Institutional Intelligence Hub</strong>. It resolves the most critical pain points in modern educational administration through three core pillars.[3]
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Institutional Omniscience:</strong> Advanced executive dashboards aggregate overall fee collection rates, average student attendance, and examination completion percentages into a single, real-time "Institution Health Score".[3]
        </li>
        <li>
          <strong>Financial Immutability:</strong> Our double-entry financial ledger tracks every multi-channel transaction. Automated fee challan generation, dynamic late fee penalties, and strict approval workflows drastically reduce revenue leakage and ensure unassailable fiscal integrity.[3]
        </li>
        <li>
          <strong>Pedagogical Transparency:</strong> The interactive Subject Diary and Assignment Hub bridge the communication gap between the classroom and the home. Guardians can monitor daily instructional pacing, and students are empowered with visual countdown timers and accessible multimedia course materials.[3]
        </li>
      </ul>
    </div>
  );
}

