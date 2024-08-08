import { validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors.formatter);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
    // if (!errors.isEmpty()) return res.status(400).json({ errors });

    next();
}

export default { validate };