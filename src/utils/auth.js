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
        throw new Error("Error en el inicio de sesión");
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

  export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt); 
          return data;
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
  };