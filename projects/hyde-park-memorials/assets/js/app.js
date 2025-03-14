/*!
 * Copyright (c) 2025 Angelo Licastro
 * See LICENSE
 */
let map = L.map("map").setView([43.1029, -79.02155], 15); // Hyde Park

// re-render popups so they don't go off the map
map.on("popupopen", function (e) {
  let popup = e.popup;
  let popupElement = popup.getElement();

  let img = popupElement.querySelector("img");

  if (img) {
    img.onload = function () {
      popup.update(); // force the popup to resize after image load
    };
  }
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let geojsonDataUrl = "data/geojson/dedications_memorials.geojson";

let memorialIcon = L.divIcon({
  className: "memorial-icon",
  html: `<div class="icon-content">
           <span class="marker-text">○</span>
         </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

let dedicationIcon = L.divIcon({
  className: "dedication-icon",
  html: `<div class="icon-content">
           <span class="marker-text">□</span>
         </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

let benchIcon = L.divIcon({
  className: "bench-icon",
  html: `<div class="icon-content">
           <span class="marker-text">◇</span>
         </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

let gardenIcon = L.divIcon({
  className: "garden-icon",
  html: `<div class="icon-content">
           <span class="marker-text">☆</span>
         </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

function onEachFeature(feature, layer) {
  if (feature.properties["type"] === "Dedication") {
    processDedicationFeature(feature, layer);
  } else {
    processMemorialFeature(feature, layer);
  }
}

function processMemorialFeature(feature, layer) {
  let plaqueInscription = feature.properties[
    "Plaque Inscription Text"
  ].replaceAll("\n", "<br>");
  let inMemoriamOf = `${feature.properties["In Memoriam Of"]}`;
  let popupContent = `
  <span id="in-memoriam-of">${inMemoriamOf}</span><br>
  <span class="plaque-inscription">${plaqueInscription}</span><br>
  `;

  if (feature.properties["Image"]) {
    popupContent += `
      <img class="plaque-image" src='${feature.properties["Image"]}'>
    `;
  }

  layer.bindPopup(popupContent);

  if (inMemoriamOf === "Bryan Kashishian") {
    layer.setIcon(benchIcon);
  } else if (inMemoriamOf === "Terrorism Fighters") {
    layer.setIcon(gardenIcon);
  } else {
    layer.setIcon(memorialIcon);
  }
}

function processDedicationFeature(feature, layer) {
  let plaqueInscription = feature.properties["Plaque Inscription"].replaceAll(
    "\n",
    "<br>"
  );
  let popupContent = `
  <span id="to-honor">${feature.properties["To Honor"]}</span><br>
  <span class="plaque-inscription">${plaqueInscription}</span><br>
  `;

  if (feature.properties["Image"]) {
    popupContent += `
      <img class="plaque-image" src='${feature.properties["Image"]}'>
    `;
  }

  layer.bindPopup(popupContent);
  layer.setIcon(dedicationIcon);
}

function renderFeatureTable(data, tableId, featureType) {
  let filter = `<input id="${featureType}-filter" placeholder="Search by name, year, etc.">`;
  let table = `<table id="${featureType}-table">`;
  table += "<thead><tr>";
  Object.keys(data[0]).forEach((key) => {
    table += `<th>${key}</th>`;
  });
  table += "</tr></thead>";

  table += "<tbody>";
  data.forEach((row) => {
    table += "<tr>";
    Object.values(row).forEach((value) => {
      // preserve newlines presentationally
      if (value.includes("\n")) {
        value = value.replaceAll("\n", "<br>");
      }
      // hyperlink images
      if (value.includes(".jpg")) {
        let imgUrl = `data/images/${featureType}/${value}`;
        table += `<td><a href="${imgUrl}"><img class="plaque-image-table" src="${imgUrl}"></a></td>`;
      } else {
        table += `<td>${value}</td>`;
      }
    });
    table += "</tr>";
  });
  table += "</tbody>";
  table += "</table>";

  document.getElementById(tableId).innerHTML = filter + table;
  hookFilterToTable(`${featureType}-filter`, `${featureType}-table`);
}

function hookFilterToTable(filterId, tableId) {
  let filterElement = document.getElementById(filterId);
  let tableElement = document.getElementById(tableId);
  filterElement.oninput = function () {
    let filterSearch = filterElement.value.toLowerCase();
    Array.from(tableElement.getElementsByTagName("tr")).forEach(
      (row, index) => {
        if (index === 0) return; // skip header row
        let rowText = row.innerText.toLowerCase();
        row.style.display = rowText.includes(filterSearch) ? "" : "none";
      }
    );
  };
}

fetch(geojsonDataUrl)
  .then((response) => response.json())
  .then((data) => {
    L.geoJSON(data, {
      onEachFeature: onEachFeature,
    }).addTo(map);
  })
  .catch((error) => {
    console.error(`Error loading the GeoJSON data: ${error}`);
  });

fetch("data/json/memorials.json")
  .then((response) => response.json())
  .then((data) => renderFeatureTable(data, "memorials", "memorials"));

fetch("data/json/dedications.json")
  .then((response) => response.json())
  .then((data) => renderFeatureTable(data, "dedications", "dedications"));
