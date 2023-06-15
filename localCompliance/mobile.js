const mainContent = document.getElementById('main');
const productCard = document.createElement('div');
const twitch = window.Twitch.ext;
var theme;

const handleGenerateProductList = (data) => {
  data.products.forEach((product, index) => {
    const productCard = document.createElement('a');
    productCard.href = `https://${data.domain}/kol/${data.path}?product_id=${product.product_id}`;
    productCard.target = '_blank';
    productCard.style.display = 'block';
    productCard.style.textDecoration = 'none';
    productCard.innerHTML = `
      <div class="productCard" style="display:flex; width:95%; justify-content: space-between; padding: 8px">
        <div class="productItem" style="display: flex">
          <div class="container" id="container_${index}">
            <div class="left" id="left_${index}"></div>
            <div class="right" id="right_${index}"></div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-around; margin-left: 16px; width: 150px"">
            <p class="title" style="margin: 0; color: ${
              theme === 'white' ? '#000' : '#fff'
            }">${product.title}</p>
            <p class="price" style="margin: 0; color: ${
              theme === 'white' ? '#000' : '#fff'
            }">$ ${product.price}</p>
          </div>
        </div>
        <div style="display: flex; align-items: center;">
          <img class="arrow" src="${
            theme === 'white' ? 'right-black.svg' : 'right.svg'
          }"/>
        </div>
      </div> ${
        index !== data.products.length &&
        '<hr style="margin: 0 8px; border-top: 0.5px solid #D9D9D9;border-bottom: 0.5px solid #D9D9D9; border-left:0.5px solid #D9D9D9; border-right:0.5px solid #D9D9D9" />'
      }`;
    mainContent.appendChild(productCard);
  });
};
twitch.configuration.onChanged(function () {
  if (twitch.configuration.broadcaster) {
    try {
      var config = twitch.configuration.broadcaster.content;
      theme = JSON.parse(config).theme;
      $.ajax({
        type: 'GET',
        url: 'https://staging-showmore-api.showmore.cc/api/v1/website/store/page/twitch',
        data: {
          store_id: JSON.parse(config).storeId,
        },
        contentType: 'application/json',
      })
        .then((res) => {
          const body = document.getElementById('body');
          const logoLink = document.getElementById('storeLink');
          const storeName = document.getElementById('storeTitle');
          const nav = document.getElementById('nav');
          nav.style.backgroundColor = theme === 'white' ? '#F5F5F5' : '#2C2A30';
          body.style.backgroundColor =
            theme === 'white' ? '#F5F5F5' : '#2C2A30';
          storeName.style.color = theme === 'white' ? '#000' : '#fff';
          storeName.innerHTML = res.data.title;
          logoLink.href = `https://${res.data.domain}/kol/${res.data.path}`;
          logoLink.target = '_blank';
          const logo = document.getElementById('logo');
          logo.src = res.data.logo;
          handleGenerateProductList(res?.data);
          res?.data?.products?.forEach((product, index) => {
            handleImgLoop(product, index);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
});

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
