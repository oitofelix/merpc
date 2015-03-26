window.onload = main;

function main () {
  loadForm ('login');
}

function loadForm (name) {

  // Load form's HTML
  var request = new XMLHttpRequest ();
  request.open ('GET', name + '.form', false);
  request.setRequestHeader ('Content-Type', 'text/plain');
  request.send (null);
  if (request.status !== 200) throw new Error (request.statusText);
  else document.getElementById ('form').innerHTML = request.responseText;

  // Load form's JS
  var script = document.createElement ('script');
  script.setAttribute ('src', 'js/' + name + '.js');
  document.head.appendChild (script);

}
