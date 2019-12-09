require('isomorphic-fetch');
let fs = require('fs');

module.exports.getTags = async function() {
  const res = await fetch('https://qsr-order-api.herokuapp.com/api/orders/');
  const data = await res.json();

  let jointArray = [];

  data.map(tag => {
    jointArray = [...jointArray, ...tag.tags];
  });

  const uniqueArray = jointArray.reduce((newArray, item) => {
    if (newArray.includes(item)) {
      return newArray;
    } else {
      return [...newArray, item];
    }
  }, []);
  let tagIndex = JSON.stringify(uniqueArray);

  fs.writeFileSync(
    '/Users/davidbudimir/SEI/projects/order4/public/static/tag-index.json',
    tagIndex
  ); //default: 'utf8'
};
