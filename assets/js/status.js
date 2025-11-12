let params = new URLSearchParams(document.location.search);
let notice = params.get("notice");

if (notice === "404") {
    let notFoundNotice = document.getElementById("status");
    notFoundNotice.style.display = "block";
}