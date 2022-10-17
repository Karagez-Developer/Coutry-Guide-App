// Получаем основные элементы

// Поле ввода
const inpSearch = document.querySelector('.search-inp'),
// получаем кнопку поиска
btnSearch = document.querySelector('.search-btn'),
// Текст валидации
validationText = document.querySelector('.validation-text'),
// Контент о стране
countryContent = document.querySelector('.country-content');

// Будем хранить api запрос
let api = '';

// Событие нажатия на кнопку
btnSearch.addEventListener('click', (e) => {
    // Сбрасываем default при нажатии на кнопку
    e.preventDefault();

    // Если поле ввода не пустое
    if ( inpSearch.value !== '' ) {
        validationText.classList.remove('active');
        // Вызываем функцию с api запросом
        apiCountry(inpSearch.value);
    }else {
        validationText.classList.add('active');
        countryContent.classList.remove('active');
    }
})

// Создание функции обработки запроса
function apiCountry(country) {
    // запрос
    api = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

    // Делаем ассинхронный запрос через fetch
    // Обрабатываем его
    fetch(api)
    .then( response => response.json() )
    .then( result => countryDetails(result) );
}

// Создаем функцию обрабатывающий объект с данными о стране
function countryDetails(info) {
    // Если ошибка 404, то ..., иначе ...
    if ( info.status == 404 ) {
        validationText.classList.add('active');
        countryContent.classList.remove('active');

    }else {
        validationText.classList.remove('active');
        countryContent.classList.add('active');
        // Заполняем контент

        // Для валюты
        let keysCurrencies = Object.keys(info[0].currencies);
        keysCurrencies = Object.values(info[0].currencies[keysCurrencies]);

        // Для языка
        let keysLanguages = Object.values(info[0].languages);

        document.querySelector('.flag-img').src = info[0].flags.png;
        document.querySelector('.country-name').textContent = info[0].altSpellings[1];
        document.querySelectorAll('.discription-answer')[0].innerHTML = info[0].capital[0];
        document.querySelectorAll('.discription-answer')[1].innerHTML = info[0].continents[0];
        document.querySelectorAll('.discription-answer')[2].innerHTML = info[0].population;
        document.querySelectorAll('.discription-answer')[3].innerHTML = keysCurrencies[0];
        document.querySelectorAll('.discription-answer')[4].innerHTML = keysLanguages[0];
        console.log(info);
    }
}




























