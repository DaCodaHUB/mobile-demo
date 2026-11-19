# DaCodaHub Mobile Demo

A static companion site for the DaCodaHub WhiteLabelApp. The home page is a technical Test Lab for WebView navigation, forms, uploads, external links, error handling, and the versioned native bridge. **Sample Cafe** is a separate, customer-facing showcase for a fictional local business.

## Pages

| Page | Purpose |
| --- | --- |
| [`index.html`](index.html) | Test Lab landing page |
| [`bridge.html`](bridge.html) | Native bridge requests and responses |
| [`internal-page.html`](internal-page.html) | Internal navigation |
| [`forms.html`](forms.html) | Form and keyboard behavior |
| [`uploads.html`](uploads.html) | File selection |
| [`external-links.html`](external-links.html) | Web, phone, email, SMS, and map links |
| [`error-tests.html`](error-tests.html) | Invalid and blocked destinations |
| [`sample-cafe/`](sample-cafe/) | Sample Cafe home, menu, about, and contact pages |

The site uses plain HTML, CSS, and JavaScript. There is no build step or package dependency. Test Lab styles and scripts live in `css/` and `js/`; Sample Cafe keeps its own presentation in `sample-cafe/css/` and `sample-cafe/js/` while reusing `js/bridge.js`.

## Run locally

Open `index.html` in a browser, or serve the repository root with a static server. For example, if Python is available:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000/` for the Test Lab or `http://localhost:8000/sample-cafe/` for the showcase.

## GitHub Pages paths

The expected hosted URLs are:

- Test Lab: <https://dacodahub.github.io/mobile-demo/>
- Sample Cafe: <https://dacodahub.github.io/mobile-demo/sample-cafe/>

Pages use relative links, so the showcase stays within `/mobile-demo/sample-cafe/` and each HTML page can be opened or refreshed directly. Publish the repository contents from the site root for these URLs to work.

## Native bridge and browser behavior

`js/bridge.js` exposes `window.DaCodaHubBridge` and sends versioned requests through `window.WhiteLabelBridge.postMessage` when the app exposes it. The Test Lab's bridge page demonstrates its supported message types and displays safe response fields as text.

Sample Cafe uses the existing `openMap` and `share` message types. In a regular browser, **Find Us** opens a maps search; sharing uses the browser share API when available and an email link otherwise. Phone and email links use standard `tel:` and `mailto:` URLs. Sending a bridge request means the request was posted to the host; it does not by itself confirm that the native action succeeded.

## Demo content

Sample Cafe, its menu and prices, `123 Sample Street, Portland, OR 97205`, `(503) 555-0147`, and `hello@samplecafe.example` are fictional demonstration content. The site has no backend, authentication, payments, analytics, or credentials.

## Before publishing changes

Review the Test Lab and Sample Cafe at desktop and mobile widths, including the intended WebView width of roughly 360–430 px. Check bridge actions inside WhiteLabelApp and their browser fallbacks. Run `git diff --check` to catch whitespace errors. This repository has no automated test or lint configuration.
