import { Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../helpers/validate.helper";

const validateCreate = [
  check("id").not().exists(),
  check("title").exists().isLength({ min: 3 }),
  check("description").exists().isLength({ min: 10 }),
  check("code").exists().not().isEmpty(),
  check("category").exists().isLength({ min: 3 }),
  check("status").custom((value, { req }) => {
    if (value !== undefined && value !== true) {
      throw new Error(
        "status field is true by default, you can ommit it in your request body"
      );
    }
    return true;
  }),
  check("price")
    .exists()
    .isNumeric()
    .custom((value, { req }) => {
      if (value < 1) {
        throw new Error("Price must be at least $1");
      }
      return true;
    }),
  (req: Request, res: Response, next: Function) => {
    validateResult(req, res, next);
  },
  check("stock")
    .exists()
    .isNumeric()
    .custom((value) => {
      if (value < 0) {
        throw new Error("Stock must be a positive number");
      }
      return true;
    }),
];

export { validateCreate };
