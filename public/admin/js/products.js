// change status
const buttonChangeStatus = document.querySelectorAll("a[button-change-status]");
if(buttonChangeStatus.length > 0){  
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path")

    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const idCurrent = button.getAttribute("data-id");

            let statusChange = statusCurrent == "active" ? "unactive" : "active";

            const action = `${path}/${statusChange}/${idCurrent}?_method=PATCH` 
            formChangeStatus.action = action;

            formChangeStatus.submit();
        })
    })
}
// End change status    



// image preview upload
const uploadImage = document.querySelector("div[upload-image]");
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImgPreview = document.querySelector("img[upload-img-preview]");
    uploadImageInput.addEventListener("change", (e) =>{
        const file = e.target.files[0];
        if(file){
            uploadImgPreview.src = URL.createObjectURL(file);
           const removeImage = document.querySelector("span[delete-image-preview]");
           removeImage.classList.remove("delete-image-preview");
        }
    })
}

const removeImage = document.querySelector("span[delete-image-preview]");
if(removeImage){
    removeImage.addEventListener("click", () =>{
        const uploadImgPreview = document.querySelector("img[upload-img-preview]");
        const uploadImageInput = document.querySelector("input[upload-image-input]");
        uploadImgPreview.src = "";
        uploadImgPreview.title = "";
        uploadImageInput.value = "";
        removeImage.classList.add("delete-image-preview");
    })
}
// end image preview upload