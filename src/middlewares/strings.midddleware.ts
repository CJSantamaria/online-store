import { Request, Response } from "express";
import { nextTick } from "process";

const trimStringValues = (req: Request, res: Response, next: Function) => {
  if (req.body && typeof req.body === "object") {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  next();
};

// normalization of req.body fields to lowercase

const normalizeFieldNames = (req: Request, res: Response, next: Function) => {
  const normalizedBody: Record<string, any> = {};
  for (const key in req.body) {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      const normalizedKey = key.toLowerCase();
      normalizedBody[normalizedKey] = req.body[key];
    }
  }
  req.body = normalizedBody;
  next();
};

export { trimStringValues, normalizeFieldNames };
