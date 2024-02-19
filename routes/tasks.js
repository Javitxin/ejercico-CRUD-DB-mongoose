const express = require('express');
const router = express.Router();
const Task = require('../models/Task.js');

router.post('create', async (req, res) => {
    try {
        const taskTitle = req.body.title;
        const taskCompleted = req.body.completed;
        const task = new Task({ title: taskTitle, completed: taskCompleted });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'problema al crear la bd' });
    }
})

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(tasks);

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'problema descargando datos' });
    }
})

router.get('/id/:_id', async (req, res) => {
    try {
        const id = req.params._id;
        const tasks = await Task.find(id);
        res.status(tasks).json(tasks);

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'problema descargando datos por id' });
    }
})

router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const id = req.params._id;
        const tasks = await Task.findByIdAndUpdate(id, { completed: true }, { new: true });
        res.status(201).json(tasks);

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'problema marcando la tarea completada' });
    }
})

router.put('/id/:_id', async (req, res) => {
    try {
        const id = req.params._id;
        const title = req.body.title;
        const tasks = await Task.findByIdAndUpdate(id, { title: title }, { new: true });
        res.status(201).json(tasks);

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'problema descargando y modificando datos' });
    }
})

router.delete('/id/:_id', async (req, res) => {
    try {
        const id = req.params._id;

        const tasks = await Task.findByIdAndDelete(id);
        res.status(201).json({ message: 'dato Borrado' });

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'problema descargando y borrando datos' });
    }
})

module.exports = router;