(function () {
  'use strict';

  const BRIDGE_RESPONSE_EVENT = 'freelanceAppBridgeResponse';

  function isAppBridgeAvailable() {
    return typeof window.ReactNativeWebView !== 'undefined';
  }

  function createRequestId() {
    return `demo-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function sendAppBridgeMessage(message) {
    if (!isAppBridgeAvailable()) {
      return { sent: false, reason: 'The native bridge is not available in this browser.' };
    }
    const request = { version: 1, id: message.id || createRequestId(), ...message };
    window.ReactNativeWebView.postMessage(JSON.stringify(request));
    return { sent: true, requestId: request.id };
  }

  window.DaCodaHubBridge = { isAvailable: isAppBridgeAvailable, send: sendAppBridgeMessage };

  const messages = {
    openPhone: { type: 'openPhone' },
    openEmail: { type: 'openEmail', subject: 'DaCodaHub mobile demo' },
    openMap: { type: 'openMap', address: 'Vancouver, WA' },
    openExternal: { type: 'openExternal', url: 'https://github.com' },
    share: { type: 'share', title: 'DaCodaHub Mobile Demo', message: 'Testing the DaCodaHub white-label mobile framework.', url: 'https://dacodahub.github.io/mobile-demo/' },
    openNative: { type: 'openNative', destination: 'settings' },
    identifyNotificationUser: { type: 'identifyNotificationUser', externalId: 'demo_user_12345' },
    clearNotificationUser: { type: 'clearNotificationUser' }
  };

  const result = document.querySelector('[data-bridge-result]');
  const log = document.querySelector('[data-response-log]');
  document.querySelectorAll('[data-bridge-action]').forEach(function (button) {
    button.addEventListener('click', function () {
      const response = sendAppBridgeMessage(messages[button.dataset.bridgeAction]);
      result.textContent = response.sent
        ? `Message sent. Request ID: ${response.requestId}\nWaiting for a native bridge response; success is not yet confirmed.`
        : `Message not sent. ${response.reason}`;
    });
  });

  window.addEventListener(BRIDGE_RESPONSE_EVENT, function (event) {
    const detail = event && event.detail && typeof event.detail === 'object' ? event.detail : {};
    const safe = {
      requestId: String(detail.requestId || detail.id || 'Not provided'),
      status: String(detail.status || 'Not provided'),
      code: String(detail.code || 'Not provided'),
      message: String(detail.message || 'No message provided')
    };
    const item = document.createElement('li');
    item.textContent = `Request ID: ${safe.requestId} | Status: ${safe.status} | Code: ${safe.code} | Message: ${safe.message}`;
    log.prepend(item);
    while (log.children.length > 10) log.lastElementChild.remove();
    result.textContent = `Native response received for ${safe.requestId}. Status: ${safe.status}.`;
  });
}());
