tinymce.init({
  selector: 'textarea',
  height: 400,

  plugins: [
    'anchor',
    'autolink',
    'charmap',
    'codesample',
    'emoticons',
    'link',
    'lists',
    'media',
    'searchreplace',
    'table',
    'visualblocks',
    'wordcount',
    'code',
    'image'
  ],

  toolbar: `
  undo redo |
  blocks fontfamily fontsize |
  bold italic underline strikethrough forecolor backcolor |
  alignleft aligncenter alignright justify |
  bullist numlist outdent indent |
  link image media table |
  emoticons charmap |
  codesample code |
  removeformat
`,


  menubar: false,
  branding: false,

  /* =========================
     IMAGE UPLOAD (FREE)
     ========================= */
  file_picker_types: 'image',
  file_picker_callback: function (cb, value, meta) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = function () {
      const file = this.files[0];
      const reader = new FileReader();

      reader.onload = function () {
        const id = 'blobid' + new Date().getTime();
        const blobCache = tinymce.activeEditor.editorUpload.blobCache;
        const base64 = reader.result.split(',')[1];

        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        cb(blobInfo.blobUri(), { title: file.name });
      };

      reader.readAsDataURL(file);
    };

    input.click();
  }
});
