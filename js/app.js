(function () {
  'use strict';

  const isReactNativeWebView = typeof window.ReactNativeWebView !== 'undefined';
  const statusText = isReactNativeWebView
    ? 'Running inside the mobile app'
    : 'Running in a standard browser';

  document.querySelectorAll('[data-environment-status]').forEach(function (element) {
    element.textContent = statusText;
  });

  const demoForm = document.querySelector('[data-demo-form]');
  if (demoForm) {
    demoForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const message = document.querySelector('[data-form-message]');
      message.textContent = 'Demo submitted successfully. No information was sent or stored.';
      message.hidden = false;
      message.focus();
    });
  }

  document.querySelectorAll('[data-file-input]').forEach(function (input) {
    input.addEventListener('change', function () {
      const output = document.getElementById(input.getAttribute('aria-describedby'));
      output.replaceChildren();
      if (!input.files.length) {
        const item = document.createElement('li');
        item.textContent = 'No files selected.';
        output.appendChild(item);
        return;
      }
      Array.from(input.files).forEach(function (file) {
        const item = document.createElement('li');
        item.textContent = file.name;
        output.appendChild(item);
      });
    });
  });

  const reloadButton = document.querySelector('[data-reload]');
  if (reloadButton) reloadButton.addEventListener('click', function () { window.location.reload(); });
}());
