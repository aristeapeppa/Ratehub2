import * as constants from '../../constants';
import * as Faker from 'faker';
import * as YoutubeRandom from 'youtube-random-video';
import { MigrationInterface, QueryRunner, getRepository, getConnection } from "typeorm";
import { Clip } from "../entity/Clip";
import { User } from "../entity/User";

export class CreateClips2000000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        let clips = [];

        function getRandomVideo() {
            return new Promise(resolve => {
                YoutubeRandom.getRandomVid(process.env.YT_API_KEY, function(err, data) {
                    if (err) {
                        console.log("ERROR >> ", err);
                    } else {
                        resolve(data);
                    }
                })
            });
        }

        let iter = [];
        for (var i = 0; i < constants.NO_CLIPS; i++) {
            iter.push(null);
        }

        const users = await getRepository(User)
            .createQueryBuilder("user")
            .where("user.role = :role", {role: "UPLOADER"})
            .getMany();

        async function processArray(ar) {
            for (const item of ar) {
                let data = <any>{};
                data = await getRandomVideo();
                let clip = new Clip();
                clip.title = data.snippet.title;
                clip.description = data.snippet.description;
                clip.uid = data.id.videoId;
                clip.user = users[Math.floor(Math.random() * users.length)];
                clips.push(clip);
            }
        }

        await processArray(iter);

        const userRepository = getRepository(Clip);
        await userRepository.save(clips);
    }

    public async down(queryRunner: QueryRunner): Promise<any> { }
}
