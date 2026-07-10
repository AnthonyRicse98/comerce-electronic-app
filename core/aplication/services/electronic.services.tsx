import { createClient } from "@/utils/supabase/server";
import { title } from "process";

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

  async getHomePageMedia() {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("electronic-app")
      .select("name, collection")
      .eq("name", "homepage")
      .single();

    if (error) throw new Error(error.message);

    const { content } = data.collection;

    return content;
  },

  async getHomeInformation() {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("electronic-app")
      .select("name, collection")
      .eq("name", "homepage")
      .single();

    if (error) throw new Error(error.message);

    const { information } = data.collection;

    return {
      homeInformation: {
        title: information.infoTitle1,
        description: information.infoDescription1,
        cardInfo : information.infoContent1,
      },
      homeProducts: {
        title: information.infoTitle2,
        description: information.infoDescription2
      }
    };
  },

  async getGroupElectronic() {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("electronic-app")
      .select("name, collection")
      .eq("name", "group-electronic")
      .single();

    if (error) throw new Error(error.message);

    const { information, content } = data.collection;
    return {
      information:{
        title: information.information_title,
        description : information.information_description
      },
      maintenance: {
        title:content.maintenance_title,
        post:content.maintenance_post
      },
      rent:{
        title:content.rent_title,
        post:content.rent_post
      },
      sell:{
        title:content.sell_title,
        post:content.sell_post
      },
      replacement:{
        title:content.replacement_title,
        post:content.replacement_post
      }
    }
  },
};