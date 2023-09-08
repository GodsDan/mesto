import { 
    previewPopupImage, 
    previewPopupTitle, 
    popupSectionOpenImage, 
    openPopup 
} from "./index.js";

class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }
    create() {
        const card = this._templateSelector.cloneNode(true);
        card.querySelector('.element__image').src = this._link;
        card.querySelector('.element__title').textContent = this._name;
        card.querySelector('.element__image').alt = this._name;
        card.querySelector('.element__like').addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__like_active');
        });
        this._setCardDeleteEventListener(card);  //удаление карточки
        card.querySelector('.element__image').addEventListener('click', (evt) => this._openImage(evt));
        return card;
    }
    _setCardDeleteEventListener(card) {
        const buttonDelete = card.querySelector('.element__trash');//кнопка удаления карточки
        buttonDelete.addEventListener('click', this._handleCardDelete)
    }
    _handleCardDelete(evt) {
        evt.target.closest('.element').remove();
    }
    _openImage(evt) { //метод для увеличения картинки
        const imageCard = evt.target;
        previewPopupImage.src = imageCard.src;
        previewPopupImage.alt = imageCard.alt;
        previewPopupTitle.textContent = imageCard.alt;
        openPopup(popupSectionOpenImage);
    }
}

export { Card }