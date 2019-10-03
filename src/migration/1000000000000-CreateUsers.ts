import * as constants from '../../constants';
import * as Faker from 'faker';
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { UserModel } from "../models/UserModel";

export class CreateUsers1000000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let users =[];

    // Create admin
    let user = new UserModel();
    user.username = "admin";
    user.password = "1234";
    user.hashPassword();
    user.role = "ADMIN";
    users.push(user);

    // Create uploaders
    for (var i = 0; i < constants.NO_UPLOADERS; i++) {
      let user = new UserModel();
      user.username = Faker.internet.userName();
      user.password = "1234";
      user.hashPassword();
      user.role = "UPLOADER";
      users.push(user);
    }

    // Create raters
    for (var i = 0; i < constants.NO_UPLOADERS; i++) {
      let user = new UserModel();
      user.username = Faker.internet.userName();
      user.password = "1234";
      user.hashPassword();
      user.role = "RATER";
      users.push(user);
    }

    const userRepository = getRepository(UserModel);
    await userRepository.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
