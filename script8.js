/*jslint browser*/
window.addEventListener("DOMContentLoaded", function () {
    "use strict";

    let openBtn = document.getElementById("open-btn");
    let closeBtn = document.getElementById("close-btn");
    let overlay = document.getElementById("overlay");
    let form = document.getElementById("feedback-form");
    let statusDiv = document.getElementById("status");

    // 1. Сохранение и восстановление данных через LocalStorage
    function loadFormData() {
        let storedData = localStorage.getItem("feedbackFormData");
        let data;
        if (storedData) {
            try {
                data = JSON.parse(storedData);
                form.fio.value = data.fio || "";
                form.email.value = data.email || "";
                form.phone.value = data.phone || "";
                form.org.value = data.org || "";
                form.msg.value = data.msg || "";
            } catch (ignore) {}
        }
    }

    function saveFormData() {
        let data = {
            fio: form.fio.value,
            email: form.email.value,
            phone: form.phone.value,
            org: form.org.value,
            msg: form.msg.value
        };
        localStorage.setItem("feedbackFormData", JSON.stringify(data));
    }

    // Сохранять данные при любом вводе в форму
    form.addEventListener("input", saveFormData);

    // 2. Управление попапом и History API
    function openPopup() {
        overlay.style.display = "flex";
        // Меняем URL при открытии
        history.pushState({popup: "open"}, "", "#contact-form");
        statusDiv.innerHTML = "";
    }

    function closePopup() {
        overlay.style.display = "none";
        // Если закрыли крестиком, а хэш остался - откатываем историю
        if (window.location.hash === "#contact-form") {
            history.back();
        }
    }

    // Отслеживаем нажатие кнопки "Назад" в браузере
    window.addEventListener("popstate", function () {
        if (window.location.hash !== "#contact-form") {
            overlay.style.display = "none";
        } else {
            overlay.style.display = "flex";
        }
    });

    openBtn.addEventListener("click", openPopup);
    closeBtn.addEventListener("click", closePopup);

    // 3. AJAX Отправка формы через fetch
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        statusDiv.innerHTML = "Отправка...";
        statusDiv.style.color = "blue";

        let formData = new FormData(form);

        // ВАЖНО: Замени YOUR_FORM_ID на свой код из formcarry.com
        fetch("https://formcarry.com/s/SXFCx_Qr7ix", {
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
            body: formData
        }).then(function (response) {
            if (response.ok) {
                statusDiv.innerHTML = "Успешно отправлено!";
                statusDiv.style.color = "green";
                form.reset();
                // Очистка данных при успешной отправке
                localStorage.removeItem("feedbackFormData");
            } else {
                statusDiv.innerHTML = "Ошибка при отправке.";
                statusDiv.style.color = "red";
            }
        }).catch(function () {
            statusDiv.innerHTML = "Сетевая ошибка.";
            statusDiv.style.color = "red";
        });
    });

    // Инициализация при первой загрузке страницы
    loadFormData();
    // Если пользователь обновил страницу, находясь по ссылке с хешем
    if (window.location.hash === "#contact-form") {
        overlay.style.display = "flex";
    }
});