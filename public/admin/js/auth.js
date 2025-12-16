const showAlert = document.querySelector("div[show-alert ]");
const closeAlert = document.querySelector("span[close-alert]");
if(showAlert){
    const time = showAlert.getAttribute("data-time");
    
    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time)

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("close-alert")
    })
}