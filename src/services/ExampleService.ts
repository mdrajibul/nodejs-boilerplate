import { camelize } from "../util";

export class ExampleService {

  getName(name: string) {
    return camelize(name);
  }
}