import { Request, Response } from 'express';
import { ExampleService } from '../services/ExampleService';
;

export default class ExampleController {

  private exampleService: ExampleService

  constructor() {
    this.exampleService = new ExampleService();
  }

  getInfo(req: Request, res: Response) {
    res.send(JSON.stringify({ name: 'boilerplate', version: '1.0.0' }));
  };

  getName(req: Request, res: Response) {
    const name = req.params.name;
    res.send(this.exampleService.getName(name));
  };
}
