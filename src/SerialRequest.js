
class SerialRequest {

  constructor() {
    this.promise = Promise.resolve();
  }
  /**
   *  Сделано для подмены этого метода в тестах
   * @param {Response} smth ответ из fetch()
   */
  toJson(smth) {
    return smth.json();
  }
/**
 * Сделано для подмены этого метода в тестах
 * @param {String} url Адрес запроса 
 */
  toFetch(url) {
    return fetch(url);
  }

  get(url, onRes, onRej) {
    this.promise = this.promise
      .then(() => this.toFetch(url)
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
