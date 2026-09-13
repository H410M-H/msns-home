import nodemailer from "nodemailer";

export interface AdmissionFormData {
  registrationId: string;
  studentName: string;
  fatherName: string;
  motherName?: string;
  dob: string;
  gender: string;
  gradeApplying: string;
  cnicOrBForm?: string;
  previousSchool?: string;
  guardianName: string;
  relationToStudent: string;
  mobileNo: string;
  emergencyContact?: string;
  email: string;
  address: string;
  academicSession: string;
  transportNeeded: string;
  remarks?: string;
}

export async function sendAdmissionEmails(data: AdmissionFormData) {
  const recipients = ["admin@msns.edu.pk", "msnazhighschool@gmail.com"];

  // Configure transporter using SMTP env vars or fallback logger
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7f6; color: #333; margin: 0; padding: 20px; }
          .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #064e3b, #0f766e); padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 22px; letter-spacing: 0.5px; }
          .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
          .badge { display: inline-block; background: #10b981; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-top: 10px; }
          .content { padding: 24px; }
          .section-title { font-size: 15px; font-weight: 700; color: #064e3b; border-bottom: 2px solid #10b981; padding-bottom: 6px; margin-top: 20px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          .info-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .info-table td.label { font-weight: 600; color: #475569; width: 40%; background: #f8fafc; }
          .info-table td.value { color: #0f172a; width: 60%; }
          .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>M. S. NAZ HIGH SCHOOL</h1>
            <p>New Online Admission Registration Received</p>
            <div class="badge">App Ref: ${data.registrationId}</div>
          </div>
          <div class="content">
            <div class="section-title">Student Information</div>
            <table class="info-table">
              <tr><td class="label">Full Name</td><td class="value"><strong>${data.studentName}</strong></td></tr>
              <tr><td class="label">Father's Name</td><td class="value">${data.fatherName}</td></tr>
              ${data.motherName ? `<tr><td class="label">Mother's Name</td><td class="value">${data.motherName}</td></tr>` : ''}
              <tr><td class="label">Date of Birth</td><td class="value">${data.dob}</td></tr>
              <tr><td class="label">Gender</td><td class="value">${data.gender}</td></tr>
              <tr><td class="label">Grade Applying For</td><td class="value"><strong style="color:#059669;">${data.gradeApplying}</strong></td></tr>
              ${data.cnicOrBForm ? `<tr><td class="label">B-Form / CNIC</td><td class="value">${data.cnicOrBForm}</td></tr>` : ''}
              ${data.previousSchool ? `<tr><td class="label">Previous School</td><td class="value">${data.previousSchool}</td></tr>` : ''}
              <tr><td class="label">Academic Session</td><td class="value">${data.academicSession}</td></tr>
            </table>

            <div class="section-title">Guardian & Contact Information</div>
            <table class="info-table">
              <tr><td class="label">Guardian Name</td><td class="value">${data.guardianName} (${data.relationToStudent})</td></tr>
              <tr><td class="label">Mobile / WhatsApp</td><td class="value"><a href="tel:${data.mobileNo}">${data.mobileNo}</a></td></tr>
              ${data.emergencyContact ? `<tr><td class="label">Emergency Contact</td><td class="value">${data.emergencyContact}</td></tr>` : ''}
              <tr><td class="label">Email Address</td><td class="value"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td class="label">Residential Address</td><td class="value">${data.address}</td></tr>
              <tr><td class="label">Transport Required</td><td class="value">${data.transportNeeded}</td></tr>
              ${data.remarks ? `<tr><td class="label">Additional Remarks</td><td class="value">${data.remarks}</td></tr>` : ''}
            </table>
          </div>
          <div class="footer">
            <p>This is an automated notification from M.S. Naz High School Admissions System.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (host && user && pass) {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"MSNS Admissions" <${user}>`,
      to: recipients.join(", "),
      subject: `New Online Admission Application: ${data.studentName} (${data.gradeApplying}) - Ref: ${data.registrationId}`,
      html: htmlContent,
    });
  } else {
    console.log("==========================================");
    console.log(`[SIMULATED EMAIL DISPATCH] To: ${recipients.join(", ")}`);
    console.log(`Subject: New Online Admission Application: ${data.studentName} (${data.gradeApplying}) - Ref: ${data.registrationId}`);
    console.log("==========================================");
  }
}
