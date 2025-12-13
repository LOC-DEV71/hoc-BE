
const description = document.querySelector('#description')
if(description){
    ClassicEditor
        .create(description)
        .catch(error => console.error(error));
}



