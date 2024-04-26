export const StorageUtility = {
  getToken: () => {
    return localStorage.getItem("token");
  },

  removeToken: () => {
    localStorage.removeItem("token");
  },

  setToken: (token: string) => {
    localStorage.setItem("token", token);
  },
};
