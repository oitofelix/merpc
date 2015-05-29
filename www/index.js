onload = main;

widget = {
  // Widgets list
  list: ['Widget', 'Input', 'P', 'Select', 'Date',
	 'TextArea', 'Table', 'Browser'],
};

// Load widgets
for (var i = 0; i < widget.list.length; i++)
  loadJS ('widget/' + widget.list[i] + '.js');

form = {
  // Forms list
  list: ['Main', 'Login', 'Cfg', 'Ambientes', 'About', 'Itinerario',
	 'Veiculo', 'Periodo', 'NFCupom', 'Rdv', 'Rep', 'Rac', 'Pv'],
};

// Load forms
for (var i = 0; i < form.list.length; i++)
  loadJS ('form/' + form.list[i] + '.js');

ws = {
  // Web Services list
  list: ['WebService', 'Login'],
};

// Load web services
for (var i = 0; i < ws.list.length; i++)
  loadJS ('ws/' + ws.list[i] + '.js');

libs = {
  // Libraries list
  list: ['DB'],
};

// Load libraries
for (var i = 0; i < libs.list.length; i++)
  loadJS ('libs/' + libs.list[i] + '.js');

function main () {
  document.body.style.textAlign = 'center';
  Main = new form.Main ();
  document.body.appendChild (Main.node);
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

platform = {
  android: navigator.userAgent.match(/Android/i) ? true : false,
}
