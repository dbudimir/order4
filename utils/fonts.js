const FontFaceObserver = require('fontfaceobserver');

const fonts = () => {
  // Load Nunito
  const linkNunito = document.createElement('link');
  linkNunito.href =
    'https://fonts.googleapis.com/css?family=Nunito:300,400,600,700,800,900&display=swap';
  linkNunito.rel = 'stylesheet';

  document.head.appendChild(linkNunito);

  const nunito = new FontFaceObserver('Nunito');

  nunito.load().then(() => {
    document.documentElement.classList.add('nunito');
  });

  // Load Roboto
  const linkRoboto = document.createElement('link');
  linkRoboto.href =
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,500i,700,900&display=swap';
  linkRoboto.rel = 'stylesheet';

  document.head.appendChild(linkNunito);

  const roboto = new FontFaceObserver('Roboto');

  roboto.load().then(() => {
    document.documentElement.classList.add('roboto');
  });
};

export default fonts;
