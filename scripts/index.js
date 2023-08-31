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

// проходим по массиву и выводим в консоль
initialCards.forEach(function (cardInfo) {
    const newCard = createCard(cardInfo);
    cardsContainer.prepend(newCard);
});

function openImage(evt) { //фунция для увеличения картинки
    const imageCard = evt.target;
    previewPopupImage.src = imageCard.src;
    previewPopupImage.alt = imageCard.alt;
    previewPopupTitle.textContent = imageCard.alt;
    openPopup(popupSectionOpenImage);
}

//Функция удаления карточки
function setCardDeleteEventListener(card) {
    const buttonDelete = card.querySelector('.element__trash');//кнопка удаления карточки
    buttonDelete.addEventListener('click', handleCardDelete)
}

function handleCardDelete(evt) {
    evt.target.closest('.element').remove();
}

function createCard(data) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.element__image').src = data.link;
    card.querySelector('.element__title').textContent = data.name;
    card.querySelector('.element__image').alt = data.name;
    card.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    setCardDeleteEventListener(card);  //удаление карточки
    card.querySelector('.element__image').addEventListener('click', openImage);
    return card;
}

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
    hideInputError(formElementEditProfile, nameInput, validForm);
    hideInputError(formElementEditProfile, jobInput, validForm);
});

//Закрытие попапа на крестик
popupCloseButtonEdit.addEventListener('click', () => {
    closePopup(popupSectionEditProfile);
});

function handleFormSubmitEditProfile(evt, inactiveButtonClass) {
    evt.preventDefault();
    disabledButton(evt.submitter, inactiveButtonClass);
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupSectionEditProfile);
}
formElementEditProfile.addEventListener('submit', (evt)=>{handleFormSubmitEditProfile(evt, validForm.inactiveButtonClass)});

// Добавление новой карточки
profileButtonAdd.addEventListener('click', () => {
    openPopup(popupSectionAddCard);
    formElementAddCard.reset();
    hideInputError(formElementAddCard, locationInput, validForm);
    hideInputError(formElementAddCard, linkInput, validForm);
});

//Закрытие попапа на крестик
popupCloseButtonAdd.addEventListener('click', () => {
    closePopup(popupSectionAddCard);
});

popupCloseButtonOpenImage.addEventListener('click', () => {
    closePopup(popupSectionOpenImage);
});

function handleFormSubmitAddCard(evt, inactiveButtonClass) {
    evt.preventDefault();
    disabledButton(evt.submitter, inactiveButtonClass);
    const newCard = createCard({ name: locationInput.value, link: linkInput.value });
    cardsContainer.prepend(newCard);
    closePopup(popupSectionAddCard);

}
formElementAddCard.addEventListener('submit', (evt)=>{handleFormSubmitAddCard(evt, validForm.inactiveButtonClass)});

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
