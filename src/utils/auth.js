export const BASE_URL = "https://tripleten.desarrollointerno.com";

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
        throw new Error("Error en el inicio de sesión");
      });
      }
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);  
        return data;
      } else {
        throw new Error("Token no recibido");
      }
    })
    .catch((err) => {
      console.error("Error en login:", err);
    });
};
  
  export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.message || "Error en el registro");
        });
      }
      return response.json();
    })
    .then((data) => {
      return data; 
  })
  .catch((err) => {
      console.error(err);
      throw err; 
  });
};

  export const getUserProfile = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener el perfil del usuario");
        }
        return response.json();
      })
      .catch((err) => {
        console.error("Error obteniendo el perfil del usuario:", err);
      });
  };

  export const setUserInfo = (data) => {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Error actualizando la información del usuario:", err);
    });
};

  export const setUserAvatar = (data) => {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Error actualizando el avatar:", err);
    });
};

  export const getInitialCards = () => {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  };

  export const addPlace = (data) => {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  };
  
  export const changeLikeCardStatus = (cardId, like) => {
    const token = localStorage.getItem("jwt");
    const method = like ? "PUT" : "DELETE";
    return fetch(`${BASE_URL}/cards/likes/${cardId}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  };

  export const deleteCard = (cardId) => {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  };