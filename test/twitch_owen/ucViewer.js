var token, userId;
var options = [];
const test = document.getElementById('main');
const twitch = window.Twitch.ext;

// onAuthorized callback called each time JWT is fired
twitch.onAuthorized((auth) => {
  // save our credentials
  token = auth.token; //JWT passed to backend for authentication
  userId = auth.userId; //opaque userID
});

// callback called when context of an extension is fired
twitch.onContext((context) => {
  const arrows = document.getElementsByClassName('arrow');
  const titles = document.getElementsByClassName('title');
  const prices = document.getElementsByClassName('price');
  const nav = document.getElementById('nav');
  if (context.theme === 'light') {
    nav.style.backgroundColor = '#F5F5F5';
  }
  if (context.theme === 'dark') {
    nav.style.backgroundColor = '#2C2A30';
  }
  for (let i = 0; i < arrows.length; i++) {
    if (context.theme === 'light') {
      arrows[i].src = './ep_arrow-right-bold.svg';
      titles[i].style.color = '#145678 !important';
    }
    if (context.theme === 'dark') {
      arrows[i].src = './right-1.svg';
      titles[i].style.color = '#765793 !important';
    }
  }
});

twitch.configuration.onChanged(function () {
  if (twitch.configuration.broadcaster) {
    try {
      var config = twitch.configuration.broadcaster.content;
      $.ajax({
        type: 'GET',
        url: 'https://dev-showmore-api.showmore.cc/api/v1/website/store/page/twitch',
        data: {
          store_id: config,
        },
        contentType: 'application/json',
      })
        .then((res) => {
          const logoLink = document.getElementById('storeLink');
          const storeName = document.getElementById('storeTitle');
          storeName.innerHTML = res.data.title;
          logoLink.href = `https://${res.data.domain}/kol/${res.data.path}`;
          logoLink.target = '_blank';
          const logo = document.getElementById('logo');
          logo.src = res.data.logo;
          handleGenerateProductList(res?.data);
          res?.data?.products.forEach((product, index) => {
            handleImgLoop(product, index);
          });
        })
        .catch((e) => {
          console.log('fail');
          console.log(e);
        });
    } catch (e) {
      console.log('invalid config');
    }
  }
});
var open = true;
const box = document.getElementById('left-box');
const nav = document.getElementById('uc-nav');
const collapseIcon = document.getElementById('collapse-icon');
$('.right-box').click(function () {
  open = !open;

  if (open) {
    box.style.width = '100px';
    nav.style.display = 'flex';
    collapseIcon.src = './left.svg';
  } else {
    box.style.width = '0px';
    nav.style.display = 'none';
    collapseIcon.src = './right-1.svg';
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
    // productCard.innerHTML = `
    //     <div class="productCard" style="display:flex; width:95%; justify-content: space-between; padding: 8px">
    //       <div style="display: flex">
    //         <div class="container" id="container_${index}">
    //           <div class="left" id="left_${index}"></div>
    //           <div class="right" id="right_${index}"></div>
    //         </div>
    //         <div style="display: flex; flex-direction: column; justify-content: space-around; margin-left: 16px; width: 150px"">
    //           <p class="title" style="margin: 0; color: #000"; >${product.title}</p>
    //           <p class="price" style="margin: 0; color: #000">$ ${product.price}</p>
    //         </div>
    //       </div>
    //       <div style="display: flex; align-items: center;">
    //         <img class="arrow" src="ep_arrow-right-bold.svg"/>
    //       </div>
    //     </div>`;
    test.appendChild(productCard);
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

// CONST DATA - LOCAL TEST
// const CONSTDATA = {
//   code: 200,
//   msg: 'Ok',
//   data: {
//     domain: 'dev-website.showmore.cc',
//     logo: 'https://cdn.showmore.cc/template/HouseStore/logo.png',
//     path: 'copycc',
//     products: [
//       {
//         photo_urls: [
//           'https://cdn.showmore.cc/compliance/7dLLa48bwqHs4Y7N6Wt6Cf.png',
//         ],
//         price: 200,
//         product_id: 'product-g2stfkjgKTc2SBbeZoEoLV',
//         title:
//           '超級長名稱商品超級長名稱商品超級長名稱商品超級長名稱商品超級長名稱商品超級長商品',
//       },
//       {
//         photo_urls: [
//           'https://cdn.showmore.cc/compliance/7ShHQHeyYAa2hU3zmxVGcH.jpeg',
//         ],
//         price: 120,
//         product_id: 'product-CHCeGBjrbDKE8cPFpd7a9W',
//         title: '吼搭拉adaasdf',
//       },
//       {
//         photo_urls: [
//           'https://cdn.showmore.cc/compliance/Dt3kz2Nhxnu69zoKE82tkF.jpeg',
//         ],
//         price: 80,
//         product_id: 'product-gdhiuyn4ouTcQKvNR2q3iM',
//         title: '布朗尼',
//       },
//       {
//         photo_urls: [
//           'https://cdn.showmore.cc/compliance/hoijTtWACZUuTsvjph8oag.png',
//         ],
//         price: 0,
//         product_id: 'product-LFwWRHCwK8WScCFi5gff25',
//         title: '加價購測試',
//       },
//       {
//         photo_urls: [
//           'https://cdn.showmore.cc/compliance/PF4qKq8q5xBfHM8VtcKQEL.png',
//           'https://cdn.showmore.cc/compliance/2do8h7bRSFZAXBm8BwSTwG.jpg',
//           'https://cdn.showmore.cc/compliance/UruWXvxkoMWGJeaCufFeeY.png',
//           'https://cdn.showmore.cc/compliance/MqF2tJRNewFGHWM58cAa2D.jpg',
//         ],
//         price: 0,
//         product_id: 'product-VCzodY4K5rJUSbY5qpDQWj',
//         title: '組合商品測試',
//       },
//       {
//         photo_urls: [
//           'https://cdn.showmore.cc/compliance/CvTe4jN5AHMTdJPvziXt49.webp',
//         ],
//         price: 1000,
//         product_id: 'product-D2ibYBdWGMDnto9iekX2ra',
//         title: '測試用喝酒貓 詢價',
//       },
//       {
//         photo_urls: [
//           'https://cdn.showmore.cc/compliance/vtPthTAFzefYhrfuGyXLVo.webp',
//         ],
//         price: 5000,
//         product_id: 'product-cW7TX4BGPVnGAC8WLiJ9cj',
//         title: '喝酒貓',
//       },
//       {
//         photo_urls: [
//           'https://cdn.showmore.cc/compliance/5SakhnY438Y2Eoja9eRF9j.png',
//         ],
//         price: 188,
//         product_id: 'product-HQM2FmqxiiidfFHeHNAW7E',
//         title: '吉他貓',
//       },
//       {
//         photo_urls: [
//           'https://cdn.showmore.cc/compliance/Xy5Bzwm8tK5bjJmduMB6FX.webp',
//         ],
//         price: 100,
//         product_id: 'product-WMVUuR5o9YmiFaff3QShAT',
//         title: '喝酒貓3溫層',
//       },
//       {
//         photo_urls: [
//           'https://cdn.showmore.cc/compliance/GychtzwnC8TcWZgmjfdRkJ.jpg',
//         ],
//         price: 0,
//         product_id: 'product-JR8PLkAKZovuaAdFNWGw4M',
//         title: 'jww冷凍',
//       },
//       {
//         photo_urls: [
//           'https://cdn.showmore.cc/compliance/BL7QR5JifBWuD5o3UxbpBJ.jpg',
//         ],
//         price: 0,
//         product_id: 'product-N4XiSUhb6Tx5FFcR2hfnSY',
//         title: 'jww常溫冷藏',
//       },
//       {
//         photo_urls: [
//           'https://cdn.showmore.cc/compliance/q4UdohXxNAob9p4Z3RYvEP.jpg',
//         ],
//         price: 0,
//         product_id: 'product-asuzqwiA6bzhSobDuPSWjN',
//         title: 'jww冷藏',
//       },
//       {
//         photo_urls: [
//           'https://cdn.showmore.cc/compliance/MB3w2oWgXEmfL2XNx3ypWB.jpg',
//         ],
//         price: 0,
//         product_id: 'product-7pDDJAeJoja7tVqarwtDgj',
//         title: 'jww常溫',
//       },
//     ],
//     store_id: 'store-zfpqHDp7YS6TDnqgCVhGmc',
//     title: 'copyOfTest_8/11_willFailed',
//   },
// };
// handleGenerateProductList(CONSTDATA?.data);
// CONSTDATA?.data?.products.forEach((product, index) => {
//   handleImgLoop(product, index);
// });
