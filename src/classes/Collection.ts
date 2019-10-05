import { getRepository, getConnection, createQueryBuilder } from "typeorm";

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

    async init() {
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

        const thingRepository = getRepository(thingModel);
        things = await thingRepository.find({
            order: { createdAt: "DESC" },
            take: 10
        });

        const a = async () => {
        // await things.forEach(async (thing) => {
        for (const thing of things) {
            let thng;
            switch (this._kind) {
                case "users": {
                    // let thng = new User();
                    break;
                }
                case "clips": {
                    console.log(1)
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
            // console.log(this._things)

            console.log("5")
        }
        // });

        console.log("9")
    }
        await a();
    }

    get things() {
        console.log("-----", this._things)
        return this._things;
    }

    get length() {
        return this._things.length;
    }

}
