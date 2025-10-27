import { env } from "./settings";

export const baseURL = env[0];

export const endpoints = {
  admin: "",
  profile: "auth",
  customer: "customer",
  login: "auth/login",
  activity: "activities",
  image: `${baseURL}/storage/images`,
  visaService: "visa-services",
};