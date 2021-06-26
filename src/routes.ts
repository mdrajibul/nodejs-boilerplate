import express, { Request, Response } from 'express';
import path from 'path';
import ExampleController from './controllers/ExampleController';

const router = express.Router();

router.use('/assets', express.static(path.join(__dirname, 'assets')));

/**
 * @swagger
 * /api/example
 *    get:
 *      description: This should return list
 */

router.get('/api/example', (req: Request, res: Response) => {
  new ExampleController().getInfo(req, res);
});

/**
 * @swagger
 * /api/example/:name
 *    get:
 *      description: This should return name
 */

router.get('/api/example/:name', (req: Request, res: Response) => {
  new ExampleController().getName(req, res);
});

export default router;
