import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { Clip } from "../classes/clip";


class ClipController {

    static getOneById = async (req: Request, res: Response) => {
        console.log("!!", req.params)
        let clip = new Clip();
        await clip.init(req.params.id);
        console.log(clip.uid);
        res.render('index', {
            uid: clip.uid
        });
    };

};

export default ClipController;
