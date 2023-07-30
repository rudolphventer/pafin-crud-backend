import express from 'express';
import bodyParser from 'body-parser';
import { router } from '../routes/router';

const app = express();

app.use(bodyParser.json());
app.use("/users", router);

export default app;