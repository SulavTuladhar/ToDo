const router = require('express').Router();
const tasksController = require('./tasks.controller')

// middleware
// const authentication = require('./../../middlewares/authenticate');

router.route('/')
    .get(tasksController.find)
    .post(tasksController.insert)

router.route('/add-tasks/:workspaceId')
    .post(tasksController.addTasks)
    .put(tasksController.updateTasks)
    .delete(tasksController.removeTasks)

router.route('/:id')
    .get(tasksController.findById)
    .put(tasksController.update)
    .delete(tasksController.remove)

    module.exports = router;