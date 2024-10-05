import '../index.css';
import Main from './Main.js'
import Header from './Header.js'
import Footer from './Footer.js'
import React from 'react';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
//import InfoTooltip from './components/InfoTooltip.js';



function App() {
  const [currentUser, setCurrentUser] = React.useState({name: '', about:'', avatar:'' });
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  /*const [isDeletePlacePopup, setIsDeletePlacePopup] = React.useState(false);*/
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isregistered, setIsRegistered] = React.useState(false);
  const [isRegisteredUser, setIsRegisteredUser] = React.useState(false);
  const navigate = useNavigate();
  
  React.useEffect(() => {
    api.getUserInfo() 
     .then(userData => {
      setCurrentUser(userData);
    })
      .catch(err => {
        console.error('Error al obtener los datos del usuario:', err);
      });
  }, []); 

  React.useEffect(() => {
    api.getInitialCards() 
      .then(cardsData => {
       setCards(cardsData);  
      })
  }, []);  

  function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    /*setIsDeletePlacePopup*/
  };

  function handleUpdateUser(userData) {
   api.setUserInfo(userData)
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
      handleCloseAllPopups();
    })
    .catch((err) => {
      console.error(`Error al actualizar el perfil: ${err}`);
    });
  }
  
  function handleUpdateAvatar (avatar) {
    api.setUserAvatar({avatar})
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
      handleCloseAllPopups();
    })
    .catch((err) => {
      console.error(`Error al actualizar el perfil: ${err}`);
    });
  }

  function handleAddPlaceSubmit(card) {
    api.addPlace(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      handleCloseAllPopups();
    })
    .catch((err) => {
      console.error(`Error al actualizar el perfil: ${err}`);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
}
  function handleCardDelete(card) {
   api.deleteCard(card._id)
     .then(() => {
      setCards(state => state.filter(c => c._id !== card._id));
      })
     .catch(err => {
       console.error(`Error al eliminar la tarjeta: ${err}`);  
      });
  }

  /*function handleCardFinalRemove(card) {
    api.removeCard(card._id)
      .then(() => {
       setCards(state => ......
       })
      .catch(err => {
        console.error(`Error al eliminar la tarjeta: ${err}`);  
       });
   }*/

       /*ESTO AL FINAL DEL CURRENT CONTEXT: 
      <DeletePlacePopup
        isOpen={isDeletePlacePopup}
        onClose={handleCloseAllPopups}
        onAddPlaceSubmit={handleCardFinalRemove}
      />  */

  function handleLoginClick() {
    setIsLoggedIn(true);
    console.log("Logging in...");
  }

  function handleRegisterClick() {
    setIsRegistered(true);
    console.log("Registering...");
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/");  
    }
  }, [isLoggedIn, navigate]); 

 return (
  <CurrentUserContext.Provider value={{ currentUser, selectedCard }}>
      <div className="page">
      <Routes>
            <Route path="/signin" element={<Login navigate={navigate} onLoginClick={handleLoginClick} />} />
            <Route path="/signup" element={<Register onRegisterClick={handleRegisterClick} />} />
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <>
      <Header />
      <Main
        onEditAvatarClick={handleEditAvatarClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete ={handleCardDelete}
        
      />
      <Footer />

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={handleCloseAllPopups}
        onUpdateAvatar={handleUpdateAvatar}/>
      
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={handleCloseAllPopups}
        onUpdateUser={handleUpdateUser} />

      <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
      />  
      <ImagePopup
          name={selectedCard.name}
          link={selectedCard.link} 
          isOpen={isImagePopupOpen}
          onClose={handleCloseAllPopups}
        />     
     
      </>
              ) : (
                <Navigate to="/signin" />
              )
            }
          />

          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </div>

  </CurrentUserContext.Provider>
);
}


export default App;