
import * as path from 'path';
import { Server } from './server';


//import api from './routes/api';

const isProduction = process.env.NODE_ENV === 'production';
const port = parseInt(process.env.PORT || '3000');

const distPath = path.resolve(__dirname, `../frontend/dist/${isProduction ? 'prod' : 'dev'}`);

const server = new Server({ port, distPath, isProduction });
server.start();