(function() {
var startLoading = new Date().getTime();
var videoStartTime = 0
var expandStatus = false;
var intervalExpand;
var intervalExpandEvent;
var intervalTextBox;
var expandLeft = getExpandLeft();
var expandPeriod = 3000;
var expandWidth = 10;
var logoLandingPage = 'https://www.showmore.cc/?utm_source=Livestream+Ads';
var errorEndPoint = 'https://log-server.aralego.com/api/v1/log?service_type=dsp&code=0';
var commentEndPoint = 'https://log-server.aralego.com/api/v1/live_stream_alive';
var videoStartTimeEndPoint = 'https://log-server.aralego.com/api/v1/live_stream_video';
var products = [];
var isMobileDevice = checkIsMobileDevice();
var iconLeft = 272;
var iconTop = 219;
const CURRENCY_MAP = {
    'TWD': '$',
    'MYR': 'RM'
};
var logoIndex = 0;
var TEXT_BOX = {
    KEYWORDS: 0,
    FADE: 1
};
var OPACITY_STATUS = {
    SHOW: '1',
    FADE: '0.6'
};
var STORE_NAME_STATUS = {
    LOGO: 0,
    NAME: 1
};
var storeNameStatus = STORE_NAME_STATUS.LOGO;
var textBoxType = TEXT_BOX.{TEXT_BOX_TYPE};
var KEYWORDSTATUS = {
    UI_00 : 0,
    UI_01 : 1,
    UI_02 : 2
}
var keywordCards = [];
var cardsTop = 60;
var TEXTBOX_EXPAND_STATUS = {
    SHOW: 0,
    FADE: 1
};
var TEXTBOX_TRANSITION_STATUS = {
    START: 0,
    END: 1
};
var textboxExpandStatus = TEXTBOX_EXPAND_STATUS.SHOW;
var transitionStatus = TEXTBOX_TRANSITION_STATUS.END;
var BLOCK_LOGO_DOMAIN_LIST = ['www.99kubo.tv', , 'm.99kubo.tv'];
checkIfHideLogo();
var logoDisplay = (isLogoHide) ? 'none' : 'inline-flex';
var logoObj = [
    {
        content: `<div id="bar" style="z-index:2;width: 28px;height: 28px; border-radius: 14px; left: ${iconLeft}px; top: ${iconTop}px; position:fixed; background: white; display:${logoDisplay};font-size:10px; cursor: pointer;"><div id="closeImg" style="width: 28px;height: 28px; background: #EEEEEE;border-radius: 14px;"><img src="https://cdn.aralego.net/rich_media/sa/showmore_close.svg" style="width: 28px;height: 28px;" alt=""></div><div id="expandValue" style="display: none; width: auto;text-align: center;"><div style="width:155px; height: 28px;overflow: hidden;font-size: 12px;line-height: 14px;text-align: center;"><div style="width:155px; height: 14px;">Showmore 網路開店首選</div><div style="width:155px; height: 14px;">點擊了解更多</div></div></div><div id="expandImg" style="width: 28px;height: 28px; background: white;border-radius: 14px; left: ${iconLeft}px; top: ${iconTop}px; position: fixed; z-index: -1;"></div></div>`,
        landingPage: 'https://www.showmore.cc/?utm_source=Livestream+Ads&utm_medium=text1'
    },
    {
        content: `<div id="bar" style="z-index:2;width: 28px;height: 28px; border-radius: 14px; left: ${iconLeft}px; top: ${iconTop}px; position:fixed; background: white; display:${logoDisplay};font-size:10px; cursor: pointer;"><div id="closeImg" style="width: 28px;height: 28px; background: #EEEEEE;border-radius: 14px;"><img src="https://cdn.aralego.net/rich_media/sa/showmore_close.svg" style="width: 28px;height: 28px;" alt=""></div><div id="expandValue" style="display: none; width: auto;text-align: center;"><div style="width:155px; height: 28px;overflow: hidden;font-size: 12px;line-height: 14px;text-align: center;"><div style="width:155px; height: 14px;">Showmore 你的電商夥伴</div><div style="width:155px; height: 14px;">網路開店 一次到位</div></div></div><div id="expandImg" style="width: 28px;height: 28px; background: white;border-radius: 14px; left: ${iconLeft}px; top: ${iconTop}px; position: fixed; z-index: -1;"></div></div>`,
        landingPage: 'https://www.showmore.cc/?utm_source=Livestream+Ads&utm_medium=text2'
    },
    {
        content: `<div id="bar" style="z-index:2;width: 28px;height: 28px; border-radius: 14px; left: ${iconLeft}px; top: ${iconTop}px; position:fixed; background: white; display:${logoDisplay};font-size:10px; cursor: pointer;"><div id="closeImg" style="width: 28px;height: 28px; background: #EEEEEE;border-radius: 14px;"><img src="https://cdn.aralego.net/rich_media/sa/showmore_close.svg" style="width: 28px;height: 28px;" alt=""></div><div id="expandValue" style="display: none; width: auto;text-align: center;"><div style="width:155px; height: 28px;overflow: hidden;font-size: 12px;line-height: 14px;text-align: center;"><div style="width:155px; height: 14px;">Showmore 網路開店首選</div><div style="width:155px; height: 14px;">開店/集客/導流 Start Now!</div></div></div><div id="expandImg" style="width: 28px;height: 28px; background: white;border-radius: 14px; left: ${iconLeft}px; top: ${iconTop}px; position: fixed; z-index: -1;"></div></div>`,
        landingPage: 'https://www.showmore.cc/?utm_source=Livestream+Ads&utm_medium=text3'
    }
];

function fillProduction() {
    var productNeeds = 6;
    var size = a.products.length;
    products = [];
    for (var i = 0; i < productNeeds ; i++) {
        var index = i % size;
        var product = a.products[index];
        var price = getPrice(product);
        var hasVariant = (product.variants && product.variants.length  > 0);
        var obj = {
            "name": (hasVariant) ? (product.name + ' ' + product.variants[0].name) : product.name, 
            "price": price, 
            "images": getImages(product, hasVariant), 
            "landing_page": product.url
        } 
        products.push(obj);
    }
}

function getImages(product, hasVariant) {
    return (hasVariant && product.variants[0].imgurls) ? (product.imgurls.concat(product.variants[0].imgurls)) : product.imgurls;
}

function getPrice(product) {
    if (product.variants && product.variants.length  > 0) {
        var currency = (CURRENCY_MAP[product.variants[0].currency]) ? CURRENCY_MAP[product.variants[0].currency] : '';

        if (product.variants[0].price == product.variants[0].mprice) {
            return [currency + product.variants[0].price];
        } else {
            return [currency + product.variants[0].mprice, currency + product.variants[0].price];
        }
    } else {
        var currency = (CURRENCY_MAP[product.currency]) ? CURRENCY_MAP[product.currency] : '$';

        if (product.price == product.mprice) {
            return [currency + product.price];
        } else  {
            return [currency + product.mprice, currency + product.price];
        }
    }
}

var hasProductData = (a.products && a.products.length > 0);
if (hasProductData) {
    fillProduction();
}
var productTable = (hasProductData) ? `<table style="border-spacing:0px;">
<tr>
    <td id="table00"></td>
    <td id="table01"></td>
    <td id="table02"></td>
</tr>
<tr>
    <td id="table03"></td>
    <td id="table04"></td>
    <td id="table05"></td>
</tr>
</table>` : '';

function getLogo() {
    logoIndex = getRandom(0, 2);
    logoLandingPage = logoObj[logoIndex].landingPage;
    return logoObj[logoIndex].content;
}
var logoContent = getLogo();

function getTextBox() {
    var textContent = (a.name && a.name.length > 0) ? a.name : "快點擊進入觀看";
    if (textBoxType == TEXT_BOX.KEYWORDS) {
        return `<div style="width: 240px;height: 28px; background: white;"><div style="display: flex;height: 28px;"><div id="clickArea"style="width: 172px; border-radius: 15px;background: #E7E9EB; color: gray; cursor: pointer; font-size: 16px; line-height: 28px; text-align: center;"></div><div id="shareElm" style="width: 68px;"></div></div></div><div id="preKeyword" style="width: 94px;height: 130px; float: right;margin: auto; position:relative; top:-158px;overflow:hidden;color: black;"></div>`;
    } else {
        return `<div style="width: 240px;height: 28px; background: transparent;"><div style="display: inline-flex;height: 28px;"><div id="clickArea" style="width: 240px;height: 28px;background: red;color: white; text-align: center !important;border-radius: 5px; transition: opacity 1.5s ease;line-height:28px;font-weight:bold;font-size: 12px;">${textContent}</div></div></div>`;
    }
}
var textBox = getTextBox();
var isMobileSafari = checkIsMobileSafari();
function getBackupImageElm() {
    var backupImageDisplay = (isMobileSafari) ? 'block' : 'none';
    return `<img id="staticImg" src="${a.backupImgUrl}"style="display:${backupImageDisplay};position:fixed;top: 0px;left:0px;width:300px;height:250px;cursor:pointer;z-index:1;transition: left 1.5s linear;"></img>`;
}
var backupImgUrlElm = getBackupImageElm();
var template_300_250_nocomment = `
<link rel="stylesheet" href="https://cdn.aralego.net/rich_media/sa/live_stream_cube.css">
<div>
<div id="backgroundElm" style="display: block;position:fixed;z-index:0;top:0px;left:0px;width: 300px;height: 250px;overflow: hidden; cursor: pointer;filter: blur(5px);"></div>
<div class="cube-wrap" style="width:280px;margin: 52px 0px 0px 12px;">
<div id="transformElm" class="cube depth" style="transition: 1.5s;">
<div id="videoElm" class="front-pane cubeDiv" style="line-height:12px;">
<div style="width: 240px; background: transparent;">
<ins id="video_template" style="margin: auto;"></ins>
${textBox}</div></div>
<div id="showmoreElm" class="right-pane cubeDiv" style="width:240px;height:158px;backface-visibility: hidden; position: absolute;top: 0px;left: 0px;z-index: 5;background: white;line-height:12px;">${productTable}</div>
</div></div>
</div>
${logoContent}${backupImgUrlElm}
<div id="storeElm" style="display: block;top: 3px;left: 10px;position: fixed;cursor:pointer; width: 283px; height: 28px;overflow: hidden;">
    <div id="storeImg" style="width: 283px; height: 28px;opacity:1;transition: all 1s linear;">
        <img style="max-width:283px;width:auto; max-height:28px; height: auto;" src="${a.logo.imgurl}">
    </div>
    <div id="storeName" style="width:283px;height:28px;line-height:28px;font-size:15px;text-align:center !important;position: relative; top: -28px; left: 0px;opacity:0; transition: all 1s linear;">${a.logo.name}</div>
</div>
`;

var playStatus = false;
var videoStarted = false;
var handleErrorStatus = false;
var isLogoHide = false;
var my_video_player;
var currentPosition = -1;
var rotate = 0;
const ERROR_TYPE = {
    PLAYER_ERROR: "player error",
    SOURCE_ERROR: "failed to get video source",
    VIDEO_URL_ERROR: "video url error"
}

function handleErrorTracking(errorCode) {
    var errorInfo = {};
    errorInfo.videoUrl = encodeURIComponent(a.videoUrl);
    errorInfo.errorCode = errorCode;
    errorInfo.videoStarted = videoStarted;
    var errorPixel = document.createElement("img");
    errorPixel.src = errorEndPoint + '&timestamp=' + new Date().toISOString() + '&data=' + JSON.stringify(errorInfo);
    errorPixel.style.cssText = 'width:1px !important; height:1px !important; display:none !important';
    document.body.appendChild(errorPixel);
}

function handleError(errorCode) {
    if (handleErrorStatus)
        return;
    backupImageClose();
    handleErrorStatus = true;
    handleErrorTracking(errorCode);
}

var isBackupImageClose = true;
function backupImageClose() {
    var elm = document.getElementById('staticImg');
    elm.style.left = '0px';
    elm.style.display = 'block';
    isBackupImageClose = true;
}

function backupImageOpen() {
    if (isBackupImageClose && isMobileSafari) {
        var elm = document.getElementById('staticImg');
        elm.style.left = '300px';
        isBackupImageClose = false;
    }
}

window.fbAsyncInit = function () {
    FB.init({
        xfbml: true,
        version: "v3.2"
    });
    FB.Event.subscribe("xfbml.ready", function (msg) {
        if (msg.type === "video") {
            my_video_player = msg.instance;
            playStatus = true;
            var myEventHandler = my_video_player.subscribe("error", function (e) {
                handleError(ERROR_TYPE.PLAYER_ERROR);
            });
            var myEventStartHandler = my_video_player.subscribe("startedPlaying", function (e) {
                if (startLoading && videoStartTime === 0 ) {
                    var startPlaying = new Date().getTime();
                    videoStartTime = (startPlaying - startLoading) / 1000
                    getVideoStartTime()
                }
                videoStarted = true;
                backupImageOpen();
            });

            var myEventStartHandler = my_video_player.subscribe("paused", function (e) {
                videoStarted = false;
            });
        }
    });
    FB.Event.subscribe("xfbml.render", function (msg) {
        if (!playStatus) {
            if (a.videoUrl.indexOf('/videos/') == -1) {
                handleError(ERROR_TYPE.VIDEO_URL_ERROR);
            } else {
                handleError(ERROR_TYPE.SOURCE_ERROR);
            }
        }
    });
};

window.addEventListener('unload', function(event) {
    if (startLoading && videoStartTime === 0 ) {
        var unloadTime = new Date().getTime();
        videoStartTime = (unloadTime - startLoading) / 1000
        getVideoStartTime()
    }
});

function addTemplate() {
    var root = document.getElementById('ucad_template');
    root.insertAdjacentHTML('afterend', template_300_250_nocomment);
}

function setVideoSize() {
    a.videoWidth = 240;
    a.videoHeight = 130;
}

function addVideoElement() {
    var element = document.getElementById('video_template');
    var html = (isMobileDevice) ? `<div id="fb-root"></div>
    <div id="fbElm" class="template-content" style="margin:auto;width:${a.videoWidth}px;height:${a.videoHeight}px;overflow:hidden;background:black;">
    <div id="fb_video" class="fb-video" data-href="${a.videoUrl}" data-width="${a.videoWidth}" data-show-text="false" data-autoplay="true">
        <div class="fb-xfbml-parse-ignore">
          <blockquote cite="${a.videoUrl}">
          </blockquote>
        </div>
      </div></div>` : `<div id="fb-root"></div>
      <div id="fbElm" class="template-content" style="margin:auto;width:${a.videoWidth}px;height:${a.videoHeight}px;background:black;">
      <div id="fb_video" class="fb-video" data-href="${a.videoUrl}" data-width="${a.videoWidth}" data-height="${a.videoHeight}" data-show-text="false" data-autoplay="true">
          <div class="fb-xfbml-parse-ignore">
            <blockquote cite="${a.videoUrl}">
            </blockquote>
          </div>
        </div></div>`;

    element.insertAdjacentHTML("afterend", html);
    let fb_root = document.getElementById('fb-root');
    scriptLink = document.createElement('script');
    scriptLink.src = 'https://connect.facebook.net/zh_TW/sdk.js';
    scriptLink.async = true;
    scriptLink.defer = true;
    fb_root.appendChild(scriptLink);
}

function addAdCss() {
    var head = document.getElementsByTagName("head")[0], cssLink = document.createElement("link");
    cssLink.href = "https://cdn.aralego.net/rich_media/sa/live_stream_template_02.css";
    cssLink.media = "screen";
    cssLink.type = "text/css";
    cssLink.rel = "stylesheet";
    head.appendChild(cssLink);
}



function createShareButton() {
    var encodeUrl = '';
    try {
        encodeUrl = encodeURIComponent(a.videoUrl);
    } catch (e) {
        return;
    }
    var shareButtonHtml = `
  <html><body style="margin:0px"><div id="fb-root"></div>
  <script async defer crossorigin="anonymous" src="https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v12.0&appId=368423110405977&autoLogAppEvents=1" nonce="GmnARZJZ"></script>
  <div class="fb-share-button" data-href="${a.videoUrl}" data-layout="button" data-size="large">
      <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${encodeUrl}&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"></a>
  </div></body></html>`;
    var shareButtonFrame = document.createElement('iframe');
    shareButtonFrame.style.cssText = 'width:68px;height:28px;border:0px;margin:auto;display:block;z-index:100';
    shareButtonFrame.frameBorder = '0';
    shareButtonFrame.marginHeight = '0';
    shareButtonFrame.marginWidth = '0';
    shareButtonFrame.scrolling = 'no';

    var root = document.getElementById("shareElm");
    root.appendChild(shareButtonFrame);
    shareButtonFrame.contentDocument.write(shareButtonHtml);
    shareButtonFrame.contentDocument.close();
}

function addLandingPage() {
    
    addClickEvent('clickArea', a.landingPage);
    addClickEvent('content', a.landingPage);
    
    addClickEvent('videoClickArea', a.landingPage);

    addClickEvent('closeImg', logoLandingPage);
    addClickEvent('expandValue', logoLandingPage);
    addClickEvent('expandImg', logoLandingPage);
    addClickEvent("storeImg", a.logo.landing_page);
    addClickEvent("storeName", a.logo.landing_page);
    addClickEvent("backgroundElm", a.logo.landing_page);
    addClickEvent("staticImg", a.landingPage);
}

function addClickEvent(id, url) {
    var clickArea = document.getElementById(id);
    if (clickArea) {
        clickArea.addEventListener("click", function () { window.open(url, "_blank"); }, false);
    }
}

function setAdImage() {
    if (!(a || a.imgUrl)) {
        return;
    }
    var backgroundElm = document.getElementById('backgroundElm');
    backgroundElm.style.backgroundImage = 'url("' + a.imgUrl + '")';
}

function getExpandLeft() {
    return 300;
}

function close() {
    var elm = document.getElementById('bar');
    var width = elm.offsetWidth;
    var expandImg = document.getElementById("expandImg");
    expandImg.style.zIndex = -1;
    var expandValue = document.getElementById("expandValue");
    expandValue.style.display = 'none';
    if (elm.offsetWidth <= 28) {
        clearInterval(intervalExpand);
        clearInterval(intervalExpandEvent);
        expandStatus = false;
        updateLogoTimeInterval();
        intervalExpandEvent = setInterval(expandEvent, expandPeriod);
        return;
    }
    elm.style.width = width - expandWidth + 'px';
    elm.style.left = expandLeft - width + expandWidth + 'px';
}

function expand() {
    var elm = document.getElementById('bar');
    var width = elm.offsetWidth;
    if (elm.offsetWidth >= 190) {
        clearInterval(intervalExpand);
        clearInterval(intervalExpandEvent);
        expandStatus = false;
        var expandImg = document.getElementById("expandImg");
        expandImg.style.zIndex = -1;
        var expandValue = document.getElementById("expandValue");
        expandValue.style.display = 'block';
        intervalExpandEvent = setInterval(closeEvent, expandPeriod);
        return;
    }
    elm.style.width = width + expandWidth + 'px';
    elm.style.left = expandLeft - width - expandWidth + 'px';
}

function expandEvent() {
    if (!expandStatus) {
        expandStatus = true;
        intervalExpand = setInterval(expand, 10);
    }
}

function closeEvent() {
    if (!expandStatus) {
        expandStatus = true;
        intervalExpand = setInterval(close, 10);
    }
}

function addVideoClickArea() {
    var videoClickArea = document.createElement('div');
    videoClickArea.style.cssText = 'width:278px;height:120px;position:absolute;left:11px;top:31px;cursor: pointer;z-index:2';
    videoClickArea.id = 'videoClickArea';
    document.body.appendChild(videoClickArea);
}

function checkPlayStatus() {
    if ((my_video_player == null) || handleErrorStatus) {
        return;
    }
    if (currentPosition != my_video_player.getCurrentPosition()) {
        currentPosition = my_video_player.getCurrentPosition();
        return;
    }
    if (my_video_player.isMuted && !my_video_player.isMuted()) {
        my_video_player.mute();
    }
    if (my_video_player.play) {
        my_video_player.play();
    }
}

function getRandom(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function updateLogoTimeInterval() {
    var period = getRandom(5, 10);
    expandPeriod =  period * 1000;
}

function getCurrentHost() {
    try {
        return window.top.location.hostname;
    } catch(e) {
        return '';
    }
}

function checkIfHideLogo() {
    var host = getCurrentHost();
    for (var i = 0; i < BLOCK_LOGO_DOMAIN_LIST.length ; i++) {
        var blockHost = BLOCK_LOGO_DOMAIN_LIST[i];
        if (host.indexOf(blockHost) > -1) {
            isLogoHide = true;
            break;
        }
    }
}

function adjustVideoSize() {
    if (!playStatus) {
        return;
    }
    var videoAreaElm = document.getElementById("fb_video");
    var videoElm = videoAreaElm.lastElementChild.lastElementChild;
    var rect = videoElm.getBoundingClientRect();
    if (!videoElm.style.width || !videoElm.style.height) {
        return;
    }
    var width = parseInt(videoElm.style.width.replace('px', ''));
    var height = parseInt(videoElm.style.height.replace('px', '')) * 1.17;
    var videoRatio = a.videoWidth / a.videoHeight;
    var adRatio = width / height;
    var curTop = (videoElm.style.top == undefined || videoElm.style.top.length == 0) ? 0 : parseFloat(videoElm.style.top.replace('px', ''));
    if (!((a.videoHeight*1.17) + 10 > rect.height && (a.videoHeight*1.17) - 10 < rect.height)) {
        if (videoRatio > adRatio) {
            var rate = ((a.videoHeight*1.17) / height);
            videoElm.style.transform = 'scale(' + rate + ')';
            videoElm.style.position = "absolute";
        }
    } else {
        if (!videoElm.style.top) {
            videoElm.style.top = (31 - rect.y) + 'px';
        } else {
            videoElm.style.top = (31 - rect.y + curTop) + 'px';
        }
    }
}

function periodCheckEvent() {
    checkPlayStatus();
    if (isMobileDevice) {
        adjustVideoSize();
    }
}

function checkIsMobileDevice() {
    var toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some(function (element) {
        return navigator.userAgent.match(element);
    });
}

function checkIsMobileSafari() {
    return navigator.userAgent.match(/(iPod|iPhone|iPad)/)
    && !navigator.userAgent.match(/EdgiOS/)
    && !navigator.userAgent.match(/FxiOS/)
    && !navigator.userAgent.match(/CriOS/);
}

setVideoSize();
updateLogoTimeInterval();
addVideoClickArea();
addTemplate();
setVideoSize();
addVideoElement();
addAdCss();
if (textBoxType == TEXT_BOX.KEYWORDS) {
    createShareButton();
}
addLandingPage();
setAdImage();
if (!isLogoHide) {
    intervalExpandEvent = setInterval(expandEvent, expandPeriod);
}
setInterval(periodCheckEvent, 250);

//add six picture
var transformInterval;
function setProductInfos() {
    setProductInfo('table00', 0);
    setProductInfo('table01', 1);
    setProductInfo('table02', 2);
    setProductInfo('table03', 3);
    setProductInfo('table04', 4);
    setProductInfo('table05', 5);
}

function setProductInfo(id, index) {
    var p = document.getElementById(id);
    var elm = createSub(products[index].images, index);
    p.appendChild(elm);
}

function setShowInfoBar(elm, infoElm, img00, img01) {
    elm.addEventListener("mouseover", function() {
        infoElm.style.display = 'block';
        img00.style.display = 'none';
        img01.style.display = 'block';
    }, false);

    elm.addEventListener("mouseout", function() {
        infoElm.style.display = 'none';
        img00.style.display = 'block';
        img01.style.display = 'none';
    }, false);

}

function setLandingPage(elm, url) {
    elm.addEventListener("click", function () { window.open(url, "_blank"); }, false);
}

function createSub(urls, index) {
    var elm = document.createElement('div');
    elm.style.cssText = 'width: 70px;height: 70px;margin: 4px 4px 3px 4px;cursor:pointer;display:flex;';
    
    var imgDiv = document.createElement('div');
    imgDiv.style.cssText = 'width: 70px;height: 70px;line-height:12px;';
    var img00 = document.createElement("img");
    img00.style.cssText = 'width: 70px;height: 70px;';
    img00.src = urls[0];

    var img01 = document.createElement("img");
    img01.style.cssText = 'width: 70px;height: 70px;display:none;';
    img01.src = (urls.length > 1) ? urls[1] : urls[0];
    
    var infoDiv = document.createElement('div');
    var productNameElm = document.createElement('div');
    var priceContentElm = document.createElement('div');
    var priceOriginElm = document.createElement('div');
    var priceDiscountElm = document.createElement('div');
    infoDiv.style.cssText = 'width: 70px;height: 70px;background:white;opacity:0.7;left:-70px;position: relative;display:none;font-weight:bold;line-height:12px;';

    productNameElm.style.cssText = 'width:70px; height:32px; margin: 8px 22px  0px 7px;color: black;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;';
    priceOriginElm.style.cssText = 'width: 55px; height:18px;color: gray;text-decoration:line-through; margin: 0px 0px 0px 7px;font-size:12px;';
    priceDiscountElm.style.cssText = 'width: 70px;height:18px; float:right; color:red;text-align:center;font-size:12px;';

    productNameElm.textContent = products[index].name;
    if (products[index].price.length > 1) {
        priceOriginElm.textContent = products[index].price[0];
        priceDiscountElm.textContent = products[index].price[1];
        priceContentElm.appendChild(priceOriginElm);
    } else {
        priceDiscountElm.textContent = products[index].price[0];
    }

    infoDiv.appendChild(productNameElm);
    infoDiv.appendChild(priceContentElm);
    
    priceContentElm.appendChild(priceDiscountElm);

    elm.appendChild(imgDiv);
    imgDiv.appendChild(img00);
    imgDiv.appendChild(img01);
    elm.appendChild(infoDiv);
    setShowInfoBar(elm, infoDiv, img00, img01);
    setLandingPage(elm, products[index].landing_page);
    return elm;
}

function setInfoPageMod() {
    var transformElm = document.getElementById('transformElm');
    transformElm.addEventListener('transitionstart', function() {
        var elm = document.getElementById('videoElm');
        var fbElm = document.getElementById('fbElm');
        var clickArea = document.getElementById('videoClickArea');
        if (elm && (rotate%360 == 0 || rotate%360 == -180)) {
            fbElm.style.display = 'block';
            elm.style.display = 'block';
            clickArea.style.display = 'block';
        }
    }, false);
    transformElm.addEventListener('transitionend', function() {
        var fbElm = document.getElementById('fbElm');
        var clickArea = document.getElementById('videoClickArea');
        if (fbElm && (rotate%360 == -90 || rotate%360 == -270)) {
            fbElm.style.display = 'none';
            clickArea.style.display = 'none';
        }
        setTransFormClass();
    }, false);
}

function setTransForm() {
    clearInterval(transformInterval);
    transformInterval = null;
    var transformElm = document.getElementById('transformElm');
    rotate = rotate - 90;
    transformElm.style.transform = 'rotateY('+ rotate +'deg)';
}

function setTransFormClass() {
    var videoElm = document.getElementById('videoElm');
    var showmoreElm = document.getElementById('showmoreElm');
    var videoClickAreaElm = document.getElementById('videoClickArea');
    if ((rotate % 360) == 0) {
        showmoreElm.className = 'right-pane cubeDiv';
        videoClickAreaElm.style.display = 'block';
    } else if ((rotate % 360)  == -90) {
        videoElm.className = 'back-pane cubeDiv';
        videoClickAreaElm.style.display = 'none';
    } else if ((rotate % 360) == -180) {
        showmoreElm.className = 'left-pane cubeDiv';
        videoClickAreaElm.style.display = 'block';
    } else if ((rotate % 360)  == -270) {
        videoElm.className = 'front-pane cubeDiv';
        videoClickAreaElm.style.display = 'none';
    }
    if (transformInterval == null)
        transformInterval = setInterval(setTransForm, 5000);
}

function setHoverEvent() {
    var elm = document.getElementById('transformElm');
    
    elm.addEventListener("mouseover", function() {
        if (transformInterval) {
            clearInterval(transformInterval);
            transformInterval = null;
        }
    }, false);

    elm.addEventListener("mouseout", function() {
        if (transformInterval == null) {
            transformInterval = setInterval(setTransForm, 5000);
        }
    }, false);

    var videoClickAreaElm = document.getElementById('videoClickArea');
    videoClickAreaElm.addEventListener("mouseover", function() {
        if (transformInterval) {
            clearInterval(transformInterval);
            transformInterval = null;
        }
    }, false);

    videoClickAreaElm.addEventListener("mouseout", function() {
        if (transformInterval == null) {
            transformInterval = setInterval(setTransForm, 5000);
        }
    }, false);
}
if (hasProductData) {
    setProductInfos();
} else {
    var elm = document.getElementById("showmoreElm");
    var imgElm = document.createElement("img");
    imgElm.src = a.imgUrl;
    imgElm.style.cssText = 'width:240px;height:158px;cursor: pointer;';
    elm.appendChild(imgElm);
    setLandingPage(elm, a.logo.landing_page);
}

setInfoPageMod();
setHoverEvent();
transformInterval = setInterval(setTransForm, 5000);

function setTextBoxTransitionEvent() {
    var transformElm = document.getElementById('clickArea');
    transformElm.addEventListener('transitionstart', function() {
        transitionStatus = TEXTBOX_TRANSITION_STATUS.START;
    }, false);
    transformElm.addEventListener('transitionend', function() {
        if (transitionStatus == TEXTBOX_TRANSITION_STATUS.END) {
            return
        } else {
            transitionStatus = TEXTBOX_TRANSITION_STATUS.END;
        }
        setTextBoxOpacity((textboxExpandStatus == TEXTBOX_EXPAND_STATUS.SHOW) ? OPACITY_STATUS.FADE : OPACITY_STATUS.SHOW);
    }, false);
}

function setTextBoxOpacity(opacity) {
    if (intervalTextBox != null) {
        clearInterval(intervalTextBox);
        intervalTextBox = null;
    }
    textboxExpandStatus = (opacity == OPACITY_STATUS.SHOW) ? TEXTBOX_EXPAND_STATUS.SHOW : TEXTBOX_EXPAND_STATUS.FADE;
    var transformElm = document.getElementById('clickArea');
    transformElm.style.opacity = opacity;
}

if (textBoxType == TEXT_BOX.FADE) {
    setTextBoxTransitionEvent();
    intervalTextBox = setInterval(setTextBoxOpacity, 1000, OPACITY_STATUS.FADE);
}


function getKeyWordStatus() {
    if ( !a.keyword || (a.keyword && a.keyword.price == 0 && a.keyword.keyword == '' && a.keyword.product == '')) {
        return KEYWORDSTATUS.UI_02;
    } else if (a.keyword && a.keyword.price == 0 && a.keyword.keyword == '' && a.keyword.product != '') {
        return KEYWORDSTATUS.UI_01
    } else {
        return KEYWORDSTATUS.UI_00;
    }
}

function getCurrency(currency) {
    return (CURRENCY_MAP[currency]) ? (CURRENCY_MAP[currency]) : '$';
}

function adjustKeywordUI(elm, p, elm2, priceElmExist) {
    elm.style.width = elm.offsetWidth + 'px';
    if (elm.scrollWidth > elm.offsetWidth) {
        elm.style.font = 'bold 12px / 14px "Microsoft JhengHei"';
        elm.style.whiteSpace = 'normal';
    }
    var elm2Width = ((priceElmExist) ? 90 : 115 ) - elm.offsetWidth - 13;
    p.appendChild(elm2);
    elm2.style.width = elm2Width + 'px';
    if (elm2.scrollWidth > elm2.offsetWidth) {
        elm2.style.font = 'bold 12px / 14px "Microsoft JhengHei"';
        elm2.style.whiteSpace = 'normal';
    }
}

function adjustKeywordUIProductName(elm) {
    elm.style.width = elm.offsetWidth + 'px';
    if (elm.scrollWidth > elm.offsetWidth) {
        elm.style.font = 'bold 12px / 14px "Microsoft JhengHei"';
        elm.style.whiteSpace = 'normal';
    }
}

function setKeyWords(){
    var status = getKeyWordStatus();
    if (status == KEYWORDSTATUS.UI_00) {
        var keyword = a.keyword.keyword;
        var itemName = a.keyword.product;
        var price = getCurrency(a.keyword.currency) + a.keyword.price;

        var keyword0Elm = document.createElement('div');
        var keyword1Elm = document.createElement('div');
        var keyword2Elm = document.createElement('div');

        var keywordElms = document.createElement('div');
        var productElms = document.createElement('div');
        var itemNameElm = document.createElement('div');
        var priceElm = document.createElement('div');
        var iconElm = document.createElement('img');
        if (keyword.length > 0) {
            keyword2Elm.textContent = keyword;
            keyword1Elm.textContent = '+1';
        }
        itemNameElm.textContent = itemName;
        if (a.keyword.price > 0) {
            priceElm.textContent = price;
        }

        keywordElms.style.cssText = 'display:flex;width:260px;position:relative;left:10px;';
        keyword0Elm.style.cssText = 'max-width:57px;width:fit-content;height:28px;overflow:hidden;font: normal normal bold 12px/28px Microsoft JhengHei;position: relative;display: flex;';
        keyword1Elm.style.cssText = 'color:red;width:18px;font: normal normal bold 12px/28px Microsoft JhengHei;position: relative;text-align:left;';
        keyword2Elm.style.cssText = 'max-width:57px;height:28px;font: normal normal bold 12px/28px Microsoft JhengHei;position: relative;display: flex;white-space: nowrap;';

        productElms.style.cssText = 'display:flex;width:126px;font-size:12px;';
        itemNameElm.style.cssText = "overflow:hidden;text-align:left !important;font: normal normal bold 12px/28px Microsoft JhengHei;white-space: nowrap;";
        priceElm.style.cssText = 'color:red;width:38px;overflow:hidden;hidden;text-overflow:ellipsis;white-space:nowrap;font: normal normal bold 12px/28px Microsoft JhengHei;';
        iconElm.style.cssText = 'width:28px;height:28px;';
        iconElm.src = 'https://cdn.aralego.net/ucfad/test/ucfunnel/compliance/tmp_richMedia/000.gif';
        var textBox = document.getElementById('clickArea');
        textBox.style.display = 'inline-flex';
        textBox.style.color = 'black';
        

        textBox.appendChild(keywordElms);
        keywordElms.appendChild(keyword0Elm);
        keywordElms.appendChild(keyword1Elm);
        keyword0Elm.appendChild(keyword2Elm);


        textBox.appendChild(productElms);
        if (a.keyword.price > 0) {
            productElms.appendChild(priceElm);
        } else {
            productElms.style.width = '28px';
        }
        productElms.appendChild(iconElm);
        adjustKeywordUI(keyword2Elm, keywordElms, itemNameElm, (a.keyword.price > 0));
    } else if (status == KEYWORDSTATUS.UI_01) {
        // 只有 product name
        var textBox = document.getElementById('clickArea');
        textBox.style.display = 'inline-flex';
        textBox.style.color = 'black';
        
        var text00 = document.createElement('div');
        text00.style.cssText = 'font-size: 16px;width: 190px;position: relative;left: 12px;text-align: left;font: normal normal bold 12px/28px Microsoft JhengHei;white-space: nowrap;';
        text00.textContent = a.keyword.product;
        textBox.appendChild(text00);
        adjustKeywordUIProductName(text00);
    } else {
        //立即 + 1下單 — 置左
        var textBox = document.getElementById('clickArea');
        textBox.style.display = 'inline-flex';
        textBox.style.color = 'black';
        
        var text00 = document.createElement('div');
        var text01 = document.createElement('div');
        var text02 = document.createElement('div');
        text00.style.cssText = 'font-size: 16px; width: 32px;position: relative; left: 12px;font: normal normal bold 12px/28px Microsoft JhengHei;';
        text01.style.cssText = 'font-size: 16px; width: 22px;position: relative; left: 4px; color: red;font: normal normal bold 12px/28px Microsoft JhengHei;';
        text02.style.cssText = 'font-size: 16px; width: 32px;position: relative; left: -3px;font: normal normal bold 12px/28px Microsoft JhengHei;';
        text00.textContent = '立即';
        text01.textContent = '+1';
        text02.textContent = '下單';
        textBox.appendChild(text00);
        textBox.appendChild(text01);
        textBox.appendChild(text02);
    }
}

function addPreKeyword() {
    var top = 0;
    var count = 0;
    if (a.keywordProducts && a.keywordProducts.length > 0) {
        var p = document.getElementById('preKeyword');
        for (var i = 0 ; i < a.keywordProducts.length ; i++ ) {
            var info = a.keywordProducts[i];
            var currency = getCurrency(info.currency);
            if (info.product == '') {
                continue;
            }
            addPreKeywordElement(p, info.product, currency, info.price, top);
            top = top + cardsTop;
            count = count + 1;
        }
        if (count == 3) {
            for (var i = 0 ; i < a.keywordProducts.length ; i++ ) {
                var info = a.keywordProducts[i];
                var currency = getCurrency(info.currency);
                if (info.product == '') {
                    continue;
                }
                addPreKeywordElement(p, info.product, currency, info.price, top);
                top = top + cardsTop;
                count = count + 1;
            }
        }
    }
}

function addPreKeywordElement(p, productName, currency, price, top) {
    var content = (price > 0) ? `<div style="width: 90px;height: 55px;background: white; margin: 5px 4px 0px 0px;display: flex;opacity: 0.8;position: absolute; top: ${top}px;">
    <div style="width: 4px; height: 55px;background: #D32B2BDD 0% 0% no-repeat padding-box;"></div>
    <div style="width: 86px;height: 55px;background: white;">
        <div style="width: 72px; height: 28px;font: normal normal bold 12px/14px Microsoft JhengHei;margin: 6px 11.5px 3px 7.5px;overflow:hidden;text-align:left !important;">
            ${productName}</div>
        <div style="width: 72px; height: 16px;font: normal normal bold 12px/11px Microsoft JhengHei;color: red;text-align: right;float: right;margin: 1px 4px 3px 0px;">
        ${currency}${price}</div>
    </div>
</div>` : 
`<div style="width: 90px;height: 55x;background: white; margin: 5px 4px 0px 0px;display: flex;opacity: 0.8;position: relative;position: absolute;top: ${top}px;">
    <div style="width: 4px; height: 55px;background: #D32B2BDD 0% 0% no-repeat padding-box;"></div>
    <div style="width: 86px;height: 55px;background: white;">
        <div style="width: 72px; height: 28px;font: normal normal bold 12px/14px Microsoft JhengHei;margin: 6px 11.5px 3px 7.5px;overflow:hidden;text-align:left !important;">
            ${productName}</div>
        <div style="width: 72px; height: 16px;font: normal normal bold 12px/11px Microsoft JhengHei;color: red;text-align: right;float: right;margin: 1px 4px 3px 0px;"></div>
    </div>
</div>`;
    p.insertAdjacentHTML("beforeend", content);
}

function preKeywordCards() {
    var nodes = document.getElementById("preKeyword").childNodes;
    for (var i = 0 ; i < nodes.length ; i++) {
        var top = parseInt(nodes[i].style.top.replace('px', ''));
        keywordCards.push({
            element: nodes[i],
            top: top
        });
    }
}

function preKeywordCardsScrolling() {
    var length = keywordCards.length;
    for (var i = 0; i < keywordCards.length ; i++) {
        var obj = keywordCards[i];
        obj.top = (obj.top-2 < -cardsTop ) ? (obj.top - 2 + cardsTop * length) : (obj.top - 2);
        obj.element.style.top = (obj.top) + 'px';
    }
}

if (textBoxType == TEXT_BOX.KEYWORDS) {
    setKeyWords();
    addPreKeyword();
    preKeywordCards();
    if (keywordCards.length > 2) {
        var preKeywordInterval = setInterval(preKeywordCardsScrolling, 100);
    }
}

function handleLogoProblem() {
    try {
        if (parent != null && parent.parent != null && parent.parent.location.host == 'img.scupio.com') {
            parent.frameElement.style.zIndex = '2147483647';
        }
    } catch(e) {}
}
handleLogoProblem();

var visible_alive_time = 0;
var topAdIframe = getCurrentTopIframe();
var adIsInvisible = (checkAdIsVisible() && checkTopDocumentVisible());
var impressionTime = new Date().getTime();
var previousVisibleTime = (adIsInvisible) ? new Date().getTime() : -1;
var isInCrossDomainIframe = (topAdIframe == null);

function ajaxRequest() {
    try {
        var request = new XMLHttpRequest();
    } catch (e1) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e2) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                request = false;
            }
        }
    }
    return request;
}

