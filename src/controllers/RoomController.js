const { open } = require("sqlite")
const Database = require("../db/config")

module.exports = {
    async create(req, res) {
        const db = await Database()
        const pass = req.body.pass
        let roomId = 0
        let isRoom = true

        while(isRoom){
            for(var i=0; i < 6; i++)
                roomId += Math.floor(Math.random() * 10).toString()
                
            roomId = roomId.slice(1)
             
            const verifyRoomIds = await db.all(`SELECT rooms.id FROM rooms`)
            isRoom = verifyRoomIds.some(verifyRoomId => verifyRoomId == roomId)
        }

        await db.run(`
            INSERT INTO rooms (
                id,
                pass
            )
            VALUES (
                ${parseInt(roomId)},
                "${pass}"
            )
        `)

        await db.close()
        
        res.redirect(`/room/${roomId}`)
    },
    async open(req, res) {
        const roomId = req.params.room
        const db = await Database()
        const questions = await db.all(`SELECT * FROM questions WHERE room_id = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room_id = ${roomId} AND read = 1`)
        
        let isQuestions = true

        if(questions.length == 0 && questionsRead.length == 0)
            isQuestions = false


        res.render("room", {roomId, questions, questionsRead, isQuestions})
    },
    async enter(req, res) {
        const roomId = req.body.room

        res.redirect(`/room/${roomId}`)
    }
}