import { dbQuerry, dbQueryFirst } from "../services/db"

export type Client = {
    id: number,
    name: string
}

const insertClient = async (client: Client) =>{
    await dbQuerry(`INSERT INTO clients (name) VALUES(?)`, [client.name])

    let resp = await dbQuerry(`SELECT seq AS newId FROM sqlite_sequence WHERE name='clients'`)
    return getClient(resp[0].newId)
}

const getClient = async (id: number) => {
    const ret = await dbQueryFirst(`SELECT * FROM clients WHERE id = ?`, [id]);
    return ret as Client | undefined;
}

const listClients = async () => {
    const retorno = await dbQuerry(`SELECT * FROM clients`);
    return retorno as Client[];
}


export const clientModel = {
    insertClient,
    listClients
}