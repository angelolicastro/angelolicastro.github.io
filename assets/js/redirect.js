const redirects = Object.freeze({
  "/h/": "/projects/hyde-park-memorials/",
});

function redirectToPage(redirectPageUrl) {
  window.location.href = redirectPageUrl;
}

function redirect() {
  let currentPage = window.location.pathname;
  let redirectPage = redirects[currentPage];
  redirectToPage(redirectPage);
}

redirect();