function getVideoStartTimeRequestParameter() {
    var adSetID = a.adset || '';
    return `?advertiser_id=${a.advertiser}&adset_id=${adSetID}&video_url=${a.videoUrl}&video_start_time=${videoStartTime}`;
}

function getVideoStartTime() {
    var paramsString = getVideoStartTimeRequestParameter();
    request = new ajaxRequest();
    request.open("GET", videoStartTimeEndPoint + paramsString, true);
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
            }
        }
    }
    request.send(paramsString);
}

function getCommentRequestParameter() {
    updateCurrentVisibleAliveTime();
    var total_alive_time = Math.floor((new Date().getTime() - impressionTime)/1000);
    var aliveTime = (topAdIframe == null) ? total_alive_time : visible_alive_time/1000;
    var adSetID = a.adset || '';
    return `?advertiser_id=${a.advertiser}&video_url=${a.videoUrl}&total_alive_time=${total_alive_time}&visible_alive_time=${aliveTime}&adset_id=${adSetID}`;
}      

function getComment() {
    var paramsString = getCommentRequestParameter();
    request = new ajaxRequest();
    request.open("GET", commentEndPoint + paramsString, true);
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
            }
        }
    }
    request.send(paramsString);
}

function getCurrentTopIframe() {
    var currentWindow = window;
    while (currentWindow.frameElement != null && currentWindow.parent != top) {
        currentWindow = currentWindow.parent;
    }
    return (currentWindow.frameElement == null) ? null : currentWindow.frameElement;
}

