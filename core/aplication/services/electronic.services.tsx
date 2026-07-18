import { createClient } from "@/utils/supabase/server";
import { title } from "process";

// Nueva interfaz para la estructura de datos raw de servicios
export interface RawServicesData {
  services_title: string;
  services_title_1: string;
  services_description_1: string;
  services_img_1: string;
  services_url_1: string;
  services_title_2: string;
  services_description_2: string;
  services_img_2: string;
  services_url_2: string;
  services_title_3: string;
  services_description_3: string;
  services_img_3: string;
  services_url_3: string;
  services_title_4: string;
  services_description_4: string;
  services_img_4: string;
  services_url_4: string;
}

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

    const { content , services} = data.collection;

    return {
      content:content,
      services: services as RawServicesData // Casteamos a la nueva interfaz
    }
  },

  async getHomeInformation() {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("electronic-app")
      .select("name, collection")
      .eq("name", "homepage")
      .single();

    if (error) throw new Error(error.message);

    const { information, services } = data.collection;

    const mappedServices = [
      {
        id: "item-1",
        title: services.services_title_1,
        summary: services.services_description_1,
        url: services.services_url_1,
        image: services.services_img_1,
      },
      {
        id: "item-2",
        title: services.services_title_2,
        summary: services.services_description_2,
        url: services.services_url_2,
        image: services.services_img_2,
      },
      {
        id: "item-3",
        title: services.services_title_3,
        summary: services.services_description_3,
        url: services.services_url_3,
        image: services.services_img_3,
      },
      {
        id: "item-4",
        title: services.services_title_4,
        summary: services.services_description_4,
        url: services.services_url_4,
        image: services.services_img_4,
      },
    ];

    return {
      homeInformation: {
        title: information.infoTitle1,
        description: information.infoDescription1,
        cardInfo : information.infoContent1,
      },
      homeProducts: {
        title: services.services_title,
        description: "Explore our innovative solutions for your energy and technology needs.", // A generic description for the Features component
        items: mappedServices,
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

  async getElectronicBoard() {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("electronic-app")
      .select("name, collection")
      .eq("name", "electronic-board")
      .single();

    if (error) throw new Error(error.message);

    const {  content } = data.collection;

    return {
      electronicBoard: {
        title: content.electronic_board_title,
        post: content.electronic_board_post
      },
    };
  },

  async getFotovoltaicSystem() {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("electronic-app")
      .select("name, collection")
      .eq("name", "fotovoltaic-system")
      .single();

    if (error) throw new Error(error.message);

    const { information, content } = data.collection;

    return {
      information: {
        title: information.information_title,
        post: information.information_subtitle
      },
      post: content.post
    };
  },

  async getElectromovilCharge() {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("electronic-app")
      .select("name, collection")
      .eq("name", "electromovil")
      .single();

    if (error) throw new Error(error.message);

    const { information, content } = data.collection;

    return {
      information: {
        title: information.information_title,
        subtitle: information.information_subtitle
      },
      post: content.post
    };
  },
};