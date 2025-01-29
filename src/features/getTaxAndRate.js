import { supabase } from "@/supabaseConfig";

export const getTaxRate = async () => {
  try {

    let { data: taxandrate, error } = await supabase
    .from('taxandrate')
    .select('*')
      if (error) throw error;
    return taxandrate;
  } catch (error) {
    console.error("Error fetching user from database:", error.message);
    return null;
  }
};