import { ISetup } from "../interfaces/configuration.interface";

/**
 * Application holder to hold application global data and state
 * @author - Md.Rajib-Ul-Islam<mdrajibul@gmail.com>
 */
export class ApplicationHolder {
  static instance: ApplicationHolder;

  readonly projectSetup: ISetup;

  constructor(projectSetup: ISetup) {
    if (ApplicationHolder.instance) {
      return ApplicationHolder.instance;
    }
    this.projectSetup = projectSetup;
    ApplicationHolder.instance = this;
  }
}
