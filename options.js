const splitter = "=>";

function saveOptions(e) {
    var ul = document.querySelector("#the-ul");
    const r = ul_to_json(ul);

    // console.log("save", r);

    browser.storage.local.set({
        "rename-table" : r
    });
    e.preventDefault();
}

function restoreOptions() {
  var storageItem = browser.storage.local.get("rename-table");

  storageItem.then((res) => {
      var ul = document.querySelector("#the-ul");
      var stored_json = res["rename-table"];
      // console.log("restore", stored_json );

      // FIXME: Handle invalid input on options.
      // if (stored_json !== undefined && stored_json[""] !== undefined) {
        ul.textContent = "";
        json_to_ul(ul, res["rename-table"]);
      // }
  });
}

function json_to_ul(ul, jsonObj) {
    for (var key in jsonObj) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(key + " " + splitter + "  " + jsonObj[key]));
        ul.append(li);
    }
}

function ul_to_json(ul) {
    var obj = {};
    for (var li of ul.children) {
        let key_value = li.innerText.split(splitter).map(x => x.trim());
        obj[key_value[0]] = key_value[1];
    }
    return obj;
}

var ul = document.querySelector("#the-ul");
ul.contentEditable = true;


document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
