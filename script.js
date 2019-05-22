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
  document.getElementById("item_desc").textContent = "Loading...";
  document.getElementById("item_trend").classList = "";
  document.getElementById("item_trend").textContent = "";
  fetch(url + e.target.id).then(res => res.json()).then(
    (out) => {
      // Sometimes API returns insecure HTTP image URLs even though HTTPS links are always valid
      if (out.item.icon_large[4] === ":") {
        out.item.icon_large = out.item.icon_large.slice(0, 4) + "s" + out.item.icon_large.slice(4, out.item.icon_large.length);
      }
      document.getElementById("item_icon").src = out.item.icon_large;
      document.getElementById("item_icon").alt = "Loading...";
      document.getElementById("item_desc").textContent = out.item.description;
      document.getElementById("item_price").textContent = out.item.current.price;
      if (out.item.today.trend === "positive") {
        document.getElementById("item_trend").classList = "positive";
      } else if (out.item.today.trend === "negative") {
        document.getElementById("item_trend").classList = "negative";
        // Remove the space after the negative sign.
        out.item.today.price = out.item.today.price[0] + out.item.today.price.slice(2, out.item.today.price.length);
      } else {
        document.getElementById("item_trend").classList = "neutral";
      }
      document.getElementById("item_trend").textContent = "(" + out.item.today.price + ")";
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
  document.getElementById("results").textContent = "";
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
  if (document.getElementById("results").childNodes.length === 0) {
    document.getElementById("results").textContent = "No results found.";
  }
}

function logKey(e) {
  if (e.keyCode === 8) {
    e.preventDefault();
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
  if (/^[\s\w-()/]$/.test(e.key) === false) {
    return;
  }
  display.textContent += `${e.key}`;
  term = display.textContent;
  search();
}

document.getElementById("loader").classList = "hidden";
document.getElementById("main").classList = "";
document.getElementById("sidebar").classList = "hidden";
