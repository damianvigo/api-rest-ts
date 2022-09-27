import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
const PORT = process.env.PORT || 3001;

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
