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

    constructor(
        // title: string,
        // description: string,
        // uid?: string,
        // id?: number
    ) { }

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
            let rating = new Rating(rat.stars, rat.title, rat.description, rat.id);
            this._ratings.push(rating);
        });

        this._id = clip.id;
        this._title = clip.title;
        this._description = clip.description;
        this._uid = clip.uid;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }


    get descriptionShort() {
        return this._description.substring(0, 150) + ' ...';
    }

    get uid() {
        return this._uid;
    }

    get reviews() {
        let reviews = [];
        this._ratings.forEach((rating) => {
            if (rating.title != '') {
                reviews.push(rating);
            }
        });
        return reviews;
    }

    get score() {
        let sum = 0;
        this._ratings.forEach((rating) => {
            sum += rating.stars;
        });
        return Math.round((sum / this._ratings.length) * 10) / 10;
    }

    async rate(stars, title, description, clipId, userId) {
        console.log(stars)
        let rating = new Rating(stars, title, description);
        await rating.save(clipId, userId);
    }

}
