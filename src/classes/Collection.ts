import { getRepository, getConnection, createQueryBuilder, Like, MoreThan } from "typeorm";

import { UserModel } from "../models/UserModel";
import { ClipModel } from "../models/ClipModel";
import { RatingModel } from "../models/RatingModel";
import { User } from "./User";
import { Clip } from "./Clip";
import { Rating } from "./Rating";

export class Collection {
    private _kind: "users" | "clips" | "ratings";
    private _things: User[] | Clip[] | Rating[] | any;

    constructor(kind: "users" | "clips" | "ratings") {
        this._kind = kind;
        this._things = [];
    }

    async init(action: "search" | "newest" | "reports", wanted?: string) {
        this._things = [];
        let things;
        let thingModel;
        switch (this._kind) {
            case "users": {
                thingModel = UserModel;
                break;
            }
            case "clips": {
                thingModel = ClipModel;
                break;
            }
            case "ratings": {
                thingModel = RatingModel;
                break;
            }
        }

        switch (action) {
            case "newest": {
                const thingRepository = getRepository(thingModel);
                things = await thingRepository.find({
                    order: { createdAt: "DESC" },
                    take: 10
                });
                break;
            }
            case "search": {
                const thingRepository = getRepository(thingModel);
                things = await thingRepository.find({
                    where: [
                        { title: Like("%" + wanted + "%") },
                        { description: Like("%" + wanted + "%") }
                    ]
                });
                break;
            }
            case "reports": {
                const thingRepository = getRepository(thingModel);
                things = await thingRepository.find({
                    where: { reports: MoreThan(0) }
                });
                break;
            }
        }


        const a = async () => {
            for (const thing of things) {
                let thng;
                switch (this._kind) {
                    case "users": {
                        // let thng = new User();
                        break;
                    }
                    case "clips": {
                        thng = new Clip();
                        await thng.init(thing.id);
                        break;
                    }
                    case "ratings": {
                        // let thng = new Rating();
                        break;
                    }
                }
                this._things.push(thng);

            }

        }
        await a();
    }

    get things() {
        return this._things;
    }

    get length() {
        return this._things.length;
    }

}
