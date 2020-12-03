const { Router } = require('express');
const router = Router();
const {getUsers, dbBackup} = require('../controller/index.controller');

router.get('/users', getUsers);

router.get('/backupdatabase', dbBackup);

module.exports = router;