
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

  executer() {
    if (this.chain.length > 0) {
      const toExec = this.chain.splice(0, 1)[0];
      console.log('что то делаю', toExec.url);
      this.isPending = false;
    }
  }

  /**
   * Выполняет запрос, возвращает результат
   */
  // execQuery(url, res, rej) {

  //   let result =

  //   fetch(url)
  //     .then(data => data.json())
  //     .then((data) => {
  //       return data;
  //     })
  //     .catch((err) => {  
  //       rej;  
  //     });

  //   res();

  //   return result;
  // }

  /**
   * Создает очередь запросов
   * @param {url} url  
   * @param {res} res 
   * @param {rej} rej 
   */
  putInChain(url, res, rej) {
    console.log(3333);
    this.chain.push({
      url,
      res,
      rej,
    });
  }

}
