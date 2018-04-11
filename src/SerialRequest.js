
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
    if (this.isPending) {
      this.putInChain(url, res, rej);
    } else {
      this.execQuery(url, res, rej);
    }
  }

  /**
   * Выполняет запрос, возвращает результат
   */
  execQuery(url, res, rej) {
    console.log(`Выполняю запрос к ${url}`);
    // отмечаем, что начался обмен
    this.isPending = true;
    const result = fetch(url).then(res).catch(rej);
    this.isPending = false;
    return result;
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
