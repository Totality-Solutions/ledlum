import "server-only";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type SubmissionType = "contact" | "quote" | "lead";

const field = (v: unknown, max = 5000) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

// Saves a form submission to the admin inbox (Admin → Submissions). Never
// throws — a failed insert must not stop the notification email going out.
export async function saveSubmission(
  type: SubmissionType,
  data: { name?: unknown; email?: unknown; phone?: unknown; product?: unknown; message?: unknown }
): Promise<void> {
  try {
    const { error } = await supabaseAdmin.from("form_submissions").insert({
      type,
      name: field(data.name, 200),
      email: field(data.email, 200),
      phone: field(data.phone, 50),
      product: field(data.product, 200),
      message: field(data.message),
    });
    if (error) console.error(`saveSubmission(${type}) failed:`, error.message);
  } catch (err) {
    console.error(`saveSubmission(${type}) failed:`, err);
  }
}
