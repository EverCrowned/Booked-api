import knex from "../../../../db/knex";
import Question from "../types/Question";

export default async (hwid: number) => {
    return knex<Question>("questions")
        .where({ homeworkid: hwid })
        .first();
};
