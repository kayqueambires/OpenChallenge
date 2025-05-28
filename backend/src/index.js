import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const mode = process.argv[2] || 'dev';

delete process.env.PORT;
delete process.env.NODE_ENV;

const envFile = `.env.${mode}`;
const result = config({ path: envFile });

if (result.error) {
  console.error('❌ Erro ao carregar o .env:', result.error);
  process.exit(1);
}

console.log('✅ Variáveis carregadas:', result.parsed);

// 4. Agora usa as variáveis
const app = express();
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || mode;

app.use(express.json());
app.use(cors());
app.use('/', routes);

app.listen(port, () => {
  console.log(`🚀 Ambiente: ${nodeEnv}`);
  console.log(`API Pronta e rodando em http://localhost:${port}`);
});
