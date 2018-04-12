
class SerialRequest {

  constructor() {
    this.prevRes = null;
    this.promise = Promise.resolve();
  }

  toJson(smth) {
    return smth.json();
  }

  get(url, onRes, onRej) {
    this.promise = this.promise
      .then(() => fetch(url)
        .then((res) => {
          let response = this.toJson(res);
          this.prevRes = res;
          return response;
        })
        .then(data => onRes(data, this.prevRes))
        .catch(err => onRej(err)))
      .catch(err => onRej(err));
    return this;
  }

}

module.exports = SerialRequest;
