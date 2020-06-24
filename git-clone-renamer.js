/*
Just draw a border round the document.body.
*/
// document.body.style.border = "5px solid red";


function replace_git_url(url, new_host) {
    return url.replace(/@github\.com:/g, "@" + new_host + ":");
}

function extract_user() {
    let url = document.location.href;
    return url.match(/.*github\.com\/([^\/]*)\//)[1]
}


function bind (inp, elem_name , k) {
    find_results = inp.getElementsByClassName(elem_name);
    if (find_results.length > 0) {
        k(find_results[0]);
    } else {
        console.log("failed finding: ", elem_name);
    }
}


var storageItem = browser.storage.local.get("rename-table");
storageItem.then((res) => {
    var stored_json = res["rename-table"];
    const user_name = extract_user();
    if (stored_json.hasOwnProperty(user_name)) {
        const new_host = stored_json[user_name];
        // console.log("new_host", new_host);

        bind(document, "ssh-clone-options", ssh_panels => {

            bind(ssh_panels, "input-group", input_group => {

                bind( input_group, "form-control", form_control => {
                    // console.log("success form");
                    let old_value = form_control.outerHTML;
                    form_control.outerHTML = replace_git_url(old_value, new_host);
                });

                bind( input_group, "btn", clipboard_copy => {
                    // console.log("success clipboard");
                    let old_value = clipboard_copy.getAttribute("value");
                    let new_value = replace_git_url(old_value, new_host);
                    clipboard_copy.setAttribute("value", new_value);
                });
            });
        });
    } else {
        // console.log("no entry on options for this url.");
    }
});
