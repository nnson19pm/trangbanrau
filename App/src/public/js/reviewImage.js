var fileInput = document.querySelector('#formFile');
var fileInputMultiple = document.querySelector('#formFileMultiple');
var imgPreview = document.querySelector('#img-preview');
var imgPreviewMultiple = document.querySelector('#img-preview-multiple');
var loadImageMultiple = document.querySelector('#loadImageMultiple');
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      imgPreview.setAttribute('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function readURLMultiple(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    for (var i = 0; i < input.files.length; i++) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = document.createElement('img');
            img.setAttribute('src', e.target.result);
            img.setAttribute('class', 'img-fluid mt-3 mb-3');
            img.setAttribute('style', 'width: 170px; height: 100%;');
            loadImageMultiple.appendChild(img);
        }
        reader.readAsDataURL(input.files[i]);
        }
  }
}

fileInput.addEventListener('change', function() {
  readURL(this);
});
fileInputMultiple.addEventListener('change', function() {
  readURLMultiple(this);
});
