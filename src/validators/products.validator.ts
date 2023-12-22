import { Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../helpers/validate.helper";

const validateCreate = [
  check("id")
    .not()
    .exists()
    .withMessage(
      "Id is automatically generated, omit field in the request body"
    ),
  check("title")
    .exists()
    .isLength({ min: 3 })
    .withMessage("title is required and must be at least 3 characters long"),
  check("description")
    .exists()
    .isLength({ min: 10 })
    .withMessage("description is required and must be at least 10 characters long"),
  check("code")
    .exists()
    .not()
    .isEmpty()
    .withMessage("code is required and cannot be empty"),
  check("category").exists().isLength({ min: 3 }),
  check("status").custom((value, { req }) => {
    if (value !== undefined && value !== true) {
      throw new Error(
        "product status is true by default, omit field in the request body"
      );
    }
    return true;
  }),
  check("price")
    .exists()
    .isNumeric()
    .custom((value, { req }) => {
      if (value <= 0) {
        throw new Error("price must be a positive number");
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
        throw new Error("stock must be a positive number");
      }
      return true;
    }),
];

export { validateCreate };
