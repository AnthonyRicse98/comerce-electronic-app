import { createClient } from "@/utils/supabase/server";

export const ElectronicServices = {
  async getNavigation() {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("electronic-app")
      .select("name, collection")
      .eq("name", "navigation")
      .single();

    if (error) throw new Error(error.message);

    return data;
  },

  async getHomePageMedia(){
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("electronic-app")
      .select("name, collection")
      .eq("name", "homepage")
      .single();

    if (error) throw new Error(error.message);

    const { content } = data.collection;

    return content;
  }
};