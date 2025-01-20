import { supabase } from "@/supabaseConfig";

export const getServices = async () => {
  try {
    const { data: services, error } = await supabase.from("services").select("*");
    if (error) throw error;
    return services;
  } catch (error) {
    console.error("Error fetching services:", error.message);
    return [];
  }
};
