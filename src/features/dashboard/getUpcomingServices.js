import { supabase } from "@/supabaseConfig";

export const getUpcomingServices = async (userId) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const todayISOString = today.toISOString();

    const { data: upcomingData, error: upcomingError } = await supabase
      .from("servicebookingperson")
      .select("*, services(*)")
      .eq("user_id", userId)
      .gt("services.date", todayISOString);

    if (upcomingError) throw upcomingError;

    const upcomingServices = upcomingData
      .map((booking) => booking.services)
      .filter((service) => service !== null);

    return upcomingServices;
  } catch (error) {
    console.error("Error fetching upcoming services:", error.message);
    return [];
  }
};
