import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";


class HomepageController{

static listAll = async (req: Request, res: Response) => {

 res.render('index', {
      title: 'Sequelize: Express Example'
    });
};

};

export default HomepageController;
