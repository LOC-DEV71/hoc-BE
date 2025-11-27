// Button status
const buttonStatus = document.querySelectorAll("button[button-status]");
if(buttonStatus.length > 0){
    let url = new URL(window.location.href);

    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status", status);
                window.location.href = url.href;
            } else {
                url.searchParams.delete("status");
                window.location.href = url.href;
            }
        })
    });
}

//End Button status


// Form search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.keyword.value;

        if(keyword){
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}

// End Form search



// Pagination 
const buttonPagination = document.querySelectorAll("button[button-pagination]");
if(buttonPagination){
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click", (e) => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page)
            window.location.href = url.href;
        })
    })
}
// End Pagination 



// check box multi
const checkboxMulti = document.querySelector("table[check-box-multi]");
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputIds = checkboxMulti.querySelectorAll("input[name='id']")

    inputCheckAll.addEventListener("click", () =>{
        //change tất cả
        if(inputCheckAll.checked){
            inputIds.forEach(input =>{
                input.checked = true;
            })
        }else{
            inputIds.forEach(input => {
                input.checked = false;
            })
        }
    })


    inputIds.forEach(input =>{
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputIds.length){
                inputCheckAll.checked = true;
                
            } else{
                inputCheckAll.checked = false;
            }
        })
    })

}
// End check box multi


// form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){

    formChangeMulti.addEventListener("submit", (e) =>{
        e.preventDefault();
        const checkboxMulti = document.querySelector("table[check-box-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange = e.target.elements.type.value;

        if(typeChange == "delete-all"){
            const isConfirm = confirm("Bạn có chắc xóa những sản phẩm này không?")
            if(!isConfirm){
                return;
            }
        }
        
        if(inputsChecked.length > 0){

            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            let ids = []

            inputsChecked.forEach(input => {
                const id = input.getAttribute("value");
                if(typeChange == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;

                    ids.push(`${id}-${position}`)
                } else{
                    ids.push(id);
                }
                
            })

            inputIds.value = ids.join(", ");

            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất 1 bản ghi")
        }
    })
}
// End form change multi




// delete item
const buttonDelete = document.querySelectorAll("button[button-deleted]");
if(buttonDelete.length > 0){
    const formDeleteItem =  document.querySelector("#form-delete-status");
    const path = formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm không?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                console.log(id)
                const action = `${path}/${id}?_method=DELETE`
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })
}
// end delete item



// show alert
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

// end show alert
