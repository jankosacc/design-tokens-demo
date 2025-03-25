import { unlink } from 'node:fs';

unlink('tokens.json', function(error) {
  if(error) return console.error(error);
  console.log('tokens.json file deleted successfully')
});
