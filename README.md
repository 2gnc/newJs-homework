# Домашнее задание "Новые возможности Javascript"
## Задача
Вам нужно написать свою реализацию библиотеки, которая будет уметь совершать последовательные запросы.

## Описание

1. Склонировать репозиторий и установить зависимости
2. Заупустить в режиме разработки: ``` yarn run dev ``` - начнет работать webpack в режиме наблюдения. ``` yarn run serve``` - запустится live-server на порту 5555.
3. Линтер: ``` yarn run lint ```
4. Сборка: ``` yarn run build ```
5. Запуск тестов ``` yarn run test ```

## Реализация

Требуемый функционал реализован в классе ``` SerialRequest```. Функция ```get()``` добавляет ```then()``` к исходному пустому промису и в цепочке вызывает колбэк.

На текущий момент не удалось реализовать получение результата предыдущего вызова - постараюсь сделать.

## Демо
В файле index.js подключен модуль. В качестве тестового API использован [typicode.com](https://jsonplaceholder.typicode.com/).

## Пример использования

Импортируем класс ``` import Serial from './SerialRequest';```. Создаем экземпляр ```const se = new Serial(); ```.

Определяем колбэки: 
``` const ok = (resp, addition) => console.log('выполнился без ошибок', resp, prev.url);
const no = err => console.log('возникли ошибки', err);```

Делаем запросы
```se.get(urls[0], ok, no)
  .get(urls[1], ok, no);
```