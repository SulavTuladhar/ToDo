const router = require('express').Router();

// Importing routing level middleware
const AuthRouter = require('./controller/auth.controller');
const UserRouter = require('./controller/user.controller');
const ProjectRouter = require('./controller/project.controller');

// Importing application level middlware
const isAdmin = require('./middlewares/isAdmin');
const authenticate = require('./middlewares/authenticate');

//Loading routing level middlware
router.use('/auth', AuthRouter);
router.use('/user', authenticate, UserRouter);
router.use('/project',authenticate, ProjectRouter);

module.exports = router;