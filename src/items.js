import { randomUUID } from 'node:crypto'
export default class Items {
    constructor({ name, price }) {
        this.id = randomUUID()
        this.name = name
        this.price = price
    }
}
