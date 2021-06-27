const Database = require("../db/config")

module.exports = {
   async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomid = 0
        let roomexiste = true
        
        while(roomexiste){

        
        for(let i=0; i < 6; i++){
            i == 0 ? roomid = Math.floor(Math.random()*10).toString() :
            roomid += Math.floor(Math.random()*10).toString()
        }

        const roomsid = await db.all(`SELECT id FROM rooms`)

       roomexiste = roomsid.some(roomsid => roomsid === roomid)

        if(!roomexiste){
            await db.run(`INSERT INTO rooms (
                id,
                pass
            ) VALUES(
                ${parseInt(roomid)},
                ${pass}
            )`)
           
        }

        }

        await db.close()

        res.redirect(`/room/${roomid}`)
    }, 

   async open(req, res) {
    const db = await Database()
        const roomId = req.params.room
        
        const questions = await db.all(`SELECT * 
        FROM questions WHERE sala = ${roomId} and read = 0`)

        const questionRead = await db.all(`SELECT * 
        FROM questions WHERE sala = ${roomId} and read = 1`)

        let isQuestions

        if(questions.length == 0){
            if(questionRead.length == 0){
                isQuestions = true
            }
        }

        res.render("room", {roomId: roomId, questions: questions, questionRead: questionRead, isQuestions: isQuestions})
    },

     enter(req, res){
        const roomid = req.body.roomId
        res.redirect(`/room/${roomid}`)
    }
}
