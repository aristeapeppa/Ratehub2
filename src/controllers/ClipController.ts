import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { ClipModel } from "../models/ClipModel";


class ClipController {

    static listAll = async (req: Request, res: Response) => {
        res.render('index', {
            title: 'Sequelize: Express Example'
        });
    };

    static getOneById = async (req: Request, res: Response) => {
        const clip = await getConnection()
            .createQueryBuilder()
            .select("clip")
            .from(ClipModel, "clip")
            .where("clip.id = :id", { id: req.params.id })
            .getOne();

        console.log(clip);
        res.render('index', {
            uid: clip.uid
        });
    };

};

export default ClipController;
