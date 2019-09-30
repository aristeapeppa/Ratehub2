import * as Faker from 'faker';
import * as YoutubeRandom from 'youtube-random-video';
import { MigrationInterface, QueryRunner, getRepository, getConnection } from "typeorm";
import { Clip } from "../entity/Clip";
import { User } from "../entity/User";

export class CreateClips2000000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        let clips = [];

        console.log(1)

        function getRandomVideo() {
            console.log(5)
            return new Promise(resolve => {
                console.log(6)
                YoutubeRandom.getRandomVid(process.env.YT_API_KEY, function(err, data) {
                    console.log('---------------------------------');
                    console.log(data)
                    resolve(data);
                })
            });
        }

        let iter = [];
        for (var i = 0; i < 3; i++) {
            iter.push(0);
        }

        async function processArray(ar) {
            for (const item of ar) {
                let data = <any>{};
                data = await getRandomVideo();
                let clip = new Clip();
                clip.title = data.snippet.title;
                clip.description = data.snippet.description;
                clip.uid = data.id.videoId;
                const user = await getConnection()
                    .createQueryBuilder()
                    .select("user")
                    .from(User, "user")
                    .where("user.id = :id", { id: Math.floor(Math.random() * 13) + 1 })
                    .getOne();
                clip.user = user;
                clips.push(clip);
            }
        }

        await processArray(iter);

        console.log(4)
        const userRepository = getRepository(Clip);
        await userRepository.save(clips);
    }

    public async down(queryRunner: QueryRunner): Promise<any> { }
}
