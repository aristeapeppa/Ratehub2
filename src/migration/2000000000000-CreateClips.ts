import * as constants from '../../constants';
import * as Faker from 'faker';
import * as YoutubePlaylist from 'youtube-playlist';
import { MigrationInterface, QueryRunner, getRepository, getConnection } from "typeorm";
import { Clip } from "../entity/Clip";
import { User } from "../entity/User";

export class CreateClips2000000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        let clips = [];

        function getVideos() {
            return new Promise(resolve => {
                YoutubePlaylist(constants.SEED_PLAYLIST, ['id', 'name']).then(res => {
                    resolve(res.data.playlist);
                });
            });
        }

        let videos = <any>{};
        videos = await getVideos();

        const users = await getRepository(User)
            .createQueryBuilder("user")
            .where("user.role = :role", { role: "UPLOADER" })
            .getMany();

        videos.forEach(function(video) {
            let clip = new Clip();
            clip.title = video.name;
            clip.description = Faker.lorem.paragraphs();
            clip.uid = video.id;
            clip.user = users[Math.floor(Math.random() * users.length)];
            clips.push(clip);
        });

        const userRepository = getRepository(Clip);
        await userRepository.save(clips);
    }

    public async down(queryRunner: QueryRunner): Promise<any> { }
}