function isInViewport(element) {
    try {        
        var rect = element.getBoundingClientRect();
        return ((rect.top < top.innerHeight - (rect.height / 2))&&
            (rect.top > -(rect.height / 2))&&
            (rect.left <  top.innerWidth - (rect.width / 2))&&
            (rect.left > -(rect.width/2)));
    } catch(e) {
        return true;
    }

}

function updateCurrentVisibleAliveTime() {
    if (adIsInvisible) {
        var currentTime = new Date().getTime();
        visible_alive_time = visible_alive_time + currentTime - previousVisibleTime;
        previousVisibleTime = currentTime;
    }
}

function checkTopDocumentVisible() {
    try {
        return (top && top.document && top.document.hidden == true) ? false : true;
    } catch (e) {
        return true;
    }
}

function checkAdIsVisible() {
    return (topAdIframe == null) ? true : isInViewport(topAdIframe);
}

function handleALiveTime() {
    var currentVisible = (checkAdIsVisible() && checkTopDocumentVisible());
    if (currentVisible != adIsInvisible && currentVisible == true) {
        previousVisibleTime = new Date().getTime();
        adIsInvisible = true;
    } else if (currentVisible != adIsInvisible && currentVisible == false) {
        visible_alive_time = visible_alive_time + new Date().getTime() - previousVisibleTime;
        previousVisibleTime = -1;
        adIsInvisible = false;
    }
}

