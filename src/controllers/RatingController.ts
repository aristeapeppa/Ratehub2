import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

import { UserModel } from "../models/UserModel";
import { Rating } from "../classes/Rating";
import { Clip } from "../classes/Clip";

class RatingController {

    static getRating = async (req: Request, res: Response) => {
        let rating = new Rating();
        let clipId = parseInt(req.params.clipId)
        await rating.init(undefined, clipId, res.locals.userId);
        res.send({
            stars: rating.stars,
            title: rating.title,
            review: rating.review
        })
    };

    static postRating = async (req: Request, res: Response) => {
        let rating = new Rating(req.body.stars, '', '');
        await rating.save(req.params.clipId, res.locals.userId);
        res.send({});
    };

};

export default RatingController;
