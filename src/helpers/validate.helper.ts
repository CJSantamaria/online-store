import { Request, Response } from "express";
import { validationResult } from "express-validator";

const validateResult = (req: Request, res: Response, next:Function) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(400).send({ errors: error.array() })
    }
}

export { validateResult }