if (!isInCrossDomainIframe) {
    top.addEventListener("scroll", function() {
        handleALiveTime();
    }, false);
    top.document.addEventListener('visibilitychange', function (event) {
        handleALiveTime();
    });
}

function checkLogIsActive(i) {
    var activeMap = [1, 2, 3, 4, 5, 6, 8, 10, 12];
    if (i >= 18 && i % 6 == 0) {
        return true
    } else if (activeMap.indexOf(i) > -1) {
        return true;
    }
    return false;
}

var logCounter = 1;
function processLiveLog() {
    if (checkLogIsActive(logCounter)) {
        getComment();
    }
    logCounter++;
}
setInterval(processLiveLog, 10000);

function handleStoreEffect() {
    var storeLogoElm = document.getElementById('storeImg');
    var storeNameElm = document.getElementById('storeName');
    storeLogoElm.style.opacity  = (storeNameStatus == STORE_NAME_STATUS.LOGO) ? '0' : '1';
    storeNameElm.style.opacity = (storeNameStatus == STORE_NAME_STATUS.LOGO) ? '1' : '0'; 
    storeNameStatus = (storeNameStatus == STORE_NAME_STATUS.LOGO) ? STORE_NAME_STATUS.NAME : STORE_NAME_STATUS.LOGO;
}
setInterval(handleStoreEffect, 4000);

})()