import { SayArguments } from '@slack/bolt';

export class GlobalMessageBuilderService {
  private gameListMessageTemplate;
  private gameHelpMessageTemplate;
  private gameWrongCommandMessageTemplate;
  constructor() {
    this.gameListMessageTemplate = require('./../common/resources/message-templates/game-list.json');
    this.gameHelpMessageTemplate = require('./../common/resources/message-templates/global-help.json');
    this.gameWrongCommandMessageTemplate = require('./../common/resources/message-templates/wrong-command.json');
  }

  buildGameListMessage(userId: string): SayArguments | string {
    const message = this.gameListMessageTemplate;

    const actionsBlockIndex = message?.blocks?.findIndex((block) => block?.type === 'actions');

    message?.blocks[actionsBlockIndex].elements?.forEach((element) => (element.value = userId));

    return message;
  }

  buildHelpMessage(): SayArguments | string {
    return this.gameHelpMessageTemplate;
  }

  buildWrongCommandMessage(commandArgs: string): SayArguments | string {
    const message = this.gameWrongCommandMessageTemplate;
    const actionsBlockIndex = message?.blocks?.findIndex((block) => block?.type === 'section');

    message.blocks[actionsBlockIndex].text.text = `Game Center has no command named: \`/game ${commandArgs}\``;

    return message;
  }
}
