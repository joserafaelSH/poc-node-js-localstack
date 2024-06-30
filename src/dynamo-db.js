import { CreateTableCommand, DeleteTableCommand, DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb"
import { PutCommand } from "@aws-sdk/lib-dynamodb"

const awsConfig = {
    endpoint: process.env.AWS_ENDPOINT,
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
}

const dynamoClient = new DynamoDBClient(awsConfig)
export const Dynamo = {

    getAllItems: (tableName) => {

        return dynamoClient.send(new ScanCommand({
            TableName: tableName
        }))


    },

    /**
     *
     *@param {Object} item - The item that want to be created in db.
     *@Param {string} item.id - The unique id for this item.
     *@Param {string} item.name - The name of the product.
     *@Param {number} item.price - The price of the item.
     */
    createItem: (item, tableName) => {
        return dynamoClient.send(new PutCommand({
            TableName: tableName,
            Item: {
                ...item
            }

        }))
    },

    createTable: (tableName) => {
        return dynamoClient.send(new CreateTableCommand({
            TableName: tableName,
            KeySchema: [
                {
                    AttributeName: "id",
                    KeyType: "HASH"
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: "id",
                    AttributeType: "S"
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
        }))
    },

    deleteTable: (tableName) => {
        return dynamoClient.send(new DeleteTableCommand({
            TableName: tableName
        }))

    }
}



