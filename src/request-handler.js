
import Items from "./items.js"
import { Dynamo } from "./dynamo-db.js"
const DEFAULT_HEADER = { 'content-type': 'application/json' }
import {
    parse
} from 'node:url'
import ItemsService from "./items-service.js"
const itemService = new ItemsService({ database: Dynamo })

import {
    once
} from 'node:events'

const itemRoutes = ({ service }) => ({
    "/items:get": async (request, response) => {
        const allItems = await service.findAll()

        response.writeHead(201, DEFAULT_HEADER)
        response.write(JSON.stringify({
            results: allItems
        }))
        return response.end()

    },

    "/item:post": async (request, response) => {
        const data = await once(request, 'data')
        const item = JSON.parse(data)
        const newItem = new Items(item)
        service.create(newItem)
        response.writeHead(201, DEFAULT_HEADER)
        response.write(JSON.stringify({
            id: newItem.id,
            success: 'User created with success!!',
        }))

        return response.end()
    },
})

const routes = itemRoutes({ service: itemService })

const allRoutes = {
    ...routes,


    default: (request, response) => {
        response.writeHead(404, DEFAULT_HEADER)
        response.write('not found!')
        response.end()
    }
}



export function handler(request, response) {
    const {
        url,
        method
    } = request

    const {
        pathname
    } = parse(url, true)

    const key = `${pathname}:${method.toLowerCase()}`
    const chosen = allRoutes[key] || allRoutes.default

    return Promise.resolve(chosen(request, response))
        .catch(handlerError(response))
}

function handlerError(response) {
    return error => {
        console.log('Something bad has  happened**', error.stack)
        response.writeHead(500, DEFAULT_HEADER)
        response.write(JSON.stringify({
            error: 'internet server error!!'
        }))

        return response.end()
    }
}

