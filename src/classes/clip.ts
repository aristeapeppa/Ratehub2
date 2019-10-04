import { getRepository, getConnection } from "typeorm";

import { ClipModel } from "../models/ClipModel";

export class Clip {
    id: number;
    title: string;
    description: string;
    uid: string;

    constructor() {}

    async init(id) {
        const clip = await getConnection()
            .createQueryBuilder()
            .select("clip")
            .from(ClipModel, "clip")
            .where("clip.id = :id", { id: id })
            .getOne();
        this.id = clip.id;
        this.title = clip.title;
        this.description = clip.description;
        this.uid = clip.uid;
        console.log(">", this.uid)
    }

}
