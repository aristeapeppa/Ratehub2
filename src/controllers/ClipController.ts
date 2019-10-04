import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { Clip } from "../classes/Clip";


class ClipController {

    static getOneById = async (req: Request, res: Response) => {
        console.log("!!", req.params)
        let clip = new Clip();
        await clip.init(req.params.id);
        res.render('clip', {
            title: clip.title,
            description: clip.description,
            uid: clip.uid,
            score: clip.score,
            reviews: clip.reviews
        });
    };

};

export default ClipController;
