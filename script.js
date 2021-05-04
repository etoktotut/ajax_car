document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const requestData = () => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
            request.addEventListener('readystatechange', () => {
                console.log(request.readyState, request.status);
                if (request.readyState !== 4) { return; }
                if (request.status === 200) {
                    const data = JSON.parse(request.responseText);
                    resolve(data);
                } else {
                    reject('Произошла ошибка');
                }
            });
        });

    };

    const foo = () => {
        requestData()
            .then((data) => outCar(data))
            .catch((data) => outError(data));
    };


    const outCar = (data) => {
        let stringForOut = 'выбери тачку';
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const { brand, model, price } = item;
                stringForOut = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
            }
        });
        output.innerHTML = stringForOut;
    };

    const outError = (data) => {
        output.innerHTML = data;
    };
    select.addEventListener('change', foo);
});