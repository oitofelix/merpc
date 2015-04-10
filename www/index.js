window.onload = main;

form = {
  // Forms list
  list: ['login', 'environment', 'rdv', 'rep', 'rac', 'pv', 'cfg'],
};

// Load forms
for (var i = 0; i < form.list.length; i++)
  loadJS ('form/' + form.list[i] + '.js');

widget = {
  // Widgets list
  list: ['date'],
};

// Load widgets
for (var i = 0; i < widget.list.length; i++)
  loadJS ('widget/' + widget.list[i] + '.js');

ws = {
  // Web Services list
  list: ['login'],
};

// Load web services
for (var i = 0; i < ws.list.length; i++)
  loadJS ('ws/' + ws.list[i] + '.js');

function main () {
  form.login.load ();
}

function loadJS (url) {
  var script = document.createElement ('script');
  script.setAttribute ('src', url);
  document.head.appendChild (script);
}

function loadCSS (url) {
  var stylesheet = document.createElement ('link');
  stylesheet.setAttribute ('rel', 'stylesheet');
  stylesheet.setAttribute ('href', url);
  document.head.appendChild (stylesheet);
}

function loadForm (name) {
  var request = new XMLHttpRequest ();
  request.open ('GET', 'form/' + name + '.form', false);
  request.setRequestHeader ('Content-Type', 'text/plain');
  request.send (null);
  if (request.status !== 200) throw new Error (request.statusText);
  return request.responseText;
}

function sendSoapRequest (service, method, soapRequest) {
  var request = new XMLHttpRequest();
  request.open ('POST', localStorage.wsURL + service, false);
  request.setRequestHeader('Content-Type', 'text/xml');
  request.setRequestHeader('SOAPAction', localStorage.wsURL + method);
  request.send(soapRequest);
  if (request.status === 200 ) return request.responseText;
  else throw new Error (request.statusText);
}
