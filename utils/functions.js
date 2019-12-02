const getAPI = () => {
  if (window.location.origin === 'http://localhost:3000') {
    return 'http://localhost:8040';
  }
  return 'https://qsr-order-api.herokuapp.com';
};

export default getAPI;
