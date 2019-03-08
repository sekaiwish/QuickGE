console.log(ids)
let url = "https://cors-anywhere.herokuapp.com/https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=";
let term = "";
const input = document.querySelector("body");
const display = document.getElementById("display");
input.onkeydown = logKey;

function search() {
  if (term === "") {
    document.getElementById("results").textContent = "Start typing the name of an item to search for it.";
    return;
  }
  results = "";
  j = 0;
  for (var i = 0; i < ids.length; i++) {
    if (j > 15) {
      continue;
    }
    if (ids[i].name.toLowerCase().includes(term.toLowerCase())) {
      results += "<a>" + ids[i].name + "</a><br>";
      j += 1;
    }
  }
  document.getElementById("results").innerHTML = results;
}

function logKey(e) {
  if (e.keyCode === 8) {
    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
    term = display.textContent;
    search();
    return;
  }
  if (/\w|\s/.test(String.fromCharCode(e.keyCode)) === false) {
    return;
  }
  display.textContent += `${e.key}`;
  term = display.textContent;
  search();
}

fetch(url + "5698").then(res => res.json()).then(
  (out) => {
    if (out.item.id === 5698) {
      document.getElementById("loader").classList = "hidden";
      document.getElementById("main").classList = "";
    }
  }
).catch(err => { throw err });
