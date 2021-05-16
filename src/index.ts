import cors from 'cors';
import express, { Request, Response } from 'express';
import path from 'path';
import ExampleController from './controllers/ExampleController';

const app = express();

const { PORT = 3000 } = process.env;

app.use(cors());

app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/api/example', (req: Request, res: Response) => {
  new ExampleController().getInfo(req, res);
});

app.get('/api/example/:name', (req: Request, res: Response) => {
  new ExampleController().getName(req, res);
});

app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT);
});

export default app;
