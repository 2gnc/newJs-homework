const { assert } = require('chai');
const Serial = require('../SerialRequest');

class SerialTesting extends Serial {
  constructor(fake) {
    super();
    this.fake = fake;
  }
  toJson() {
    return this.fake;
  } 
  toFetch() {
    return Promise.resolve();
  }
};

const urls = [
  'https://jsonplaceholder.typicode.com/photos',
  'https://jsonplaceholder.typicode.com/posts/2',
];

let testOne = null;
let testTwo = null;

const ok = (res) => {
  testOne = true;
  resp = res;
};
const no = () => { testTwo = true; };

describe('SerialRequest', () => {
  it('должен выполняться колбэк Ok в случае успеха', (done) => {

    const se = new SerialTesting('test');
    const pro = new Promise((res, rej) => {
      se.get(urls[0], ok, no)
        .get(urls[1], ok, no);
      res();
    });

    pro
      .then(() => { done(); })
      .then(() => { assert.equal(testOne, true); })
      .catch(err => console.log(err));
  });

  it('Должен вызываться колбэк No в случае ошибки', (done) => {
    const se = new SerialTesting('test');
    const pro = new Promise((res, rej) => {
      se.get(urls[0], ok, no)
        .get(urls[1], ok, no);
      rej();
    });
    pro
      .then(() => { assert.equal(testTwo, true); })
      .catch(() => done());
  });
});

