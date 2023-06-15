var token, userId;
var options = [];

// so we don't have to write this out everytime #efficency
const twitch = window.Twitch.ext;

// callback called when context of an extension is fired
twitch.onContext((context) => {
  //console.log(context);
});

// onAuthorized callback called each time JWT is fired
twitch.onAuthorized((auth) => {
  // save our credentials
  token = auth.token; //JWT passed to backend for authentication
  userId = auth.userId; //opaque userID
});

// when the config changes, update the panel!
twitch.configuration.onChanged(function () {
  // console.log(twitch.configuration.broadcaster);
  if (twitch.configuration.broadcaster) {
    console.log('viewer, 2: ');
    console.log(twitch.configuration.broadcaster);
    try {
      var config = JSON.parse(twitch.configuration.broadcaster.content);
      //console.log(typeof config)
      if (typeof config === 'object') {
        options = config;
        updateOptions();
      } else {
        console.log('invalid config');
      }
    } catch (e) {
      console.log('invalid config');
    }
  }
  console.log('viewer 3: ');
  if (twitch.configuration.global) {
    console.log(twitch.configuration.global);
  }
  console.log('viewer 4: ');
  if (twitch.configuration.developer) {
    console.log(twitch.configuration.developer);
  }
});

// TODO: add logic for hitting Submit on Panel View
// $(function () {
//   $('#form').submit(function (e) {
//     console.log('in function');
//     if (!token) {
//       return console.log('Not authorized');
//     }
//     console.log('Submitting a question');
//     var optionA = $('#selectA').val();
//     var optionB = $('#selectB').val();

//     //ajax call
//     $.ajax({
//       type: 'POST',
//       url: location.protocol + '//localhost:3000/question',
//       data: JSON.stringify({ first: optionA, second: optionB }),
//       contentType: 'application/json',
//       headers: { Authorization: 'Bearer ' + token },
//     });
//   });
// });

// function updateOptions() {
//   // loads elements of the array into optionA drop down menu
//   console.log(321);
//   $('#selectA').empty();
//   $.each(options, function (i, p) {
//     $('#selectA').append($('<option></option>').val(p).html(p));
//   });

//   // loads elements of the array into optionB drop down menu
//   $('#selectB').empty();
//   $.each(options, function (i, p) {
//     $('#selectB').append($('<option></option>').val(p).html(p));
//   });
// }
