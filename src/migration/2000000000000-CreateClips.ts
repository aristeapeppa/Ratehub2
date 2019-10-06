import * as constants from '../../constants';
import * as Faker from 'faker';
import * as YoutubePlaylist from 'youtube-playlist';
import { MigrationInterface, QueryRunner, getRepository, getConnection } from "typeorm";
import { ClipModel } from "../models/ClipModel";
import { UserModel } from "../models/UserModel";

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

        const users = await getRepository(UserModel)
            .createQueryBuilder("user")
            .where("user.role = :role", { role: "UPLOADER" })
            .getMany();

        videos.forEach(function(video) {
            let clip = new ClipModel();
            clip.title = video.name;
            clip.description = Faker.lorem.paragraphs();
            clip.uid = video.id;
            clip.reports = 0;
            clip.user = users[Math.floor(Math.random() * users.length)];
            clips.push(clip);
        });

        const userRepository = getRepository(ClipModel);
        await userRepository.save(clips);
    }

    public async down(queryRunner: QueryRunner): Promise<any> { }
}
