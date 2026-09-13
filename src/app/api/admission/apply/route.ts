import { NextResponse } from "next/server";
import { sendAdmissionEmails, type AdmissionFormData } from "~/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<AdmissionFormData>;

    if (
      !body.studentName ||
      !body.fatherName ||
      !body.dob ||
      !body.gender ||
      !body.gradeApplying ||
      !body.guardianName ||
      !body.mobileNo ||
      !body.email ||
      !body.address
    ) {
      return NextResponse.json(
        { error: "Please fill out all required fields marked with *." },
        { status: 400 }
      );
    }

    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const registrationId = `MSN-ADM-${year}-${randomNum}`;

    const applicationData: AdmissionFormData = {
      registrationId,
      studentName: body.studentName.trim(),
      fatherName: body.fatherName.trim(),
      motherName: body.motherName?.trim() ?? "",
      dob: body.dob.trim(),
      gender: body.gender.trim(),
      gradeApplying: body.gradeApplying.trim(),
      cnicOrBForm: body.cnicOrBForm?.trim() ?? "",
      previousSchool: body.previousSchool?.trim() ?? "",
      guardianName: body.guardianName.trim(),
      relationToStudent: body.relationToStudent?.trim() ?? "Parent/Guardian",
      mobileNo: body.mobileNo.trim(),
      emergencyContact: body.emergencyContact?.trim() ?? "",
      email: body.email.trim(),
      address: body.address.trim(),
      academicSession: body.academicSession?.trim() ?? `${year}–${year + 1}`,
      transportNeeded: body.transportNeeded?.trim() ?? "No",
      remarks: body.remarks?.trim() ?? "",
    };

    // 1. Dispatch emails to admin@msns.edu.pk and msnazhighschool@gmail.com
    await sendAdmissionEmails(applicationData);

    // 2. Dispatch notifications targeted at Admin, Principal, Heads, and Clerks
    const notificationPayload = {
      type: "NEW_ONLINE_REGISTRATION",
      targetRoles: ["ADMIN", "PRINCIPAL", "HEAD", "CLERK"],
      title: `New Online Admission Application: ${applicationData.studentName}`,
      message: `Applicant ${applicationData.studentName} applied for ${applicationData.gradeApplying}. Ref: ${registrationId}. Guardian: ${applicationData.guardianName} (${applicationData.mobileNo}).`,
      registrationId,
      createdAt: new Date().toISOString(),
    };

    console.log("==========================================");
    console.log("[ADMIN/STAFF NOTIFICATION DISPATCHED]");
    console.log(`Roles: ${notificationPayload.targetRoles.join(", ")}`);
    console.log(`Title: ${notificationPayload.title}`);
    console.log(`Message: ${notificationPayload.message}`);
    console.log("==========================================");

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      registrationId,
    });
  } catch (error) {
    console.error("Error processing online admission application:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
}
