
import { ElectronicServices } from "../services/electronic.services";

export const ElectronicRepository = {
  async getNavigation() {
    return ElectronicServices.getNavigation();
  },

  async getHomeMedia() {
    return ElectronicServices.getHomePageMedia();
  },

  async getHomeInformation() {
    return ElectronicServices.getHomeInformation();
  },

  async getGroupElectronic(){
    return ElectronicServices.getGroupElectronic();
  },

  async getElectronicBoard(){
    return ElectronicServices.getElectronicBoard();
  },

  async getFotovoltaicSystem(){
    return ElectronicServices.getFotovoltaicSystem();
  }
};