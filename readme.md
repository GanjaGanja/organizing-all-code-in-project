# Организация кода проекта

Мой фреймворк для вёрстки на Bootstrap на основе статей [Организация кода для CSS-препроцессоров](https://canonium.com/articles/organizing-code-in-project) и [Приятная сборка frontend проекта](https://habrahabr.ru/post/250569/). Есть также несколько дополнений из проекта [HTML5 Boilerplate](https://html5boilerplate.com/).

## Использованное ПО

NPM, Bower, Less, Gulp и множество утилит для него.

## Исходники проекта

* src/
  * fonts/
  * html/
  * html5-boilerplate-tweaks/
  * img/
  * js/
  * styles/

### html/

* index.html
* template/
  * header.html
  * footer.html

Содержит index.html в котором прописаны команды вида `//= template/footer.html` для плагина rigger, импортирующего файлы.

### html5-boilerplate-tweaks/

* humans.txt _с автором(ами) проекта_
* robots.txt
* favicon.icon
* tile.png, tile-wide.png, browserconfig.xml _для иконок Windows 8_
* apple-touch-icon.png - _для iOS_

### styles/

* **components/** _цельные блоки, из которых строится страница_
  * _navbar.less
* **mixins/** _все примеси, используемые в проекте_
  * _buttons.less
  * _clearfix.less
* **modules/** _основные стили для элемента_
  * _buttons.less
  * _forms.less
  * _grid.less
  * _lists.less
  * _normalize.less
  * _scaffolding.less
  * _tables.less
  * _typography.less
* **pages/** _файлы специфичных стилей для конкретных страниц_
  * _home.less
* **partials/** _основные компоненты страницы_
  * _header.less
  * _main.less
  * _footer.less
* **_variables.less** _глобальные константы_
* **styles.less** _точка входа для всех стилей_

## Компиляция файлов проекта

src | build
--- | ---
src/fonts/ | build/fonts/
src/html/ | build/
src/html5-boilerplate-tweaks/ | build/
src/img/ | build/img/
src/js/main.js | build/js/main.js
src/styles/styles.less | build/css/styles.css

## Установка и сборка проекта

Для установки всех зависимостей перейти в папку проекта, ввести в консоли **npm install**, затем **bower install**. Для вёрстки и тестирования сайта ввести команду **gulp**.

Очистить папку с собранным проектом можно командой **gulp clean**. Для «продакшн» сборки сайта набрать **gulp --env=production build.**