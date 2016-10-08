let taglines = [
    "can sanitize &lt;html&gt;",
    "is a CSS <span style=\"float: right;\">expert</span>",
    "is an open source advocate"
];

document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    let tagline = taglines[Math.floor(Math.random() * taglines.length)];
    let taglineElement = document.getElementById("tagline");
    taglineElement.innerHTML = tagline;
});
