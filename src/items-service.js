export default class ItemsService {

    constructor({ database }) {
        this.database = database
        this.tableName = process.env.ITEMS_TABLE_NAME
    }

    findAll() {
        return this.database.getAllItems(this.tableName)
    }

    create(data) {
        return this.database.createItem(data, this.tableName)
    }
}

