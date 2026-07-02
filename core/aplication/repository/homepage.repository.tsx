// application/services/homepage.service.ts

import { HomePageServices } from "../services/homepage.services";

export const HomePagerepository = {
  async getNavigation() {
    return HomePageServices.getNavigation();
  },
};