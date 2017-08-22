'use strict';

var GUESTS_IN_ROOM = 10;

var NUMBER_DATA = 8;

var dialog = document.querySelector('.dialog');
var dialogPanel = dialog.querySelector('.dialog__panel');
var tokyoPinMap = document.querySelector('.tokyo__pin-map');


// Генерация рандомного числа

var getRandomNumber = function (min, max) {
  return min + (Math.random() * (max - min));
};


// Получение рандомного элемента из массива

var getRandomElement = function (array) {
  var index = Math.floor(getRandomNumber(0, array.length - 1));
  return array[index];
};

var pinParams = {
  'author': {
    'avatar': 'img/avatars/user' + '0' + Math.floor(getRandomNumber(1, 8)) + '.png',
  },
  'offer': {
    'title': [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    'address': Math.floor(getRandomNumber(300, 900)) + ', ' + Math.floor(getRandomNumber(100, 500)),
    'price': Math.floor(getRandomNumber(1000, 1000000)),
    'type': [
      'flat',
      'house',
      'bungalo'
    ],
    'rooms': Math.floor(getRandomNumber(1, 5)),
    'guests': Math.floor(getRandomNumber(1, GUESTS_IN_ROOM)),
    'checkin': [
      '12:00',
      '13:00',
      '14:00'
    ],
    'checkout': [
      '12:00',
      '13:00',
      '14:00'
    ],
    'features': [
      'wifi',
      'dishwasher',
      'elevator',
      'conditioner'
    ],
    'description': '',
    'photos': []
  },
  'location': {
    'x': Math.floor(getRandomNumber(300, 900)),
    'y': Math.floor(getRandomNumber(100, 500))
  }
};

// Преобразование типа жилья в кирилическое название

var getTypeString = function (type) {
  var typeStr = '';

  switch (type) {
    case 'flat':
      typeStr = 'Квартира';
      break;
    case 'bungalo':
      typeStr = 'Бунгало';
      break;
    case 'house':
      typeStr = 'Дом';
      break;
  }

  return typeStr;
};

var getObjPins = function () {
  var pin = {
    'author': {
      'avatar': 'img/avatars/user' + '0' + Math.floor(getRandomNumber(1, 8)) + '.png',
    },
    'offer': {
      'title': getRandomElement(pinParams.offer.title),
      'address': Math.floor(getRandomNumber(300, 900)) + ', ' + Math.floor(getRandomNumber(100, 500)),
      'price': Math.floor(getRandomNumber(1000, 1000000)),
      'type': getTypeString(getRandomElement(pinParams.offer.type)),
      'rooms': Math.floor(getRandomNumber(1, 5)),
      'guests': Math.floor(getRandomNumber(1, GUESTS_IN_ROOM)),
      'checkin': getRandomElement(pinParams.offer.checkin),
      'checkout': getRandomElement(pinParams.offer.checkin),
      'features': getRandomElement(pinParams.offer.features),
      'description': '',
      'photos': []
    },
    'location': {
      'x': Math.floor(getRandomNumber(300, 900)),
      'y': Math.floor(getRandomNumber(100, 500))
    }
  };

  return pin;
};

var createPin = function (pin) {
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 40;
  var PIN_CLASS_NAME = 'pin';
  var IMG_CLASS_NAME = 'rounded';

  var pinBaloon = document.createElement('div');
  var img = document.createElement('img');

  pinBaloon.className = PIN_CLASS_NAME;
  pinBaloon.style.left = pin.location.x - pinBaloon.offsetWidth + 'px';
  pinBaloon.style.top = pin.location.y - pinBaloon.offsetHeight + 'px';

  img.className = IMG_CLASS_NAME;
  img.src = pin.author.avatar;
  img.width = IMG_WIDTH;
  img.height = IMG_HEIGHT;

  pinBaloon.appendChild(img);

  return pinBaloon;
};

var createMapNode = function (map) {
  var template = document.querySelector('#lodge-template').content;

  var mapElement = template.cloneNode(true);

  var mapTitle = mapElement.querySelector('.lodge__title');
  var mapAddress = mapElement.querySelector('.lodge__address');
  var mapPrice = mapElement.querySelector('.lodge__price');
  var mapType = mapElement.querySelector('.lodge__type');
  var mapRoomsAndGuest = mapElement.querySelector('.lodge__rooms-and-guests');
  var mapCheck = mapElement.querySelector('.lodge__checkin-time');
  var mapFeatures = mapElement.querySelector('.lodge__features');
  var mapDescription = mapElement.querySelector('.lodge__description');

  var dialogTitle = document.querySelector('.dialog__title');
  var dialogImg = dialogTitle.querySelector('img');

  mapTitle.textContent = map.offer.title;
  mapAddress.textContent = map.offer.address;
  mapPrice.textContent = map.offer.price + ' ₽/ночь';
  mapType.textContent = getTypeString(map.offer.type);
  mapRoomsAndGuest.textContent = 'Для ' + map.offer.guests + ' гостей в ' + map.offer.rooms + ' комнатах';
  mapCheck.textContent = 'Заезд после ' + map.offer.checkin + ', выезд до ' + map.offer.checkout;
  mapDescription.textContent = map.offer.description;
  dialogImg.src = map.author.avatar;

  pinParams.offer.features.forEach(function (element) {
    var span = document.createElement('span');

    span.className = 'feature__image feature__image--' + element;
    mapFeatures.appendChild(span);
  });

  return mapElement;
};

var getElementsArray = function (numberData) {
  var pins = [];

  for (var j = 0; j < numberData; j++) {
    pins.push(getObjPins());
  }

  return pins;
};

var getPinNodes = function (array) {

  var fragment = document.createDocumentFragment();

  array.forEach(function (element) {
    fragment.appendChild(createPin(element));
  });

  return fragment;
};

var getCartNode = function (array) {

  var fragment = document.createDocumentFragment();

  array.forEach(function (element) {
    fragment.appendChild(createMapNode(element));
  });

  dialog.replaceChild(fragment, dialogPanel);

  return fragment;
};

tokyoPinMap.appendChild(getPinNodes(getElementsArray(NUMBER_DATA)));
dialogPanel.appendChild(getCartNode(getElementsArray(1)));
