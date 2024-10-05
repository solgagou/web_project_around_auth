export const BASE_URL = "https://register.nomoreparties.co";

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
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