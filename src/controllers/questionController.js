const Database = require('../db/config')

module.exports ={
    
    async index(req, res){
        const db = await Database()
        const roomId = req.params.roomid
        const questionid = req.params.question
        const action = req.params.action

        const password = req.body.password

          const verifyRoom =  await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

          if(verifyRoom.pass == password){
            if(action == "delete"){
                await db.run(`DELETE FROM questions WHERE id = ${questionid}`)

            }else if(action == "check"){

                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionid} `)

            }
            res.redirect(`/room/${roomId}`)
          }else{
              res.render('passincorrect', {roomId: roomId})
          }

    },

   async create(req, res){
        const db = await Database()
       const question =  req.body.question
        const roomid = req.params.room
        
        await db.run(`INSERT INTO questions(
            titulo,
            sala,
            read
        )VALUES(
            "${question}",
            ${roomid},
            0
        )`)

        res.redirect(`/room/${roomid}`)

    }
}