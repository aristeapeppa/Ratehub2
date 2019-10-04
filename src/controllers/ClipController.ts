import { Request, Response } from "express";
import { validate } from "class-validator";

import { Clip } from "../classes/Clip";

class ClipController {

    static getOneById = async (req: Request, res: Response) => {
        let clip = new Clip();
        await clip.init(req.params.id);
        clip.rate(0, 'a', 'a');
        res.render('clip', {
            title: clip.title,
            uid: clip.uid,
            description: clip.description,
            score: clip.score,
            reviews: clip.reviews
        });
    };

    static rate = async (req: Request, res: Response) => {
        let clip = new Clip();
        await clip.init(req.params.id);
        res.render('clip', {
            title: clip.title,
            uid: clip.uid,
            description: clip.description,
            score: clip.score,
            reviews: clip.reviews
        });
    };

};

export default ClipController;
