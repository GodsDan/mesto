// проходим по массиву и выводим в консоль
  initialCards.forEach(function(elem){
    let element = document.querySelector('.elements');
    let elementTemplate = document.querySelector('#element').content;
    let cardElement = elementTemplate.cloneNode(true);
    cardElement.querySelector('.element__image').src = elem.link;//ссылка
    cardElement.querySelector('.element__title').textContent = elem.name;//добавили текст и альт
    cardElement.querySelector('.element__image').alt = elem.name;
    cardElement.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });
    selectElementItem(cardElement);  //удаление карточки
    cardElement.querySelector('.element__image').addEventListener('click', openImage);
    element.append(cardElement);  //добавить карточки в конец
});

function openImage (evt) {
    let imageElement = evt.target;
    let imageSrc = imageElement.src;
    let imageTitle = imageElement.alt;
    let image = popupSectionOpenImage.querySelector('.popup__image');
    let title = popupSectionOpenImage.querySelector('.popup__title');
    image.src = imageSrc;
    title.textContent = imageTitle;
    popupSectionOpenImage.classList.add('popup_opened');
    popupSectionOpenImage.classList.add('popup_back');
    console.log('На меня кликнули',imageSrc,imageTitle);
}

//Функция удаления карточки
function selectElementItem (elem) {
    console.log('elem', elem);
    let buttonDeleteElement = elem.querySelector('.element__trash');//кнопка удаления карточки
    buttonDeleteElement.addEventListener('click', elementDelete)
}

function elementDelete(event){
    let item = event.target.closest('.element');
    item.remove();
}




// Создаем карточку
function newCard (){
    let element = document.querySelector('.elements');
    let elementTemplate = document.querySelector('#element').content;
    let addCardElement = elementTemplate.cloneNode(true);
    addCardElement.querySelector('.element__image').src = linkInput.value;
    addCardElement.querySelector('.element__title').textContent = locationInput.value;
    addCardElement.querySelector('.element__image').alt = locationInput.value;
    addCardElement.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });
    selectElementItem(addCardElement);  //удаление карточки
    addCardElement.querySelector('.element__image').addEventListener('click', openImage);
    element.prepend(addCardElement);
    
}


// Создаем переменные
let profileButtonEdit = document.querySelector('.profile__button-edit');// кнопка изменения данных профиля
let profileButtonAdd = document.querySelector('.profile__button-add'); // кнопка добавления новой карточки 

let popupSectionEditProfile = document.getElementById ('popup-profile');//попап изменения данных профиля
let popupSectionAddCard = document.getElementById ('popup-card');//попап добавления новой карточки
let popupSectionOpenImage = document.getElementById ('popup-increase-image'); //попап открытия картинки

let popupCloseButtonEdit = popupSectionEditProfile.querySelector('.popup__close-button');//кнопка закрытия попапа редактирования информации профиля
let popupCloseButtonAdd = popupSectionAddCard.querySelector('.popup__close-button'); //кнопка закрытия попапа добавления новой карточки
let popupCloseButtonOpenImage = popupSectionOpenImage.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name'); // находим поле для вывода имени на странице
let profileDescription = document.querySelector('.profile__description'); // находим поле "о себе" на странице




// Находим форму изменения данных профиля в DOM
let formElementEditProfile = popupSectionEditProfile.querySelector('.form');
// Находим форму добавления новой карточки в DOM
let formElementAddCard = popupSectionAddCard.querySelector('.form');

// Находим поля формы в DOM
let nameInput = formElementEditProfile.querySelector('.form__data_input_name');// Имя 
let jobInput = formElementEditProfile.querySelector('.form__data_input_description'); // О себе
let locationInput = formElementAddCard.querySelector('.form__data_input_location'); // Название для карточки
let linkInput = formElementAddCard.querySelector('.form__data_input_link'); // Ссылка на картинку



// изменение данных профиля
profileButtonEdit.addEventListener('click',()=>{
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    popupSectionEditProfile.classList.add('popup_opened'); 
});

//Закрытие попапа на крестик
popupCloseButtonEdit.addEventListener('click',()=>{
    popupSectionEditProfile.classList.remove('popup_opened');
});

function handleFormSubmitEditProfile (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupSectionEditProfile.classList.remove('popup_opened');
}
formElementEditProfile.addEventListener('submit', handleFormSubmitEditProfile);
//////////////////////////////////////////////////////////////////////
// Добавление новой карточки
profileButtonAdd.addEventListener('click',()=>{
    popupSectionAddCard.classList.add('popup_opened');
    formElementAddCard.reset();
});

//Закрытие попапа на крестик
popupCloseButtonAdd.addEventListener('click',()=>{
    popupSectionAddCard.classList.remove('popup_opened');
});

popupCloseButtonOpenImage.addEventListener('click',()=>{
    popupSectionOpenImage.classList.remove('popup_opened');
});
// пока что функция открытия на кнопку сохранить
function handleFormSubmitAddCard (evt) {
    evt.preventDefault();
    newCard();
    popupSectionAddCard.classList.remove('popup_opened');
}
formElementAddCard.addEventListener('submit', handleFormSubmitAddCard);

