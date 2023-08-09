let profileButtonEdit = document.querySelector('.profile__button-edit');
let popupSection = document.querySelector ('.popup');
let popupCloseButton = popupSection.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

// Находим форму в DOM
let formElement = document.querySelector('.form');

// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__data_input_name');
let jobInput = formElement.querySelector('.form__data_input_description');

profileButtonEdit.addEventListener('click',()=>{
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    popupSection.classList.add('popup_opened'); 
})

popupCloseButton.addEventListener('click',()=>{
    popupSection.classList.remove('popup_opened');
})

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupSection.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 