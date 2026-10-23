/*jslint browser*/
window.addEventListener("DOMContentLoaded", function () {
    "use strict";

    let quantityInput = document.getElementById("quantity");
    let radios = document.getElementsByName("serviceType");
    let optionContainer = document.getElementById("option-container");
    let propertyContainer = document.getElementById("property-container");
    let selectOption = document.getElementById("service-option");
    let checkProperty = document.getElementById("service-property");
    let resultDiv = document.getElementById("result");

    function updatePrice() {
        let quantity = parseInt(quantityInput.value, 10);
        let price = 0;
        let selectedType = "1";
        let total = 0;

        if (Number.isNaN(quantity) || quantity <= 0) {
            resultDiv.innerHTML = "Ошибка: введите корректное количество.";
            return;
        }

        radios.forEach(function (radio) {
            if (radio.checked) {
                selectedType = radio.value;
            }
        });

        // Скрытие и показ элементов по заданию
        if (selectedType === "1") {
            optionContainer.style.display = "none";
            propertyContainer.style.display = "none";
            price = 1000;
        } else if (selectedType === "2") {
            optionContainer.style.display = "block";
            propertyContainer.style.display = "none";
            price = 2000 + parseInt(selectOption.value, 10);
        } else if (selectedType === "3") {
            optionContainer.style.display = "none";
            propertyContainer.style.display = "block";
            price = 3000;
            if (checkProperty.checked) {
                price += parseInt(checkProperty.value, 10);
            }
        }

        total = price * quantity;
        resultDiv.innerHTML = "Стоимость заказа: " + String(total) + " руб.";
    }

    // Слушатели событий для динамического пересчета
    quantityInput.addEventListener("input", updatePrice);
    radios.forEach(function (radio) {
        radio.addEventListener("change", updatePrice);
    });
    selectOption.addEventListener("change", updatePrice);
    checkProperty.addEventListener("change", updatePrice);

    // Первичный расчет при загрузке страницы
    updatePrice();
});