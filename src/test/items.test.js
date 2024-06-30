import { describe, it } from "node:test"
import { Dynamo } from "../dynamo-db.js"
import assert from 'node:assert/strict';


describe("Integrations tests with DynamoDB and LocalStack", () => {

    const database = Dynamo

    const testTableName = "items_table_test"


    it("it should create the items table", async () => {

        const response = await database.createTable(testTableName)
        const status = response["$metadata"].httpStatusCode
        assert.equal(response != undefined, true)
        assert.equal(status, 200)
    })

    it("it should create a item", async () => {
        const response = await database.createItem({
            id: "123",
            name: "teste",
            price: 100
        }, testTableName)


        const status = response["$metadata"].httpStatusCode
        assert.equal(response != undefined, true)
        assert.equal(status, 200)
    })

    it("it should get all items", async () => {
        const response = await database.getAllItems(testTableName)
        const status = response["$metadata"].httpStatusCode
        assert.equal(response != undefined, true)
        assert.equal(status, 200)
        assert.equal(response.Count > 0, true)
        assert.equal(response.ScannedCount > 0, true)
        assert.equal(response.Items.length > 0, true)

    })

    it("it should delete the items table", async () => {

        const response = await database.deleteTable(testTableName)

        assert.equal(response != undefined, true)

    })


})
