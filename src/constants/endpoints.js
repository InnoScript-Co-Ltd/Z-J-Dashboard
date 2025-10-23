import { env } from "./settings";

export const baseURL = env[0];

export const endpoints = {
  customer: "user",
  login: "auth/login",
  admin: "auth",
  image: `${baseURL}/storage/images`,
};