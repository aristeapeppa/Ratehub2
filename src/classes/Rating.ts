import { getRepository, getConnection } from "typeorm";

import { RatingModel } from "../models/RatingModel";

export class Rating {
    private _id: number;
    private _stars: number;
    private _title: string;
    private _review: string;

    constructor(stars?: number, title?: string, review?: string, id?: number) {
        this._id = id;
        this._stars = stars;
        this._title = title;
        this._review = review;
    }

    async init(id?: number, clipId?: number, userId?: number) {
        let rating;
        if (id) {
            rating = await getConnection()
                .createQueryBuilder()
                .select("clip")
                .from(RatingModel, "rating")
                .where("rating.id = :id", { id: id })
                .getOne();
        } else {

            const ratingRepository = getRepository(RatingModel);
            rating = await ratingRepository.findOne({
                where: {
                    clipId: clipId,
                    userId: userId
                }
            });
        }

        if (rating) {
            this._id = rating.id;
            this._stars = rating.stars;
            this._title = rating.title;
            this._review = rating.description;
        }
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

    async save() {
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(RatingModel)
            .values([
                { stars: this.stars, title: this.title, description: this.review }
            ])
            .execute();
    }

}
