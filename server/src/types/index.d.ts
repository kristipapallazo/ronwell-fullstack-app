import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

type DbConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

interface ErrorsData {
  [key: string]: string;
}

type Email = string;
type Passw = string;
type Token = string;

/* is used to extend type of req (with token) */
interface CustomReq extends Request {
  token?: string | JwtPayload;
}
