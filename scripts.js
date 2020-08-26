/*scripts.js*/
function syntaxHighlight(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

let apitoken = "TUl0cJPncryqbq7f66j";
const url = "https://papertrailapp.com/api/v1/systems.json";
const src = "https://papertrailapp.com/api/v1/events/search.json";
var query1 = "?q=%22%2Fapi%2Fqualis%2Fissn%22"; //consultas a api até o limite de 1000
var query2 = "?q=Idling%20OR%20Unidling"; //todos os sleeping idling and unidling
var query3 = "?limit=10000"; //tudo até o limite de 10000


const options = {
  headers: {
    "X-Papertrail-Token": apitoken,
    "Access-Control-Allow-Origin": "*"
  }
};

function callTheApi(e, url, query) {
  let opt = e.target.classList[1];
  fetch(url+query, options)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      document.getElementById("res").innerHTML = syntaxHighlight(
        JSON.stringify(data, undefined, 4)
      );
      document.getElementsByClassName(opt)[1].innerHTML =
        "Number of events: " + data["events"].length;
    });
}

document.getElementById("btn1").addEventListener("click", function (e) {callTheApi(e, src, query1)});
document.getElementById("btn2").addEventListener("click", function (e) {callTheApi(e, src, query2)});
document.getElementById("btn3").addEventListener("click", function (e) {callTheApi(e, src, query3)});
document.getElementById("btn4").addEventListener("click", function (e) {
  document.getElementById("res").classList.toggle("hide-json");
});

console.clear();