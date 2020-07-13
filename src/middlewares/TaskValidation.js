const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const TaskValidation = async (req, res, next) => {

    const { macaddress, type, title, description, when } = req.body;

    if (!macaddress) {
        return res.status(400).json({ error: 'MacAddress obrigatório!' })
    } else if (!type) {
        return res.status(400).json({ error: 'Tipo é obrigatório' })
    } else if (!title) {
        return res.status(400).json({ error: 'Título é obrigatório' })
    } else if (!description) {
        return res.status(400).json({ error: 'Descrição é obrigatória' })
    } else if (!when) {
        return res.status(400).json({ error: 'Data é obrigatória' })
    } else if (isPast(new Date(when))) {
        return res.status(400).json({ error: 'Data não pode ser anterior a data de hoje' })
    } else {
        let exists;
        exists = await TaskModel.findOne({
            'when': { '$eq': new Date(when) },
            'macaddress': { '$eq': macaddress }
        })

        if (exists) return res.status(400).json({ error: `Registro não pode ter dia e hora repetida; "${exists.title}"` })

        next();
    }



}

module.exports = TaskValidation;