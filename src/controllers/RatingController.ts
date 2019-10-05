import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

import { UserModel } from "../models/UserModel";
import { Rating } from "../classes/Rating";

class RatingController {

    static getRating = async (req: Request, res: Response) => {
        let rating = new Rating();
        console.log(req.params.clipId, res.locals.userId);
        rating.init(undefined, req.params.clipId, res.locals.userId);
        res.send({
            stars: rating.stars,
            review: rating.review
        })
    };
};

export default RatingController;
