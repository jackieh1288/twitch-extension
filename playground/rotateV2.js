const left = document.querySelector('.left');
const right = document.querySelector('.right');
const container = document.querySelector('.container');
//Populate the following list with the URLs to your images
const imgList = [
  'https://images.pexels.com/photos/2760248/pexels-photo-2760248.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/1554740/pexels-photo-1554740.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/950308/pexels-photo-950308.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
  'https://images.pexels.com/photos/2887879/pexels-photo-2887879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/3341813/pexels-photo-3341813.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2810197/pexels-photo-2810197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
];
let counter = 0;
left.style.backgroundImage = `url("${imgList[counter]}")`;
right.style.backgroundImage = `url("${imgList[counter + 1]}")`;

// left.addEventListener('click', (e) => {
//   e.target.classList.add('left-move-left');
//   right.classList.add('right-move-left');
//   container.classList.add('container-movement');
//   console.log(container.classList);
// });

setInterval(() => {
  console.log('Hello!');
  left.classList.add('left-move-left');
  right.classList.add('right-move-left');
  container.classList.add('container-movement');
  console.log(container.classList);
}, 3000);

left.addEventListener('animationend', (e) => {
  e.target.classList.remove('left-move-left');
  right.classList.remove('right-move-left');

  e.target.style.backgroundImage = 'url("' + imgList[++counter] + '")';
  if (counter + 1 >= imgList.length) {
    counter = -1;
  }
  right.style.backgroundImage = 'url("' + imgList[counter + 1] + '")';
  container.classList.remove('container-movement');
  console.log(container.classList);
});
