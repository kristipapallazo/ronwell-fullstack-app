import { Email } from "../types";

export function isValidText(val: string, min: number) {
  return val && val.trim().length > 0 && val.length >= min;
}
export function isValidEmail(val: Email) {
  return val && val.length > 0 && val.includes("@") && val.includes(".");
}
