import { writeFile } from 'node:fs';

const JSONBIN_ROOT = 'https://api.jsonbin.io/v3';
const JSONBIN_ROUTE = '/b/';

// const BIN_ID = ''
// const ACCESS_KEY = ''

fetch(`${JSONBIN_ROOT}${JSONBIN_ROUTE}${BIN_ID}`, {
  method: 'GET',
  headers: {
    'X-Access-Key': ACCESS_KEY,
    'Content-Type': 'application/json',
    'X-Bin-Meta': 'false'
  }})
  .then((response) =>response.json())
  .then(data => {
    writeFile('./tokens.json', JSON.stringify(data.values), err => {
      if (err) {
        console.error(err);
      } else {
        console.log('token.json file written successfully');
      }
    });
  })
  .catch((error) => {
    console.log(error);
  }
);
