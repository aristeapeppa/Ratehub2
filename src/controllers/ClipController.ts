import { Request, Response } from "express";
import { validate } from "class-validator";

import { Clip } from "../classes/Clip";
import { Collection } from "../classes/Collection";

class ClipController {


    static homepageRender = async (req: Request, res: Response) => {
        let clipsCollection = new Collection("clips");
        await clipsCollection.init("newest");
        console.log(">>>", clipsCollection.things)
        res.render('clips', {
            clips: clipsCollection.things,
            length: clipsCollection.length
        });
    };

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


    static searchRender = async (req: Request, res: Response) => {
        let clipsCollection = new Collection("clips");
        await clipsCollection.init("search", req.params.wanted);
        res.render('clips', {
            clips: clipsCollection.things,
            length: clipsCollection.length,
            wanted: req.params.wanted
        });
    };

};

export default ClipController;
