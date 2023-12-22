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
    .withMessage(
      "description is required and must be at least 10 characters long"
    ),
  check("code")
    .exists()
    .not()
    .isEmpty()
    .withMessage("code is required and cannot be empty"),
  check("category")
    .exists()
    .isLength({ min: 3 })
    .withMessage("category is required and must be at least 3 characters long"),
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
  check("stock")
    .exists()
    .withMessage("stock is required")
    .isNumeric()
    .withMessage("stock must be a number")
    .custom((value) => {
      if (value < 0) {
        throw new Error("stock must be a positive number");
      }
      return true;
    }),
  (req: Request, res: Response, next: Function) => {
    validateResult(req, res, next);
  },
];

const validateUpdate = [
  check("id")
    .not()
    .exists()
    .withMessage("Id cannot be modified, omit field in the request body"),
  check("title")
    .optional()
    .isString()
    .withMessage("title must be a string")
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 characters long")
    .custom((value) => !/^\s+$/.test(value))
    .withMessage("Title cannot consist only of spaces"),
  check("description")
    .optional()
    .isString()
    .withMessage("description must be a string")
    .isLength({ min: 10 })
    .withMessage("description must be at least 10 characters long")
    .custom((value) => !/^\s+$/.test(value))
    .withMessage("Description cannot consist only of spaces"),
  check("code")
    .optional()
    .isString()
    .withMessage("code must be a string")
    .notEmpty()
    .withMessage("code cannot be empty")
    .custom((value) => !/^\s+$/.test(value))
    .withMessage("Code cannot consist of spaces"),
  check("status")
    .optional()
    .isBoolean()
    .withMessage("status must be true or false"),
  (req: Request, res: Response, next: Function) => {
    validateResult(req, res, next);
  },
];

export { validateCreate, validateUpdate };
