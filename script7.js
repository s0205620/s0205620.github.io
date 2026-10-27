/*jslint browser*/
/*global $*/
$(document).ready(function () {
    "use strict";

    $(".my-gallery").slick({
        dots: true,          // Включает пейджер (точки) под галереей
        arrows: true,        // Включает иконки стрелок влево/вправо
        infinite: true,      // Бесконечная прокрутка
        slidesToShow: 3,     // Показывает 3 изображения на экране ПК
        slidesToScroll: 3,   // Прокручивает сразу по 3 изображения
        responsive: [
            {
                breakpoint: 768, // Адаптивность для смартфонов (ширина экрана до 768px)
                settings: {
                    slidesToShow: 1, // Показывает 1 изображение на смартфонах
                    slidesToScroll: 1
                }
            }
        ]
    });
});