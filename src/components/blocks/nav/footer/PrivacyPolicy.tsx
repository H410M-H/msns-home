"use client";

export const PrivacyPolicy = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold text-slate-700">Privacy Policy</h1>
      <p className="mb-4 text-slate-700">
        At <span className="font-semibold">M.S. Naz High School</span>, we
        respect your privacy and are committed to protecting the personal
        information of our students, parents, teachers, employees, and visitors.
        This Privacy Policy explains how our Learning Management System (LMS)
        collects, uses, and safeguards data.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold text-slate-700">
        Information We Collect
      </h2>
      <ul className="list-inside list-disc space-y-2 text-slate-700">
        <li>
          Student and employee personal details (e.g., name, contact info,
          CNIC).
        </li>
        <li>
          Academic records including assignments, attendance, grades, and
          sessions.
        </li>
        <li>Fee and financial information for administrative purposes.</li>
        <li>
          Uploaded files such as profile photos, documents, or assignments.
        </li>
      </ul>

      <h2 className="mt-8 mb-3 text-2xl font-semibold text-slate-700">
        How We Use Your Information
      </h2>
      <p className="mb-4 text-slate-700">
        The collected information is used to:
      </p>
      <ul className="list-inside list-disc space-y-2 text-slate-700">
        <li>
          Provide role-based access to the LMS (Admin, Teacher, Clerk, Student).
        </li>
        <li>Manage classes, sessions, subjects, and fee structures.</li>
        <li>Facilitate academic activities such as assignments and reports.</li>
        <li>
          Maintain accurate financial records and session-based revenue reports.
        </li>
        <li>Ensure system security, integrity, and authorized access.</li>
      </ul>

      <h2 className="mt-8 mb-3 text-2xl font-semibold text-slate-700">
        Data Protection
      </h2>
      <p className="mb-4 text-slate-700">
        We implement security measures as per our SRS requirements:
      </p>
      <ul className="list-inside list-disc space-y-2 text-slate-700">
        <li>Encrypted communication over HTTPS.</li>
        <li>Password hashing and secure authentication.</li>
        <li>Role-based access control.</li>
        <li>Regular backups and database integrity checks.</li>
      </ul>

      <h2 className="mt-8 mb-3 text-2xl font-semibold text-slate-700">
        Data Sharing
      </h2>
      <p className="mb-4 text-slate-700">
        We do not sell or share your personal information with third parties,
        except when required by law or to comply with government regulations.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold text-slate-700">
        Your Rights
      </h2>
      <p className="mb-4 text-slate-700">
        You have the right to review, update, or request deletion of your
        personal information. For assistance, please contact the school
        administration.
      </p>

      <p className="mt-8 text-slate-700">
        This Privacy Policy is effective as of the academic session 2026–28 and
        may be updated periodically.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
