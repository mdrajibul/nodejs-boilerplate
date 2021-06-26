import express from 'express';
import opn from 'opn';

import BootStrap from './bootstrap';
import { ApplicationHolder } from './utils/app-holder.util';

/**
 * Application Startup class
 */
export default abstract class Startup {
  
  /** Start the appplication */
  static async start(app: express.Application) {
    await BootStrap.init();

    const serverPort = ApplicationHolder.instance.projectSetup.port || 3000;
    const host = ApplicationHolder.instance.projectSetup.host || 'http://localhost';

    app.listen(serverPort, '0.0.0.0', () => {
      if (ApplicationHolder.instance.projectSetup.openBrowser) {
        opn(`${host}:${serverPort}`, { wait: true });
      }
      console.log(`Server running on ${host}:${serverPort}`);
    });
  }
}
