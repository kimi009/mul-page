window.onload = function () {
  $('#root') && ($('#root')[0].style.display = "");
  if (window.loadComplete) {
    window.loadComplete()
  }
}