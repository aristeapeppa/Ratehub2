import { getRepository, getConnection, createQueryBuilder } from "typeorm";

import { UserModel } from "../models/UserModel";
import { ClipModel } from "../models/ClipModel";
import { RatingModel } from "../models/RatingModel";
import { Clip } from "./Clip";
import { Rating } from "./Rating";

export class User {
    private _id: number;
    private _username: string;
    private _password: string;
    private _role: string;

    constructor(
        username: string,
        password: string,
        role: string,
        id?: number) {
        this._id = id;
        this._username = username;
        this._password = password;
        this._role = role;
    }

    async init(id) { }

    get username() {
        return this._username;
    }

    get password() {
        return this._password;
    }

    get role() {
        return this._role;
    }

    async register() {
        const userRepository = getRepository(UserModel);
        try {
            await userRepository.save(this);
        } catch (e) {
            // res.status(409).send("username already in use");
            return;
        }
    }

}
