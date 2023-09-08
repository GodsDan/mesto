import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js';

const validForm = {
    formSelector: '.form',
    inputSelector: '.form__data',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_type_disabled',
    inputErrorClass: 'form__data_type_error',
}
// Создаем переменные
const profileButtonEdit = document.querySelector('.profile__button-edit');// кнопка изменения данных профиля
const profileButtonAdd = document.querySelector('.profile__button-add'); // кнопка добавления новой карточки 

const popupSectionEditProfile = document.querySelector('#popup-profile');//попап изменения данных профиля
const popupSectionAddCard = document.querySelector('#popup-card');//попап добавления новой карточки
const popupSectionOpenImage = document.querySelector('#popup-increase-image'); //попап открытия картинки
const popupsArray = document.querySelectorAll('.popup');

const popupCloseButtonEdit = popupSectionEditProfile.querySelector('.popup__close-button');//кнопка закрытия попапа редактирования информации профиля
const popupCloseButtonAdd = popupSectionAddCard.querySelector('.popup__close-button'); //кнопка закрытия попапа добавления новой карточки
const popupCloseButtonOpenImage = popupSectionOpenImage.querySelector('.popup__close-button'); //кнопка закрытия картинки

const profileName = document.querySelector('.profile__name'); // находим поле для вывода имени на странице
const profileDescription = document.querySelector('.profile__description'); // находим поле "о себе" на странице

// Находим форму изменения данных профиля в DOM
const formElementEditProfile = popupSectionEditProfile.querySelector('.form');
// Находим форму добавления новой карточки в DOM
const formElementAddCard = popupSectionAddCard.querySelector('.form');

// Находим поля формы в DOM
const nameInput = formElementEditProfile.querySelector('.form__data_input_name');// Имя 
const jobInput = formElementEditProfile.querySelector('.form__data_input_description'); // О себе
const locationInput = formElementAddCard.querySelector('.form__data_input_location'); // Название для карточки
const linkInput = formElementAddCard.querySelector('.form__data_input_link'); // Ссылка на картинку

const previewPopupImage = popupSectionOpenImage.querySelector('.popup__image');
const previewPopupTitle = popupSectionOpenImage.querySelector('.popup__title');

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element').content;

// проходим по массиву
initialCards.forEach(function (cardInfo) {
    const newCard = new Card(cardInfo, cardTemplate).create();
    cardsContainer.prepend(newCard);
});

function openPopup(popup) {
    popup.classList.add('popup_opened');
    window.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', closeByEscape);
}

// изменение данных профиля
profileButtonEdit.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupSectionEditProfile);
});

//Закрытие попапа на крестик
popupCloseButtonEdit.addEventListener('click', () => {
    closePopup(popupSectionEditProfile);
});

function handleFormSubmitEditProfile(evt, inactiveButtonClass) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupSectionEditProfile);
}
formElementEditProfile.addEventListener('submit', (evt) => { handleFormSubmitEditProfile(evt, validForm.inactiveButtonClass) });

profileButtonAdd.addEventListener('click', () => {
    openPopup(popupSectionAddCard);
    formElementAddCard.reset();
});

//Закрытие попапа на крестик
popupCloseButtonAdd.addEventListener('click', () => {
    closePopup(popupSectionAddCard);
});

popupCloseButtonOpenImage.addEventListener('click', () => {
    closePopup(popupSectionOpenImage);
});

// Добавление новых карточек
function handleFormSubmitAddCard(evt) {
    evt.preventDefault();
    const newCard = new Card({ name: locationInput.value, link: linkInput.value }, cardTemplate).create();
    cardsContainer.prepend(newCard);
    closePopup(popupSectionAddCard);
}
formElementAddCard.addEventListener('submit', (evt) => { handleFormSubmitAddCard(evt) });

//закрытие на Esc
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

//закрытие на оверлей
function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
}

popupsArray.forEach((el) => {
    el.addEventListener('mousedown', closeByOverlay);
})

const formList = Array.from(document.querySelectorAll(validForm.formSelector));
formList.forEach((formElement) => {
    new FormValidator(validForm, formElement).enableValidation();
});

export {
    cardTemplate,
    previewPopupImage,
    previewPopupTitle,
    popupSectionOpenImage,
    openPopup
} 