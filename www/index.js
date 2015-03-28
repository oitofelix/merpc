window.onload = main;

form = {
  // Forms list
  list: ['login', 'environment', 'rdv', 'rep', 'rac', 'pv', 'cfg'],
};

// Load forms
for (var i = 0; i < form.list.length; i++)
  loadJS ('form/' + form.list[i] + '.js');

ws = {
  // Web Services list
  list: ['WSCUSUARIO'],
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
