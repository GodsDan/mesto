// Создаем переменные
const profileButtonEdit = document.querySelector('.profile__button-edit');// кнопка изменения данных профиля
const profileButtonAdd = document.querySelector('.profile__button-add'); // кнопка добавления новой карточки 

const popupSectionEditProfile = document.querySelector('#popup-profile');//попап изменения данных профиля
const popupSectionAddCard = document.querySelector('#popup-card');//попап добавления новой карточки
const popupSectionOpenImage = document.querySelector('#popup-increase-image'); //попап открытия картинки

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
    const imageSrc = imageCard.src;
    const imageTitle = imageCard.alt;
    previewPopupImage.src = imageSrc;
    previewPopupImage.alt = imageTitle;
    previewPopupTitle.textContent = imageTitle;
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
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
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

function handleFormSubmitEditProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupSectionEditProfile);
}
formElementEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

// Добавление новой карточки
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

function handleFormSubmitAddCard(evt) {
    evt.preventDefault();
    const newCard = createCard({ name: locationInput.value, link: linkInput.value });
    cardsContainer.prepend(newCard);
    closePopup(popupSectionAddCard);
}
formElementAddCard.addEventListener('submit', handleFormSubmitAddCard);