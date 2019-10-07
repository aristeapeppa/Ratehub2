
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

import { UserModel } from "../models/UserModel";
import { User } from "../classes/User";

class UserController {
    static registerRender = async (req: Request, res: Response) => {
        res.render('register', {});
    };

    static register = async (req: Request, res: Response) => {
        let user = new User(req.body.username, req.body.password, req.body.role);
        let ans = await user.register();
        if (ans == 1) {
            res.send({ code: 1 });
        } else {
            res.send({ code: 0 });
        }
    };

    static loginRender = async (req: Request, res: Response) => {
        res.render('login', {});
    };

    static login = async (req: Request, res: Response) => {
        let { username, password } = req.body;
        let user = new User(username, password);
        let ans = await user.login();

        if (ans == 1) {
            res.send({ code: 1 });
        } else if (ans == 2) {
            res.send({ code: 2 });
        } else {
            res.send({ token: ans[0], role: ans[1] });
        }
    };
};

export default UserController;
