export interface slackCommand {
  /**
   * A verification token to validate the event originated from Slack
   */
  token: string;
  /**
   * "The unique identifier of the workspace where the event occurred
   */
  team_id: string;
  /**
   * The unique identifier of the workspace where the event occurred
   */
  team_domain: string;
  /**
   * The unique identifier of the workspace where the event occurred
   */
  channel_id: string;
  /**
   * The unique identifier of the workspace where the event occurred
   */
  channel_name: string;
  /**
   * The unique identifier of the workspace where the event occurred
   */
  user_id: string;
  /**
   * The unique identifier of the workspace where the event occurred
   */
  user_name: string;
  /**
   * The unique identifier of the workspace where the event occurred
   */
  api_app_id: string;
  /**
   * The unique identifier of the workspace where the event occurred
   */
  is_enterprise_install: boolean;
  /**
   * The unique identifier of the workspace where the event occurred
   */
  response_url: string;
  /**
   * The unique identifier of the workspace where the event occurred
   */
  trigger_id: string;
}
