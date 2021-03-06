const Databse = require("./config")

const initDb = {
    async init() {
        const db = await Databse()

        await db.exec(
            `CREATE TABLE rooms (
            id INTEGER PRIMARY KEY,
            pass TEXT
            )`
        )
        await db.exec(
            `CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT,
            room_id INT,
            )`
        )

        await db.close()
    }
}

initDb.init()

/*
The init.js is the script we'll use to initialize our database after importing
the configurations we will connect to the databae and insert our two tables
then close it right after.
*/