const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

router.get('/tasks',async (req,res)=>{

    try{
        const tasks = await Task.find({});
        res.send(tasks)
    }catch (e) {
        res.status(500).send(e)
    }
});

router.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id;

    try{
        const task = await Task.findById(_id);
        res.send(task)
    }catch (e) {
        res.status(500).send(e)
    }
});

router.patch('/tasks/:id',async (req,res)=>{

    const updates = Object.keys(req.body);
    const allowedUpdates = ['desc','completed'];
    const isValid = updates.every((update)=>{
        return allowedUpdates.includes(update)
    });

    if(!isValid)
        return res.status(400).send({error:'Invalid operation'});

    try{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if(!task)
            return res.status(404).send();
        res.send(task)
    }catch (e) {
        res.status(400).send(e)
    }
});

router.delete('/tasks/:id',async (req,res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task)
            return res.status(404).send();

        res.send(task)
    }catch (e) {
        res.status(500).send()
    }
});

module.exports = router;