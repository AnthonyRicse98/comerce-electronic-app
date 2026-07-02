import { createClient } from "@/utils/supabase/server";

export const HomePageServices = {
  async getNavigation() {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("homepage")
      .select("name, collection")
      .eq("name", "navigation")
      .single();

    if (error) throw new Error(error.message);

    return data;
  },
};