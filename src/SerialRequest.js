
class SerialRequest {

  constructor() {
    this.promise = Promise.resolve();
  }
  /**
   *  Так сделано, чтобы можно было подменить этот метод в тестах
   * @param {Response} smth ответ из fetch()
   */
  toJson(smth) {
    return smth.json();
  }

  get(url, onRes, onRej) {
    this.promise = this.promise
      .then(() => fetch(url)
        .then((res) => {
          return this.toJson(res)
            .then((response) => {
              return { response, res };
            });
        })
        .then(data => onRes(data.response, data.res))
        .catch(err => onRej(err)))
      .catch(err => onRej(err));
    return this;
  }

}

module.exports = SerialRequest;
