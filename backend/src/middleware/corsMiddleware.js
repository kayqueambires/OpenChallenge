import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const allowedOriginsMiddleware = async (req, callback) => {
  let corsOptions;
  const origin = req.headers.origin;

  try {
    const allowedIps = await prisma.allowedIp.findMany({
      select: {
        ipAddress: true,
      },
    });

    const allowedOrigins = allowedIps.map((ip) => ip.ipAddress);

    // Se a requisição vem de um navegador, 'origin' estará presente
    // Se a requisição vem de um servidor (ex: Postman), 'origin' pode ser undefined
    // ou um IP local como 'http://localhost:XXXX'
    // Para simplificar, vamos considerar que requisições sem 'origin' ou de IPs locais são permitidas para desenvolvimento
    // Você pode ajustar essa lógica para ser mais restritiva em produção.
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.startsWith('http://localhost') ||
      origin.startsWith('http://127.0.0.1')
    ) {
      corsOptions = { origin: true }; // Permitir
    } else {
      corsOptions = { origin: false }; // Negar
    }
    callback(null, corsOptions);
  } catch (error) {
    console.error('Erro ao buscar IPs permitidos:', error);
    corsOptions = { origin: false }; // Negar em caso de erro
    callback(error, corsOptions);
  }
};

const customCors = cors(allowedOriginsMiddleware);

export default customCors;
