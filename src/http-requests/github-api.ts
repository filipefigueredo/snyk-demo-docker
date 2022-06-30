import http from 'http';
import axios from 'axios';
import { getConfig } from './../common/configurations/config';
import { Logger } from '../common/logger/logger';

export async function githubActionRequest(url:string, data:any) {
  const token = getConfig<string>('github.personalAccessToken');

  const requestConfiguration = {
    validateStatus: null,
    headers: {
      accept: 'application/vnd.github.v3+json',
      authorization: `Bearer ${token}`,
    },
  };

  let response;
  try {
    response = await axios.post(url, data, requestConfiguration);
  } catch (error) {
    // Network error handling
    console.log(`Error sending HTTP request at ${url}. Error message: ${error.message}.`);
    throw new Error('Internal Error');
  }

  switch (response.status) {
    case 204:
      return response.data;
    case 401:
      console.log(`Invalid credentials sent to the url: ${url}. It could be either invalid credentials or an error.`);
      throw new Error('Internal Error');
    default:
      console.log(`The url: ${url} returned an unexpected response status: "${response.status} - ${http.STATUS_CODES[response.status]}".`);
      throw new Error('Internal Error');
  }
}

export async function getRepositoryList() {
  let url = `${getConfig<string>('github.repositoryListUrl')}`;
  
  const token = getConfig<string>('github.personalAccessToken');

  const requestConfiguration = {
    validateStatus: null,
    headers: {
      accept: 'application/vnd.github.v3+json',
      authorization: `Bearer ${token}`,
    },
  };

  let response;
  try {
    response = await axios.get(url, requestConfiguration);
  } catch (error) {
    // Network error handling
    console.log(`Error sending HTTP request at ${url}. Error message: ${error.message}.`);
    throw new Error('Internal Error');
  }

  switch (response.status) {
    case 200:
      return response.data
    case 401:
      console.log(`Invalid credentials sent to the url: ${url}. It could be either invalid credentials or an error.`);
      throw new Error('Internal Error');

    default:
      console.log(`The url: ${url} returned an unexpected response status: "${response.status} - ${http.STATUS_CODES[response.status]}".`);
      throw new Error('Internal Error');
  }
}
