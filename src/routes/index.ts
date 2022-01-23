import express from 'express';

const router = express.Router();

import task from './../modules/task';


router.use('/task', task);

export default router;
