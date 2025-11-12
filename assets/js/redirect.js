const redirects = Object.freeze({
  "/404.html": "/?notice=404",
  "/h/": "/projects/hyde-park-memorials/",
  "/monitorama/": "https://www.youtube.com/watch?v=idqe66cqpRc",
  "/r/": "/resume.pdf",
  "/resume/": "/resume.pdf",
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
