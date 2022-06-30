import { AppOptions } from '@slack/bolt';
export const routes: AppOptions['customRoutes'] = [
  {
    path: '/slack/health-check',
    method: ['GET'],
    handler: async (req, res) => {
      res.writeHead(200);
      res.end(`${new Date().toISOString()}: Service is up and running.`);
    },
  },
];
