import closeIcon from '../images/close_icon.png';

function ImagePopup({ name, link, isOpen, onClose, onCardClick, card }) {
   return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
    <div class="popup__image-content">
      <img
        className={"popup__close-button"}
        src={closeIcon}
        onClick={onClose} 
        id="close-image-button"
        alt="an image of a close button"
      />
      <img className="popup__image" 
      src={link} 
      alt="Vista grande de una imagen seleccionada" />
      <h2 class="popup__title">{name}</h2>
    </div>
  </div>
    )
}

export default ImagePopup;