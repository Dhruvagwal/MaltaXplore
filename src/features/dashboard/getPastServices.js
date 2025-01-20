import { supabase } from "@/supabaseConfig";

export const getPastServices = async (userId) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISOString = today.toISOString();

    const { data: pastData, error: pastError } = await supabase
      .from("servicebookingperson")
      .select("*, services(*)")
      .eq("user_id", userId)
      .lte("services.date", todayISOString);

    if (pastError) throw pastError;

    const pastServices = pastData
      .map((booking) => booking.services)
      .filter((service) => service !== null);

    return pastServices;
  } catch (error) {
    console.error("Error fetching past services:", error.message);
    return [];
  }
};
