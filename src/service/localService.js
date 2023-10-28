export const TOCO_USER = 'TOCO_USER';
export const localUserService = {
  get: () => {
    const jsonData = localStorage.getItem(TOCO_USER);
    return JSON.parse(jsonData);
  },
  set: (userInfo) => {
    const jsonData = JSON.stringify(userInfo);
    localStorage.setItem(TOCO_USER, jsonData);
  },
  remove: () => {
    localStorage.removeItem(TOCO_USER);
  }
}