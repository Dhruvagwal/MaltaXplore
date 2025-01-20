import { supabase } from "@/supabaseConfig";

export const getServiceById = async (id) => {
  try {
    const { data: service, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single(); 
    if (error) throw error;
    return service;
  } catch (error) {
    console.error(`Error fetching service with ID ${id}:`, error.message);
    return null;
  }
};
