const redirects = Object.freeze({
  "/h/": "/projects/hyde-park-memorials/",
});

function redirectToPageWithRef(redirectPageUrl, currentPage) {
  let currentPageEncoded = encodeURIComponent(currentPage);
  let redirectUrl = `${redirectPageUrl}?utm_source=${currentPageEncoded}&utm_medium=referral`;
  console.log(redirectUrl);
  window.location.href = redirectUrl;
}

function redirect() {
  let currentPage = window.location.pathname;
  let redirectPage = redirects[currentPage];
  redirectToPageWithRef(redirectPage, currentPage);
}

redirect();
