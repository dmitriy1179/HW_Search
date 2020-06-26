const el = document.getElementById("el");
el.style.display = "flex";
el.style.justifyContent = "space-between";
const resaultContainer = document.getElementById("resaultContainer");
const srch = document.getElementById("srch");
const btn = document.getElementById("btn");
const order = document.getElementById("order");
const sort = document.getElementById("sort");

function waitUrl (url, ms) {
    return new Promise(resolve =>
        setTimeout(() => resolve(url), ms))
}

async function searchRep () {
    btn.disabled = true;
    resaultContainer.removeChild(resaultContainer.firstChild);
    const loader = document.createElement("div");
    loader.innerHTML = "LOADING...";
    loader.style.fontSize = "30px";
    loader.style.paddingTop = "7px"
    resaultContainer.appendChild(loader); 
    let request = await waitUrl(`https://api.github.com/search/repositories?q=${srch.value}+in:name&sort=${sort.value}&order=${order.value}`, 300);
    let data = await fetch(request);
    let res = await data.json();
    console.log(res)
    console.log(res.items)
    var table, tr, td;
    table = document.createElement("table");
    table.style.paddingTop = "7px"
    tr = document.createElement("tr");
    tr.style.fontSize = "20px"
    td = document.createElement("td");
    td.innerHTML = "Owner";
    tr.appendChild(td)
    td = document.createElement("td");
    td.innerHTML = "Repository name";
    tr.appendChild(td)
    td = document.createElement("td");
    td.innerHTML = "Url";
    tr.appendChild(td);
    table.appendChild(tr);
    for (let i in res.items) {
        console.log(i, res.items[i])
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = res.items[i].owner.login
        tr.appendChild(td)
        td = document.createElement("td");
        td.innerHTML = res.items[i].name
        tr.appendChild(td)
        td = document.createElement("td");
        td.innerHTML = `<a href=${res.items[i].html_url} target="_blank">${res.items[i].html_url}</a>`
        tr.appendChild(td);
        table.appendChild(tr);
    }
    resaultContainer.appendChild(table);
    btn.disabled = false;
    loader.remove();
}

btn.onclick = searchRep
