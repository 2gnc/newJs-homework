
export default class SerialRequest {

  constructor() {
    this.prevRes = null;
    this.promise = Promise.resolve();
  }

  get(url, onRes, onRej) {
    this.promise = this.promise
      .then(() => fetch(url)
        .then((res) => {
          const response = res.json();
          this.prevRes = res;
          return response;
        })
        .then(data => onRes(data, this.prevRes))
        .catch(err => onRej(err)))
      .catch(err => onRej(err));
    return this;
  }

}
