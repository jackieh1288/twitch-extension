var token, userId;
var storeId;

// so we don't have to write this out everytime
const twitch = window.Twitch.ext;

// onContext callback called when context of an extension is fired
twitch.onContext((context) => {
  console.log(context);
});

// onAuthorized callback called each time JWT is fired
twitch.onAuthorized((auth) => {
  // save our credentials
  token = auth.token; //JWT passed to backend for authentication
  userId = auth.userId; //opaque userID
});

// when the config changes, save the new changes!
twitch.configuration.onChanged(function () {
  if (twitch.configuration.broadcaster) {
    console.log('config exists');
    try {
      console.log(twitch.configuration.broadcaster);
    } catch (e) {
      console.log(e);
      console.log('invalid config');
    }
  }
});

function updateConfig() {
  try {
    console.log('in set');
    console.log(storeId);
    twitch.configuration.set('broadcaster', '1', storeId);
    console.log('has it been set?');
    console.log(twitch.configuration.broadcaster.content);
    alert('success');
  } catch (e) {
    alert('fail');
    console.log(e);
  }
}

// Function to save the streamer's WYR options
$(function () {
  $('#form').submit(function (e) {
    const hint = document.getElementById('hint');

    console.log(1);
    storeId = $('#storeId').val();
    console.log(storeId);
    updateConfig();
    hint.style.display = 'flex';
    setTimeout(() => {
      hint.style.display = 'none';
    }, 2500);
    e.preventDefault();
  });
});

// $(function () {
//   $('#form').submit(function (e) {
//     $.ajax({
//       type: 'POST',
//       url: location.protocol + '//localhost:3000/question',
//       data: JSON.stringify({
//         first: $('#selectA').val(),
//         second: $('selectB').val(),
//       }),
//       contentType: 'application/json',
//     });
//   });
// });
