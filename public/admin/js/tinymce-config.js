// withdraw money =))
tinymce.init({
    selector: 'textarea',
    plugins: [
      // Core editing features
      'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
      // Your account includes a free trial of TinyMCE premium features
      // Try the most popular premium features until Dec 17, 2025:
      'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
    ],
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' }, 
      { value: 'Email', title: 'Email' },
    ],
    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
    uploadcare_public_key: '2740b795b5d6efa243d8',
  });

// Free
// tinymce.init({
//   selector: '#description',
//   plugins: 'image',
//   toolbar: 'image',

//   file_picker_types: 'image',
// file_picker_callback: function (cb, value, meta) {
//   var input = document.createElement('input');
//   input.setAttribute('type', 'file');
//   input.setAttribute('accept', 'image/*');

//   input.onchange = function () {
//     var file = this.files[0];

//     var reader = new FileReader();

//     reader.onload = function () {
//       // Register the blob in TinyMCE’s image blob registry.
//       var id = 'blobid' + (new Date()).getTime();
//       var blobCache = tinymce.activeEditor.editorUpload.blobCache;
//       var base64 = reader.result.split(',')[1];
//       var blobInfo = blobCache.create(id, file, base64);
//       blobCache.add(blobInfo);

//       cb(blobInfo.blobUri(), { title: file.name });
//     };

//     reader.readAsDataURL(file);
//   };

//   input.click();
// }


// });
