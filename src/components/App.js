import '../index.css';
import Main from './Main.js'
import Header from './Header.js'
import Footer from './Footer.js'
import React from 'react';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from "./ProtectedRoute"; 
import * as auth from "../utils/auth.js";

const UserProfile = () => {
  const { currentUser } = React.useContext(CurrentUserContext);

  return (
    <div>
      <h1>{currentUser.name}</h1>
      <p>{currentUser.about}</p>
      <img src={currentUser.avatar} alt="Avatar" />
    </div>
  );
};

function App() {
  const [currentUser, setCurrentUser] = React.useState({name: '', about:'', avatar:'' });
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isRegisteredUser, setIsRegisteredUser] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [registrationSuccess, setRegistrationSuccess] = React.useState(false);
  const navigate = useNavigate();
  

  const checkAuth = async () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try { 
        const userData = await auth.getUserProfile(token);
        if (userData) {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          navigate("/users/me"); 
          }
        } catch (err) {
          console.error("Error verificando token:", err);
          setIsLoggedIn(false);
        }
    } else {
      console.error('No se encontró el token de autenticación');
      setIsLoggedIn(false);
    }
  };

    React.useEffect(() => {
      checkAuth();  
    }, []);

    
  React.useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsData = await auth.getInitialCards() 
        setCards(cardsData);  
      } catch (err) {
        console.error("Error al cargar las tarjetas:", err);
      }
    };
  
    fetchCards(); 
  }, []); 

  function handleRegisterClick() {
    setIsRegistered(true);
    setIsTooltipOpen(true);  
    setRegistrationSuccess(true);  
    console.log("Registering...");
  }

  
  async function handleLoginClick() {
    setIsLoggedIn(true);
    console.log("Logging in...");
    checkAuth();
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/users/me");  
    } else {
      navigate('/signin');
    }
  }, [isLoggedIn, navigate]); 
  
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
    setIsTooltipOpen(false);
  };

  async function handleUpdateUser(userData) {
    try {
      const updatedUser = await auth.setUserInfo(userData)
      setCurrentUser(updatedUser);
      handleCloseAllPopups();
    } catch(err) {
      console.error(`Error al actualizar el perfil: ${err}`);
    }
  }
  
  function handleUpdateAvatar(avatar) {
    auth.setUserAvatar({avatar})
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
      handleCloseAllPopups();
    })
    .catch((err) => {
      console.error(`Error al actualizar el perfil: ${err}`);
    });
  }

  function handleAddPlaceSubmit(card) {
    auth.addPlace(card)
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
    
    auth.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
}
  function handleCardDelete(card) {
   auth.deleteCard(card._id)
     .then(() => {
      setCards(state => state.filter(c => c._id !== card._id));
      })
     .catch(err => {
       console.error(`Error al eliminar la tarjeta: ${err}`);  
      });
  }

return (
  <CurrentUserContext.Provider value={{ currentUser, selectedCard }}>
      <div className="page">
      <Header />
      <Routes>
            <Route path="/signin" element={<Login navigate={navigate} handleLoginClick={handleLoginClick} />} />
            <Route path="/signup" element={<Register onRegisterClick={handleRegisterClick} />} />
            <Route path="/users/me" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<UserProfile />} />
          } />
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} element={
                    <>
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
      <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={handleCloseAllPopups} 
          isSuccess={registrationSuccess}/>
                                </>
                            } />
                        }
                    />

          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </div>

  </CurrentUserContext.Provider>
);
}


export default App;