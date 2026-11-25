import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  isEmailConfigured,
  sendAdmissionEmails,
  type AdmissionFormData,
} from "~/lib/email";

export const dynamic = "force-dynamic";

const text = (max: number) => z.string().trim().max(max);
const required = (max: number) => text(max).min(1);
const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9][0-9\s-]{6,19}$/, "Enter a valid phone number");

const admissionSchema = z.object({
  studentName: required(100),
  fatherName: required(100),
  motherName: text(100).optional(),
  dob: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date of birth")
    .refine((v) => {
      const d = new Date(`${v}T00:00:00Z`);
      if (Number.isNaN(d.getTime())) return false;
      const year = d.getUTCFullYear();
      return year >= 1990 && d.getTime() <= Date.now();
    }, "Enter a valid date of birth"),
  gender: required(20),
  gradeApplying: required(40),
  cnicOrBForm: text(20).optional(),
  previousSchool: text(150).optional(),
  guardianName: required(100),
  relationToStudent: text(40).optional(),
  mobileNo: phone,
  emergencyContact: z.union([phone, z.literal("")]).optional(),
  email: z.string().trim().max(254).email("Enter a valid email address"),
  address: required(300),
  academicSession: text(20).optional(),
  transportNeeded: text(10).optional(),
  remarks: text(1000).optional(),
  /** Honeypot: hidden from people, filled in by bots. */
  website: z.string().optional(),
});

/*
 * Best-effort per-IP rate limit. It lives in this function instance's memory,
 * so it resets on cold starts and isn't shared between instances; it still
 * stops simple floods. Use a shared store (e.g. Vercel KV / Upstash) for a
 * hard limit.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function POST(req: Request) {
  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      {
        error:
          "Too many applications from this connection. Please try again later.",
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = admissionSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const message =
      first?.message && first.code !== "invalid_type"
        ? first.message
        : "Please fill out all required fields marked with *.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
  const input = parsed.data;

  const year = new Date().getFullYear();
  const registrationId = `MSN-ADM-${year}-${randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase()}`;

  // Honeypot filled: pretend success so bots don't adapt, but send nothing.
  if (input.website) {
    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      registrationId,
    });
  }

  if (!isEmailConfigured() && process.env.NODE_ENV === "production") {
    console.error(
      `[admission] SMTP is not configured; application ${registrationId} was not delivered`,
    );
    return NextResponse.json(
      {
        error:
          "Online applications are temporarily unavailable. Please call or WhatsApp the school office to apply.",
      },
      { status: 503 },
    );
  }

  const applicationData: AdmissionFormData = {
    registrationId,
    studentName: input.studentName,
    fatherName: input.fatherName,
    motherName: input.motherName ?? "",
    dob: input.dob,
    gender: input.gender,
    gradeApplying: input.gradeApplying,
    cnicOrBForm: input.cnicOrBForm ?? "",
    previousSchool: input.previousSchool ?? "",
    guardianName: input.guardianName,
    relationToStudent: input.relationToStudent ?? "Parent/Guardian",
    mobileNo: input.mobileNo,
    emergencyContact: input.emergencyContact ?? "",
    email: input.email,
    address: input.address,
    academicSession: input.academicSession ?? `${year}–${year + 1}`,
    transportNeeded: input.transportNeeded ?? "No",
    remarks: input.remarks ?? "",
  };

  try {
    // Dispatch emails to admin@msns.edu.pk and msnazhighschool@gmail.com
    await sendAdmissionEmails(applicationData);
  } catch (error) {
    console.error(
      `[admission] failed to send application ${registrationId}:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to submit application. Please try again later." },
      { status: 500 },
    );
  }

  // Log only the reference number: applicant details are personal data.
  console.log(`[admission] application ${registrationId} received`);

  return NextResponse.json({
    success: true,
    message: "Application submitted successfully!",
    registrationId,
  });
}
