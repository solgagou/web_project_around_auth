class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

getUserInfo() {
    return fetch(`https://around.nomoreparties.co/v1/web_es_11/users/me`, {
      method: 'GET',
      headers: {
        authorization: "58122d55-c87e-4425-b657-5b9974dd4029"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      });
     
  }

  setUserInfo(data) {
    return fetch(`https://around.nomoreparties.co/v1/web_es_11/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: "58122d55-c87e-4425-b657-5b9974dd4029",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,  
      }),
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

   setUserAvatar(data) {
    return fetch(`https://around.nomoreparties.co/v1/web_es_11/users/me/avatar`, { 
      method: 'PATCH',
        headers: {
          authorization: "58122d55-c87e-4425-b657-5b9974dd4029",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      }).then(res => {
        if (res.ok) {
         return res.json();
       }
       return Promise.reject(`Error: ${res.status}`);
     });
   }
  
  getInitialCards() {
    return fetch(`https://around.nomoreparties.co/v1/web_es_11/cards`, {
      method: 'GET',
      headers: {
        authorization: "58122d55-c87e-4425-b657-5b9974dd4029"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }
  
  addPlace(data) {
    return fetch(`https://around.nomoreparties.co/v1/web_es_11/cards`, {
      method: 'POST',
      headers: {
        authorization: "58122d55-c87e-4425-b657-5b9974dd4029", 
        'Content-Type': 'application/json'
      },  
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

 /* addLikes(data) {
    return fetch(`https://around.nomoreparties.co/v1/web_es_11/cards/likes/likes/${data.cardId}`, {
      method: 'PUT',
      headers: {
        authorization: "58122d55-c87e-4425-b657-5b9974dd4029",
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }*/

  changeLikeCardStatus(cardId, like) {
        const method = like ? 'PUT' : 'DELETE';
        return fetch(`https://around.nomoreparties.co/v1/web_es_11/cards/likes/${cardId}`, {
            method: method,
            headers: {
                authorization: "58122d55-c87e-4425-b657-5b9974dd4029",
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
      }

   deleteCard(data) {
      return fetch(`https://around.nomoreparties.co/v1/web_es_11/cards/${data}`, {
      method: 'DELETE',
      headers: {
        authorization: "58122d55-c87e-4425-b657-5b9974dd4029", 
        'Content-Type': 'application/json'
      },  
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  } 

  /*removeCard(data) {
    return fetch(`https://around.nomoreparties.co/v1/web_es_11/cards/${data}`, {
    method: 'DELETE',
    headers: {
      authorization: "58122d55-c87e-4425-b657-5b9974dd4029", 
      'Content-Type': 'application/json'
    },  
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
} */

}
  const api = new Api({
    address: 'https://nomoreparties.co',
    groupId: `web_es_11`, 
    token: `58122d55-c87e-4425-b657-5b9974dd4029`, 
  });



export default api;
