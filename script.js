console.log(ids)
let url = "https://cors-anywhere.herokuapp.com/https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=";
let term = "";
const input = document.querySelector("body");
const display = document.getElementById("display");
input.onkeydown = logKey;

function showListing(e) {
  document.getElementById("sidebar").classList = "";
  document.getElementById("item_name").textContent = e.target.textContent;
  document.getElementById("item_icon").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAAAYklEQVR42u3PMQ0AAAwDoNW/6f110AQckBsXAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYH2/1MAYfXBYmQAAAAASUVORK5CYII=";
  document.getElementById("item_price").textContent = "Loading...";
  document.getElementById("item_trend").classList = "";
  document.getElementById("item_trend").textContent = "";
  fetch(url + e.target.id).then(res => res.json()).then(
    (out) => {
      console.log(out);
      document.getElementById("item_icon").src = out.item.icon_large;
      document.getElementById("item_icon").alt = "Loading...";
      document.getElementById("item_price").textContent = out.item.current.price;
      document.getElementById("item_trend").textContent = "(" + out.item.today.price + ")";
      if (out.item.today.trend === "positive") {
        document.getElementById("item_trend").classList = "positive";
      } else if (out.item.today.trend === "negative") {
        document.getElementById("item_trend").classList = "negative";
        // Remove the space after the negative sign.
        document.getElementById("item_trend").textContent = document.getElementById("item_trend").textContent.slice(0, 2) + document.getElementById("item_trend").textContent.slice(3, document.getElementById("item_trend").textContent.length);
      } else {
        document.getElementById("item_trend").classList = "neutral";
      }
    }
  ).catch(err => { throw err });
}

function search() {
  if (term === "") {
    document.getElementById("results").textContent = "Start typing the name of an item to search for it.";
    return;
  }
  let element = document.getElementById("results");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  results = "";
  j = 0;
  let idsLength = ids.length;
  for (var i = 0; i < idsLength; i++) {
    if (j > 15) {
      continue;
    }
    if (ids[i].name.toLowerCase().includes(term.toLowerCase())) {
      let a = document.createElement("a");
      let br = document.createElement("br");
      a.id = ids[i].id;
      a.textContent = ids[i].name;
      document.getElementById("results").appendChild(a);
      document.getElementById("results").appendChild(br);
      a.addEventListener("click", showListing);
      j += 1;
    }
  }
}

function logKey(e) {
  if (e.keyCode === 8) {
    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
    term = display.textContent;
    search();
    return;
  }
  if (e.keyCode === 27) {
    display.textContent = "";
    term = display.textContent;
    search();
    return;
  }
  if (/^[\s\w-]$/.test(e.key) === false) {
    return;
  }
  display.textContent += `${e.key}`;
  term = display.textContent;
  search();
}

/*
fetch(url + "5698").then(res => res.json()).then(
  (out) => {
    if (out.item.id === 5698) {
      document.getElementById("item_icon").src = out.item.icon_large;
      document.getElementById("item_price").textContent = out.item.current.price;
      document.getElementById("loader").classList = "hidden";
      document.getElementById("main").classList = "";
      document.getElementById("sidebar").classList = "";
    }
  }
).catch(err => { throw err });
*/

document.getElementById("loader").classList = "hidden";
document.getElementById("main").classList = "";
document.getElementById("sidebar").classList = "hidden";
