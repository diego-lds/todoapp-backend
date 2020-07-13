const TaskModel = require('../model/TaskModel');
const { find } = require('../model/TaskModel');
const { startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear } = require('date-fns');


const currentDate = new Date();

class TaskController {

    async create(req, res) {
        const task = new TaskModel(req.body);
        await task
            .save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        await TaskModel
            .findByIdAndUpdate(req.params.id, req.body, { new: true }) // new devolve a tarefa ja modificada
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })

    }

    async all(req, res) {
        await TaskModel
            .find({ macaddress: { '$eq': req.params.macaddress } })
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async findOne(req, res) {
        await TaskModel.findById(req.params.id)
            .then(response => {
                if (response) {
                    return res.status(200).json(response)
                } else {
                    return res.status(404).json({ error: 'Tarefa não encontrada' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async delete(req, res) {
        await TaskModel.findByIdAndDelete(req.body._id)
            .then((response) => {
                if (response)
                    return res.status(200).json({ message: 'Tarefa deletada com sucesso' })
                else
                    return res.status(404).json({ message: 'Tarefa não encontrada' })
            })
            .catch(error => res.status(500).json(error))
    }

    async done(req, res) {
        await TaskModel
            .findByIdAndUpdate(
                { '_id': req.params.id },
                { 'done': req.params.done },
                { new: true }
            )
            .then((response) => {
                if (response) {
                    return res.status(200).json(response)
                }
                else {
                    return res.status(404).json({ message: 'Tarefa não encontrada' })
                }
            })
            .catch(error => res.status(500).json(error))
    }

    async late(req, res) {
        await TaskModel
            .find({
                'macaddress': { '$in': req.params.macaddress },
                'when': { '$lt': currentDate },
                'done': { '$ne': true }
            })
            .sort('when')
            .then(response => {
                if (response.length) {
                    return res.status(200).json(response)
                } else
                    return res.status(404).json({ error: 'Nenhuma tarefa atrasada encontrada' })
            })
            .catch(error => res.status(500).json(error))
    }

    async today(req, res) {
        await TaskModel
            .find({
                'macaddress': { '$in': req.params.macaddress },
                'when': {
                    '$gte': startOfDay(currentDate),
                    '$lt': endOfDay(currentDate)
                }
            })
            .sort('when')
            .then(response => res.status(200).json(response))
    }

    async week(req, res) {
        await TaskModel
            .find({
                'macaddress': { '$in': req.params.macaddress },
                'when': {
                    '$gte': startOfWeek(currentDate),
                    '$lt': endOfWeek(currentDate)
                }
            })
            .sort('when')
            .then(response => res.status(200).json(response))

    }

    async month(req, res) {
        await TaskModel
            .find({
                'macaddress': { '$in': req.params.macaddress },
                'when': {
                    '$gte': startOfMonth(currentDate),
                    '$lt': endOfMonth(currentDate)
                }
            })
            .sort('when')
            .then(response => res.status(200).json(response))
    }

    async year(req, res) {
        await TaskModel
            .find({
                'macaddress': { '$in': req.params.macaddress },
                'when': {
                    '$gte': startOfYear(currentDate),
                    '$lt': endOfDay(currentDate)
                }
            })
            .sort('when')
            .then(response => res.status(200).json(response))
    }
}

module.exports = new TaskController();