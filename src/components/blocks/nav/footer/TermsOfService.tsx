"use client";

export const TermsOfService = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">
        Terms of Service
      </h1>
      <p className="text-white mb-4">
        Welcome to the <span className="font-semibold">M.S. Naz High School</span>{" "}
        Learning Management System (LMS). By accessing or using this system, you
        agree to comply with the following terms and conditions.
      </p>

      <h2 className="text-2xl font-semibold text-white mt-8 mb-3">
        User Responsibilities
      </h2>
      <ul className="list-disc list-inside text-white space-y-2">
        <li>Use your assigned login credentials responsibly and do not share them.</li>
        <li>Ensure that all information provided (personal, academic, or financial) is accurate.</li>
        <li>Respect the privacy and security of other users.</li>
        <li>Comply with school rules and regulations while using the LMS.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mt-8 mb-3">
        Acceptable Use
      </h2>
      <p className="text-white mb-4">
        You agree not to misuse the system. Prohibited actions include:
      </p>
      <ul className="list-disc list-inside text-white space-y-2">
        <li>Attempting unauthorized access to the system or other accounts.</li>
        <li>Uploading harmful, inappropriate, or malicious content.</li>
        <li>Altering or tampering with student, employee, or financial records.</li>
        <li>Violating intellectual property rights of others.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mt-8 mb-3">
        School’s Rights
      </h2>
      <p className="text-white mb-4">
        The school reserves the right to:
      </p>
      <ul className="list-disc list-inside text-white  space-y-2">
        <li>Modify or update the LMS features as per academic and administrative needs.</li>
        <li>Restrict or suspend access for users who violate these terms.</li>
        <li>Update these Terms of Service from time to time.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mt-8 mb-3">
        Limitation of Liability
      </h2>
      <p className="text-white mb-4">
        While the school strives to maintain system reliability, it shall not be
        held responsible for interruptions due to technical issues, internet
        outages, or external service failures.
      </p>

      <h2 className="text-2xl font-semibold text-white mt-8 mb-3">
        Governing Law
      </h2>
      <p className="text-white mb-4">
        These terms shall be governed by the laws of Pakistan and the policies
        of the District Education Authority, Gujranwala.
      </p>

      <p className="text-white mt-8">
        By using this LMS, you acknowledge that you have read and agreed to
        these Terms of Service.
      </p>
    </div>
  );
};

export default TermsOfService;
