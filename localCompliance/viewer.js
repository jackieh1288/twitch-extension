var token, userId, theme;

const mainContent = document.getElementById('main');
const twitch = window.Twitch.ext;

// onAuthorized callback called each time JWT is fired
twitch.onAuthorized((auth) => {
  // save our credentials
  token = auth.token; //JWT passed to backend for authentication
  userId = auth.userId; //opaque userID
});

// callback called when context of an extension is fired
twitch.onContext((context) => {
  // console.log(context)
});

twitch.configuration.onChanged(function () {
  if (twitch.configuration.broadcaster) {
    try {
      var broadcasterValues = JSON.parse(
        twitch.configuration.broadcaster.content
      );
      theme = broadcasterValues.theme;
      $.ajax({
        type: 'GET',
        url: 'https://dev-showmore-api.showmore.cc/api/v1/website/store/page/twitch',
        data: {
          store_id: broadcasterValues.storeId,
        },
        contentType: 'application/json',
      })
        .then((res) => {
          const logoLink = document.getElementById('storeLink');
          const storeName = document.getElementById('storeName');
          storeName.innerHTML = res.data.title;
          logoLink.href = `https://${res.data.domain}/kol/${res.data.path}`;
          logoLink.target = '_blank';
          const logo = document.getElementById('logo');
          logo.src = res.data.logo;
          handleGenerateProductList(res?.data);
          res?.data?.products.forEach((product, index) => {
            handleImgLoop(product, index);
          });
          handleChangeStyle(theme);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
});
var open = true;
const box = document.getElementById('left-box');
const nav = document.getElementById('uc-nav');
const collapseIcon = document.getElementById('collapse-icon');
$('#right-box').click(function () {
  open = !open;

  if (open) {
    box.style.width = '100px';
    nav.style.display = 'flex';
    collapseIcon.src = theme === 'black' ? 'left.svg' : 'left-black.svg';
  } else {
    box.style.width = '0px';
    nav.style.display = 'none';
    collapseIcon.src = theme === 'black' ? 'right.svg' : 'right-black.svg';
  }
});

const handleGenerateProductList = (data) => {
  data.products.forEach((product, index) => {
    const productCard = document.createElement('a');
    productCard.href = `https://${data.domain}/kol/${data.path}?product_id=${product.product_id}`;
    productCard.target = '_blank';
    productCard.style.display = 'block';
    productCard.style.marginBottom = '8px';
    productCard.style.textDecoration = 'none';
    productCard.innerHTML = `
    <div class="card-wrapper">
        <div class="img-wrapper" id="container_${index}">
          <div class="left" id="left_${index}"></div>
          <div class="right" id="right_${index}"></div>
        </div>
        <div>
          <p class="title">${product.title}</p>
          <p class="price">$${product.price}</p>
        </div>
        </div>`;
    mainContent.appendChild(productCard);
  });
};

const handleImgLoop = (product, index) => {
  let counter = 0;
  const left = document.getElementById(`left_${index}`);
  const right = document.getElementById(`right_${index}`);
  const container = document.getElementById(`container_${index}`);
  left.style.backgroundImage = `url("${product?.photo_urls[counter]}")`;
  right.style.backgroundImage = `url("${product?.photo_urls[counter + 1]}")`;
  if (product?.photo_urls.length === 1) return;
  setInterval(() => {
    left.classList.add('left-move-left');
    right.classList.add('right-move-left');
    container.classList.add('container-movement');
  }, 4000);

  left.addEventListener('animationend', (e) => {
    e.target.classList.remove('left-move-left');
    right.classList.remove('right-move-left');

    e.target.style.backgroundImage =
      'url("' + product?.photo_urls[++counter] + '")';
    if (counter + 1 >= product?.photo_urls.length) {
      counter = -1;
    }
    right.style.backgroundImage =
      'url("' + product?.photo_urls[counter + 1] + '")';
    container.classList.remove('container-movement');
  });
};

const handleChangeStyle = (theme) => {
  const leftbox = document.getElementById('left-box');
  const rightbox = document.getElementById('right-box');
  const productTitle = document.getElementsByClassName('title');
  const storeName = document.getElementById('storeName');
  const collapseIcon = document.getElementById('collapse-icon');
  if (theme === 'black') {
    leftbox.style.background = 'rgba(0, 0, 0, 0.6)';
    rightbox.classList.remove('right-box-white', 'right-box-black');
    rightbox.classList.add('right-box-black');
    collapseIcon.src = 'left.svg';
    storeName.style.color = 'white';
    Array.from(productTitle).forEach((el) => {
      el.style.color = 'white';
    });
  } else {
    leftbox.style.background = 'rgba(255, 255, 255, 0.7)';
    rightbox.classList.remove('right-box-white', 'right-box-black');
    rightbox.classList.add('right-box-white');
    storeName.style.color = 'black';
    collapseIcon.src = 'left-black.svg';
    Array.from(productTitle).forEach((el) => {
      el.style.color = 'black';
    });
  }
};
