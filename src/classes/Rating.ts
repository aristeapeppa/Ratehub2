import { getRepository, getConnection } from "typeorm";

import { RatingModel } from "../models/RatingModel";

export class Rating {
    private _id: number;
    private _stars: number;
    private _title: string;
    private _review: string;

    constructor(id: number, stars: number, title: string, review: string) {
        this._id = id;
        this._stars = stars;
        this._title = title;
        this._review = review;
    }

    async init(id) {
        const clip = await getConnection()
            .createQueryBuilder()
            .select("clip")
            .from(ClipModel, "clip")
            .where("clip.id = :id", { id: id })
            .getOne();
        this._id = clip.id;
        this._title = clip.title;
        this._description = clip.description;
        this._uid = clip.uid;
        console.log(">", this._uid)
    }

    get title() {
        return this._title;
    }

    get stars() {
        return this._stars;
    }

    get review() {
        return this._review;
    }

}
