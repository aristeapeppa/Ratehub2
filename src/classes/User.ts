import { getRepository, getConnection, createQueryBuilder } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

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
        role?: string,
        id?: number) {
        this._id = id;
        this._username = username;
        this._password = password;
        this._role = role;
    }

    async init(id) {


    }

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
            this._password = bcrypt.hashSync(this._password, 8);
            await userRepository.save(this);
        } catch (e) {
            // res.status(409).send("username already in use");
            return;
        }
    }

    async login() {
        const userRepository = getRepository(UserModel);
        let user: UserModel;
        try {
            user = await userRepository.findOneOrFail({ where: { username: this._username } });
        } catch (error) {
            // res.status(401).send();
            return;
        }

        //Check if encrypted password match
        if (!bcrypt.compareSync(this._password, user.password)) {
            // res.status(401).send();
            return;
        }


        const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: "1h" }
        );

        return [token, user.role];
    }

}
