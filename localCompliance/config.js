var token, userId, storeId, theme;

const twitch = window.Twitch.ext;

// onContext callback called when context of an extension is fired
twitch.onContext((context) => {
  // console.log(context);
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
    try {
      var broadcasterValues = JSON.parse(
        twitch.configuration.broadcaster.content
      );
      if (typeof broadcasterValues === 'object') {
        storeId = broadcasterValues.storeId;
        theme = broadcasterValues.theme;
        updateForm();
      }
    } catch (e) {
      console.log(e);
    }
  }
});

function updateForm() {
  // loads elements of the array into optionA drop down menu
  $('#storeId').val(storeId);
  if (theme === 'black') {
    $('#black-theme').prop('checked', true);
  } else {
    $('#white-theme').prop('checked', true);
  }
  $('input[name="theme"]:checked').val(theme);
}

function updateConfig() {
  try {
    var body = { storeId: storeId, theme: theme };
    twitch.configuration.set('broadcaster', '1', JSON.stringify(body));
  } catch (e) {
    console.log(e);
  }
}

// Function to save the streamer's store_id
$(function () {
  $('#form').submit(function (e) {
    const hint = document.getElementById('hint');
    storeId = $('#storeId').val();
    theme = $('input[name="theme"]:checked').val();
    updateConfig();
    hint.style.display = 'flex';
    setTimeout(() => {
      hint.style.display = 'none';
    }, 2500);
    e.preventDefault();
  });
});
