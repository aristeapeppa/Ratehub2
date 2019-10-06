import { Request, Response } from "express";
import { validate } from "class-validator";

import { Clip } from "../classes/Clip";
import { Collection } from "../classes/Collection";

class ClipController {


    static homepageRender = async (req: Request, res: Response) => {
        let clipsCollection = new Collection("clips");
        await clipsCollection.init("newest");
        res.render('clips', {
            clips: clipsCollection.things,
            length: clipsCollection.length
        });
    };

    static clipRender = async (req: Request, res: Response) => {
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

    static rate = async (req: Request, res: Response) => {
        let clip = new Clip();
        await clip.init(req.params.id);
        clip.rate(req.body.stars, req.body.title, req.body.review, req.params.id, res.locals.userId);
        res.send({});
    };

    static report = async (req: Request, res: Response) => {
        let clip = new Clip();
        await clip.init(req.params.id);
        await clip.report();
        res.send({});
    };


    static delete = async (req: Request, res: Response) => {
        let clip = new Clip();
        await clip.init(req.params.id);
        await clip.delete();
        res.send({});
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


    static reportsRender = async (req: Request, res: Response) => {
        let clipsCollection = new Collection("clips");
        await clipsCollection.init("reports");
        res.render('reports', {
            clips: clipsCollection.things,
            length: clipsCollection.length
        });
    };

};

export default ClipController;
