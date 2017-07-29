import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

var token = null;
export function setToken (t) {
  token = t
}

export default function callApi(endpoint, method = 'get', body) {
  var headers = {};
  headers['content-type'] = 'application/json';
  if (token) {
    headers['Authorization'] = 'JWT ' + token;
  }
  return fetch(`${API_URL}/${endpoint}`, {
    headers: headers,
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  })
  .then(
    response => response,
    error => error
  );
}

export function uploadImage(body) {
  const data = new FormData();
  for ( var key in body ) {
    console.log(key);
    data.append(key, body[key]);
  }
  return fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: data
  }).then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
        if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
        response => response,
        error => error
    );
}
