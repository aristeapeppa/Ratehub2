import { getRepository, getConnection, createQueryBuilder } from "typeorm";

import { ClipModel } from "../models/ClipModel";
import { RatingModel } from "../models/RatingModel";
import { Rating } from "./Rating";

export class Clip {
    private _id: number;
    private _title: string;
    private _description: string;
    private _uid: string;
    private _ratings: Rating[] = [];

    constructor() { }

    async init(id) {

        const clip = await getConnection()
            .createQueryBuilder()
            .select("clip")
            .from(ClipModel, "clip")
            .where("clip.id = :id", { id: id })
            .getOne();


        const ratings = await getConnection()
            .createQueryBuilder()
            .select("rating")
            .from(RatingModel, "rating")
            .where("clipId = :id", { id: id })
            .getMany();

        ratings.forEach((rat) => {
            let rating = new Rating(rat.id, rat.stars, rat.title, rat.description);
            this._ratings.push(rating);
        });

        console.log("??", this._ratings);
        console.log("!!", clip);
        this._id = clip.id;
        this._title = clip.title;
        this._description = clip.description;
        this._uid = clip.uid;
        console.log(">", this._uid)
    }

    get title() {
        return this._title;
    }


    get description() {
        return this._description;
    }

    get uid() {
        return this._uid;
    }

    get ratings() {

    }

}
