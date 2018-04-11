import Serial from './SerialRequest';

const urls = [
  'https://jsonplaceholder.typicode.com/photos',
  'https://jsonplaceholder.typicode.com/posts/2',
];

const ok = resp => console.log('выполнился без ошибок', resp);
const no = err => console.log('возникли ошибки', err);

const se = new Serial();

se.get(urls[0], ok, no)
  .get(urls[1], ok, no);
