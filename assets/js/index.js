/*!
 * Copyright (c) 2025 Angelo Licastro
 * See LICENSE
 */
function hookEmailLinksToChallenge(emailLinkClass, challengeId) {
  let challengeElement = document.getElementById(challengeId);
  document.querySelectorAll(`.${emailLinkClass}`).forEach((e) => {
    e.addEventListener("click", () => {
      if (!challengeElement) return;
      challengeElement.style.display = "inline-block";
    });
  });
}

hookEmailLinksToChallenge("email-address", "email-address");
