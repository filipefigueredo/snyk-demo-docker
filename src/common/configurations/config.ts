import config from 'config';
export function getConfig<T>(configurationKey: string): T {
    return config.get(configurationKey) as T;
  }