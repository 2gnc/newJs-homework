const { assert } = require('chai');
const Serial = require('../SerialRequest');
const sinon = require('sinon');
const data = require('./testData.json');

class ss extends Serial {
  constructor(fakeJs) {
    super();
    this.fake = fakeJs;
  }
  toJson() {
    return this.fake;
  } 
};

const se = new ss(data);

global.fetch = () => {};

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
const no = () => { testTwo = false; };

const pro = new Promise((res, rej) => {
  se.get(urls[0], ok, no)
    .get(urls[1], ok, no);
  res();
});

sinon.stub(global, 'fetch').returns(Promise.resolve());

describe('SerialRequest', () => {
  it('должен выполняться колбэк Ok', (done) => {
    pro
      .then(() => { done(); })
      .then(() => { assert.equal(testOne, true); })
      .catch(err => console.log(err));
  });
});

