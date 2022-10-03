import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { router } from './routes';
import db from './config/mongo';
const PORT = process.env.PORT || 3001;

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(router);
db().then(() => console.log('connect to MongoDB'));
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
