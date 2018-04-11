
export default class SerialRequest {

  constructor() {
    // очередь вызова
    this.chain = [];
    // происходит ли выполнение сейчас
    this.isPending = false;
    // результат выполнения запроса
    this.currentResult = null;
  }

  /**
   * Заускает выполение запроса, вызывает колбэк в зависи от результата
   * @param {String} url адрес, куда делать запрос
   * @param {Function} res колбэк в случае удачного запроса
   * @param {Function} rej колбэк в случае неудачного запроса
   */
  get(url, res, rej) {

    this.putInChain(url, res, rej);

    if (!this.isPending) {
      this.isPending = true;
      this.executer();
    }

    return this;
  }
  /**
   * Берет из "очереди" первый элемент и вызывает с ним fetcher()
   */
  executer() {
    if (this.chain.length > 0) {
      const toExec = this.chain.splice(0, 1)[0];
      this.fetcher(toExec);
      this.isPending = false;
    }
  }
  /**
   * Вызывает fetch() с переденныеми параметрами
   * @param {Object} params 
   */
  fetcher(params) {
    fetch(params.url)
      .then((response) => {
        this.currentResult = response;
        params.res(response);
        console.log('!!!', this.currentResult);
        this.executer();
      })
      .catch((error) => {
        rej(error);
      });
  }

  /**
   * Создает очередь запросов
   * @param {url} url  
   * @param {res} res 
   * @param {rej} rej 
   */
  putInChain(url, res, rej) {
    this.chain.push({
      url,
      res,
      rej,
    });
  }

}
