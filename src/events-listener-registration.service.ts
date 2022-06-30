import { App } from '@slack/bolt';
import { Command } from './github/enums/command.enum';
import { getConfig } from './common/configurations/config';
import { GlobalCommandService } from './github/global-command.service';

export class EventsListenerRegistrationService {
  private slashCommandPattern: string;
  private readonly globalCommandService: GlobalCommandService;


  constructor(private readonly app: App) {
    this.globalCommandService = new GlobalCommandService();
    this.slashCommandPattern = getConfig(`app.slashCommandPattern`);
  }

  /**
   * Method that listens for the '/game' to should be interpreted by the slack bot
   *
   */
  commandListener(): void {
    this.app.command(this.slashCommandPattern, async ({ payload, ack, say, respond }) => {
      await ack();

      const { text, user_id, user_name } = payload;
      const commandArguments = text.split(' ');

      switch (commandArguments[0]) {
        case Command.CREATE:
          await say(await this.globalCommandService.create(user_name, commandArguments));
          break;

        case Command.DESTROY:
          await say(await this.globalCommandService.destroy(user_name, commandArguments));
          break;

        default:
          //await say(this.globalCommandService.invalidCommand(payload.text));
          break;
      }
    });
  }

  /**
   * Methods that listen for all slack events that should be interpreted by the
   * slack bot
   *
   * @param app bolt application instance
   *
   */
  messageListener(): void {
    this.app.message(/.+/, async ({ message, say }) => {
     // Add here message logic     
    });
  }

  actionListener(): void {
    this.app.action(/.+/, async ({ payload, ack, say, respond }) => {
      // Acknowledge action request
      await ack();
    });
  }
}
