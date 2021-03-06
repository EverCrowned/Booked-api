import request from "supertest";
import { expect } from "chai";

import { server } from "../../index";
import knex from "../../../db/knex";

const agent = request.agent(server);

const newUser = {
    role: "student",
    name: "SomeGuy",
    password: "WhatShouldITypeHere88@"
};

describe("Users routes", async () => {
    // We don't need to rerun migrations or seeds because we did in the auth route

    it("Creates an user", async function() {
        this.timeout(5000);
        const response = await agent
            .post(`/api/users/createUser/`)
            .send(newUser)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201);

        expect(response.body).to.deep.equal({
            id: 5,
            status: 201,
            message: "Successfully created"
        });
    });

    it("Fails to create an user with the same username", async () => {
        const response = await agent
            .post(`/api/users/createUser/`)
            .send(newUser)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body.message).to.equal(
            "That username seems to be already taken"
        );
    });
});
