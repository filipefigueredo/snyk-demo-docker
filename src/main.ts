import { App, LogLevel } from '@slack/bolt';
import { getConfig } from './common/configurations/config';
import { ScheduledTasksRegistrationService } from './scheduled-tasks-registration.service';
import { EventsListenerRegistrationService } from './events-listener-registration.service';
import { routes } from './api-routes';
import { Package } from './common/configurations/pacakge';
import { Logger } from './common/logger/logger';

async function bootstrap(): Promise<void> {
  // If no environment is defined, sets environment to "local"
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'local';
    console.log(`Warning : Starting the application in "${process.env.NODE_ENV}" mode for debugging purposes.`);
  }

  // Package configurations
  const serviceName = Package.getName();
  const serviceVersion = Package.getVersion();

  // Server configurations
  const hostname: string = getConfig('server.hostname');
  const port = Number(getConfig('server.port'));
  const mode = process.env.NODE_ENV;

  const app = new App({
    signingSecret: getConfig<string>('slack.signingSecret'),
    token: getConfig<string>('slack.botOAuthToken'),
    logLevel: LogLevel.INFO,
    customRoutes: routes,
  });

  // Calling the function containing all scheduled task
  scheduledTasksRegistration(app);

  // Calling the function containing all event listeners of the application
  eventListenersRegistration(app);

  // Start your app
  await app.start(port);

  Logger.log(`The app ${serviceName} v${serviceVersion} is running at http://${hostname}:${port} in '${mode}' mode`);
}

/**
 * Method that acts as DI (Dependency Injection) container for the events listener
 * @param app application instance
 */
function eventListenersRegistration(app: App): void {
  Logger.debug('Loading event listener modules and dependencies');
  const eventsListenerService = new EventsListenerRegistrationService(app);

  // Add here the listeners
  eventsListenerService.commandListener();
  eventsListenerService.messageListener();
  eventsListenerService.actionListener();
}

/**
 * Method that acts as DI (Dependency Injection) container for the scheduled tasks
 * @param app application instance
 */
function scheduledTasksRegistration(app: App): void {
  Logger.debug('Loading scheduled tasks modules and dependencies');

  new ScheduledTasksRegistrationService();
}

bootstrap();
