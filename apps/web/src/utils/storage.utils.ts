export const StorageUtility = {
  /**
   * @description - Gets stored token from local storage
   */
  getToken() {
    return localStorage.getItem("card-user:token");
  },

  /**
   * @description - Sets token in local storage
   */
  setToken(token: string) {
    localStorage.setItem("card-user:token", token);
  },
};
