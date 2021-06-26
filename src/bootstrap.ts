import { loadConfigs } from '@mdrajibul/cloud-config-utils';
import { ApplicationHolder } from './utils/app-holder.util';

/**
 * Use to initialize all necessay configs and class
 * @author - Md.Rajib-Ul-Islam<mdrajibul@gmail.com>
 */
export default abstract class BootStrap {
  /**
   * Init porject basic setup like configs, application holder and initialize api cache
   */
  static async init() {
    const projectSetup = await loadConfigs();
    new ApplicationHolder(projectSetup);
  }
}
