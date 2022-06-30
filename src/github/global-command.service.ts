import { SayArguments } from '@slack/bolt';
import { GlobalMessageBuilderService } from './global-message-builder.service';
import config from 'config';
import { getRepositoryList, githubActionRequest } from '../http-requests/github-api';

export class GlobalCommandService {
  private readonly globalMessageBuilderService: GlobalMessageBuilderService;
  private readonly createWorkflowUrl;
  private readonly deleteWorkflowUrl;

  constructor() {
    this.globalMessageBuilderService = new GlobalMessageBuilderService();
    this.createWorkflowUrl = config.get('github.createWorkflowUrl');
    this.deleteWorkflowUrl = config.get('github.deleteWorkflowUrl');
  }

  async create(username:string, commandArguments: string[]): Promise<SayArguments | string> {
          let message:  SayArguments | string

          // validate repository name
          const regExRepository = /^[a-z-]+[^-]$/gm;
          if (commandArguments.length != 3) {
            message = `🚫 Invalid Command: '${commandArguments.join(' ')}'` + `\n` + `How to create a repository: /githubnmbrs create <repository_name> <repository_template>`
            
          } else if (regExRepository.test(commandArguments[1]) == false) {
            message = `Invalid repository name '${commandArguments[1]}'. The repository name should be in kebab-case`
            
          } else if (commandArguments[2] == '') {
            message = `Invalid template name '${commandArguments[2]}'. Valid options are 'golang-template', 'dotnet-template'.`
            
          } else {
            message = `Ok ${username}, I'll create your awesome repository '${commandArguments[1]}'. 👍`
            const createWorkflowPayload = {
              ref: 'main',
              inputs: {
                repository_action: commandArguments[0],
                repository_name: commandArguments[1],
                repository_description: 'generic description',
                repository_visibility: 'private',
                repository_template: 'dotnet-template',
                // slack_channel: 'D03JCSDSV2M'
              },
            };
            await githubActionRequest(this.createWorkflowUrl, createWorkflowPayload);
  
          }

          return message;
  }

  async destroy(username:string, commandArguments: string[]){
    let message:  SayArguments | string

    if (commandArguments.length != 2) {
      message =`🚫 Invalid Command: '${commandArguments.join(' ')}'` + `\n` + `Here's how to destroy a repository: /githubnmbrs destroy <repository_name>`;      
    }
    
    const request = await getRepositoryList();
    const repositories: string[] = request.map((repository) => repository.name);

    if (!repositories.find((repository) => repository === commandArguments[1])) {
      message = `Sorry but there is no repository '${commandArguments[1]}' available to be destroyed in the organization.`;
      
    } else {
      const deleteWorkflowPayload = {
        ref: 'main',
        inputs: {
          repository_action: commandArguments[0],
          repository_name: commandArguments[1],               
        },
      };
      await githubActionRequest(this.deleteWorkflowUrl, deleteWorkflowPayload);
      message = `Ok, ${username}, I'll destroy 🗑️ your repository '${commandArguments[1]}'.`;
    }
    return message;
  }


//   help():SayArguments | string {
//     return this.globalMessageBuilderService.buildHelpMessage()
// }

//   invalidCommand(commandArgs: string):SayArguments | string {
//     return this.globalMessageBuilderService.buildWrongCommandMessage(commandArgs)
//   }

}
