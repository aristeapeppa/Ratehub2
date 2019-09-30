import * as Faker from 'faker';
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entity/User";

export class CreateUsers1000000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let users =[];

    // Create admin
    let user = new User();
    user.username = "admin";
    user.password = "admin";
    user.hashPassword();
    user.role = "ADMIN";
    users.push(user);

    // Create other users
    for (var i = 0; i < 10; i++) {
      let user = new User();
      user.username = Faker.internet.userName();
      user.password = "test";
      user.hashPassword();
      user.role = "UPLOADER";
      users.push(user);
    }

    const userRepository = getRepository(User);
    await userRepository.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
