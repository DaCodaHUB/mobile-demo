(function () {
  'use strict';
  var bridge = window.DaCodaHubBridge;
  document.querySelectorAll('[data-map-link]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (!bridge || !bridge.isAvailable()) return;
      var result = bridge.send({ type: 'openMap', address: '123 Sample Street, Portland, OR 97205' });
      if (result.sent) event.preventDefault();
    });
  });
  document.querySelectorAll('[data-share]').forEach(function (button) {
    button.addEventListener('click', function () {
      var url = 'https://dacodahub.github.io/mobile-demo/sample-cafe/';
      if (bridge && bridge.isAvailable()) {
        var result = bridge.send({ type: 'share', title: 'Sample Cafe', message: 'Take a look at Sample Cafe.', url: url });
        if (result.sent) return;
      }
      if (navigator.share) {
        navigator.share({ title: 'Sample Cafe', text: 'Take a look at Sample Cafe.', url: url }).catch(function () {});
      } else {
        window.location.href = 'mailto:?subject=Sample%20Cafe&body=https%3A%2F%2Fdacodahub.github.io%2Fmobile-demo%2Fsample-cafe%2F';
      }
    });
  });
}());
