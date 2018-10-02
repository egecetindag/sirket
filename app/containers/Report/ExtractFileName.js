export function extractFileName(contentDispositionValue){
  var filename = "";
  if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    var matches = filenameRegex.exec(contentDispositionValue);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }
  }
  return filename;
}


// setTimeout(() => {
//   const response = {
//     file: 'http://releases.ubuntu.com/12.04.5/ubuntu-12.04.5-alternate-amd64.iso',
//   };
//   // server sent the url to the file!
//   // now, let's download:
//   //window.location.href = response.file;
//   // you could also do:
//   window.open(response.file);
// }, 1000);
