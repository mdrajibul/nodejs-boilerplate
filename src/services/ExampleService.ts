import { camelize } from "../utils/common";

export class ExampleService {

  getName(name: string) {
    return camelize(name);
  }
}