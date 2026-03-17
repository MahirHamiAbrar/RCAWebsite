import { createClient } from "@supabase/supabase-js";
import { AuthUserRecord } from "@/types/auth";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function mirrorUserToSupabase(user: AuthUserRecord) {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  // If the table is not created yet, this call will fail and be ignored.
  try {
    await supabase
      .from("rca_users")
      .upsert({
        id: user.id,
        full_name: user.fullName,
        email: user.email,
        series: user.series,
        department: user.department,
        phone_number: user.phoneNumber,
        blood_group: user.bloodGroup,
        membership_type: user.membershipType,
        profile_picture_url: user.profilePictureUrl,
        social_links: user.socialLinks,
        roll_number: user.rollNumber,
        year_of_graduation: user.yearOfGraduation,
        currently_working_at: user.currentlyWorkingAt,
        designation: user.designation,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      })
      .throwOnError();
  } catch {
    return;
  }
}
