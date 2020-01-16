const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save({ checkKeys: false })
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//tasks?team=india
//tasks?team=india&opp=australia 
router.get('/tasks',auth,async(req,res)=>{
try{
    if(req.query.team && !req.query.opp ){
        const team=req.query.team
        const matches= await Task.find({
           "info":{ "$exists": true },
           "info.teams": {
                   $all:[team]
               }
        })
        if(!matches){
            return res.status(404).send()
        }
        res.setHeader('Total_Results', matches.length)
         res.status(201).send(matches)
    }else if(req.query.opp && req.query.opp){
        const team=req.query.team
        const opp=req.query.opp
        const matches=await Task.find({
            "info":{ "$exists": true },
            "info.teams": {
                    $all:[team,opp]
                }
        })
        if(!matches){
            return res.status(404).send()
        }
        res.setHeader('Total_Results', matches.length)
         res.status(201).send(matches)
        //  console.log("finaleee")
    }
}catch(e){
    res.status(500).send(e)
}
})


//tasks/stat?team=England to get total no of matches and win

router.get('/tasks/stat',auth,async(req,res)=>{
    try{
        const team=req.query.stat
        const total=  await Task.find({
            "info":{ "$exists": true },
            "info.teams": {
                    $all:[team]
                }
         }).count()
        console.log(total)

        const win = await Task.find({
            "info.outcome.winner":team
        }).count()
        console.log(win)
        const lost= total-win

        res.send({"team":team,total,win,lost})

    }catch(e){
        res.status(500).send(e)
    }
})


//to get the summery of the all the matches of the particular team
//   /tasks/summery?team=India
router.get('/tasks/summery',auth,async(req,res)=>{
    const team=req.query.team
    try{
        const total=  await Task.find({
            "info":{ "$exists": true },
            "info.teams": {
                    $all:[team]
                }
         })
         const newArary=new Array()
         for(i=0;i<total.length;i++){
            newArary[i]=total[i].info
         }
         res.setHeader('Total_Results', total.length)
         res.send(newArary)
    }catch(e){
        res.status(500).send(e)
    }
})


router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


//to get summery of given match
router.get('/tasks/summery/:id',auth,async (req,res)=>{
    const id= req.params.id
    try{
        const task=await Task.findById(id)
        if(!task){
            return res.status(404).send()
        } 
        const sum=new Object(task.info)
        res.status(200).send(sum)
    }catch(e){
        res.status(401).send(e)
    }
})


router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router