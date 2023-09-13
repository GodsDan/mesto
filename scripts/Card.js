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
        this._card = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        const elementImage = this._card.querySelector('.element__image');
        elementImage.src = this._link;
        elementImage.alt = this._name;
        this._card.querySelector('.element__title').textContent = this._name;
        this._setEventListener();
        return this._card;
    }

    _setEventListener() {
        this._card.querySelector('.element__like').addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__like_active');
        });
        this._card.querySelector('.element__trash').addEventListener('click', this._handleCardDelete)
        this._card.querySelector('.element__image').addEventListener('click', () => this._openImage());
    }

    _handleCardDelete(evt) {
        evt.target.closest('.element').remove();
    }

    _openImage() {
        previewPopupImage.src = this._link;
        previewPopupImage.alt = this._name;
        previewPopupTitle.textContent = this._name;
        openPopup(popupSectionOpenImage);
    }
}

export { Card }