import * as constants from '../../constants';
import * as Faker from 'faker';
import { MigrationInterface, QueryRunner, getRepository, getConnection } from "typeorm";
import { Rating } from "../entity/Rating";
import { Clip } from "../entity/Clip";
import { User } from "../entity/User";

export class CreateRatings3000000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        let ratings = [];

        const users = await getRepository(User)
            .createQueryBuilder("user")
            .where("user.role = :role", {role: "UPLOADER"})
            .andWhere("user.role = :role", {role: "RATER"})
            .getMany();

        const clips = await getRepository(Clip)
            .createQueryBuilder("clip")
            .getMany();

        clips.forEach(function(clip){
            const no_ratings = Math.floor(Math.random() * constants.MAX_NO_RATINGS_PER_VIDEO);
            for (let i = 0; i < no_ratings; i++) {
                let rating = new Rating();
                rating.stars = Math.floor(Math.random() * 5) + 1;
                if (Math.random() > constants.REVIEW_CHANCE) {
                    rating.title = Faker.lorem.sentence();
                    rating.description = Faker.lorem.paragraphs();
                } else {
                    rating.title = '';
                    rating.description = '';
                }
                rating.clip = clip;
                rating.user = users[Math.floor(Math.random() * users.length)];
                ratings.push(rating);
            }
        });

        const userRepository = getRepository(Rating);
        await userRepository.save(ratings);
    }

    public async down(queryRunner: QueryRunner): Promise<any> { }
}
