import { supabase } from "@/supabaseConfig";

export const getServiceReviews = async (serviceId) => {
  try {
    const { data, error } = await supabase
      .from("servicecomments")
      .select(
        `
        *,
        users (id, name, email, mobile_no, auth_id, created_at)
      `
      )
      .eq("service_id", serviceId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching reviews with user data:", error.message);
    return [];
  }
};
