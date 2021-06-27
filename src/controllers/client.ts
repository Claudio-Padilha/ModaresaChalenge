import { Request, Response } from 'express'
import { Client, clientModel } from '../models/client'
import { badRequest, internalServerError } from '../services/utils'

const insertClient = async (req: Request, res: Response) => {
   
    const client_req = req.body
    if (!client_req)
        return badRequest(res, "You should inform a client!")

    if (!client_req.name)
        return badRequest(res, "You should inform the client name!")

    const client = req.body as Client
    return clientModel.insertClient(client)
    .then(client => {
        res.json(client)
    })
    .catch(err => internalServerError(res, err))
}

const listClients = ({}: Request, res: Response) => {
    clientModel.listClients()
        .then(clients => {
            res.json(clients)
        })
        .catch(err => internalServerError(res, err));
}


export const clientController = {
    insertClient,
    listClients
}