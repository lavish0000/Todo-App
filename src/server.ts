import 'dotenv/config'

import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}));

app.use(express.json({
    limit: '5mb'
}));

app.use(cors());


app.listen(process.env.PORT, () => {
    console.log('App  is running on port: ', process.env.PORT);
});