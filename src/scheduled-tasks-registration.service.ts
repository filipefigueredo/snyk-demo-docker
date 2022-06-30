import { CronJob } from 'cron';

export class ScheduledTasksRegistrationService {
  cronJob: CronJob;

  constructor() {
    /**
     * Cron Ranges
     *
     * Seconds: 0-59
     * Minutes: 0-59
     * Hours: 0-23
     * Day of Month: 1-31
     * Months: 0-11 (Jan-Dec)
     * Day of Week: 0-6 (Sun-Sat)
     *
     */

    // this.cronJob = new CronJob('*/30 * * * *', async () => {
    //   console.log(`[${new Date().toISOString()}] Executing my cronJob. `);
    //   console.debug(`[${new Date().toISOString()}] Next scheduled Execution: ${this.cronJob.nextDate().toISOString()}`);

    //   try {
    //     await this.runner();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // });

    // Start job
    // if (!this.cronJob.running) {
    //   this.cronJob.start();
    // }
  }

  // async runner(): Promise<void> {
    
  //   console.log(`I am executing the cronjob runner function. I will add here my api call with bot messages`);
  // }
}
