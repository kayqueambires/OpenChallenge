import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/', routes);

app.listen(port, () => {
  console.log(`API Pronta e rodando em http://localhost:${port}`);
});
