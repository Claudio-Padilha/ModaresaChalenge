import  sqlite3 from "sqlite3"
const DATABASE = process.env.DATABASE

if (!DATABASE)
    throw new Error("Database was not informed!")

export const openConnection = () => {
    let db = new sqlite3.Database(DATABASE)
    return db
}

export const dbQuerry = (query: string, params?: any[]) => {
    let db = openConnection()
    return new Promise((resolve, reject)=> {
        db.all(query, params, (err, rows) => {
            if (err)
                reject(err)
            else
                resolve(rows)
        })
        
    })
    .finally(() => {
        db.close();
    })
}

export const dbQueryFirst = async (query: string, params?: any[]) => {
    const resp = await dbQuerry(query, params);
    return resp[0];
}
