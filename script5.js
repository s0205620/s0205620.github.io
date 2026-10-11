/*jslint browser*/
window.addEventListener("DOMContentLoaded", function () {
    "use strict";

    let button = document.getElementById("calculate-btn");
    let quantityInput = document.getElementById("quantity");
    let productSelect = document.getElementById("product");
    let resultDiv = document.getElementById("result");

    function calculateCost(event) {
        // Предотвращаем перезагрузку страницы при отправке формы
        event.preventDefault();

        let quantityStr = quantityInput.value;
        // Проверка регулярным выражением: строка должна состоять только из цифр
        let match = quantityStr.match(/^\d+$/);
        let quantity;
        let price;
        let total;

        // Если ввели буквы, спецсимволы, пробелы или отрицательные числа - выдаем ошибку
        if (match === null) {
            resultDiv.innerHTML = "Ошибка: недопустимые символы. Введите целое положительное число.";
            return;
        }

        // Преобразование строки в число с помощью parseInt
        quantity = parseInt(quantityStr, 10);
        price = parseInt(productSelect.value, 10);
        
        // Подсчет стоимости
        total = quantity * price;

        // Вывод результата на страницу
        resultDiv.innerHTML = "Стоимость заказа: " + String(total) + " руб.";
    }

    // Подключение обработчика события на кнопку после загрузки DOM
    button.addEventListener("click", calculateCost);
});