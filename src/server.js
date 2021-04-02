import {config} from 'dotenv'
import express from 'express';
import {routes} from './routes';
import cors from 'cors';
import mongoose from "mongoose";

config();

const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;