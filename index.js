let myLinks = []
const inputVl = document.getElementById("input-vl")
const inputBtn = document.getElementById("input-btn")
const fromTab = document.getElementById("from-tab")
const ulVl = document.getElementById("ul-vl")
const deleteBtn = document.getElementById("delete-btn")
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage
    render(myLinks)
}

function render(links) {
    let listItems = ""
    for (let i = 0; i < links.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${links[i]}'>
                    ${links[i]}
                </a>
            </li>
        `
    }
    ulVl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function () {
    console.log("double clicked!")
    localStorage.clear()
    myLinks = []
    render(myLinks)
})

inputBtn.addEventListener("click", function () {
    myLinks.push(inputVl.value)
    inputVl.value = ""
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    render(myLinks)
})


fromTab.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    })

})


