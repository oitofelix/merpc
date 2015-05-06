ws.WebService = function () {
  var that = this;

  return that;
};

ws.WebService.prototype = Object.create (Object.prototype, {
  constructor: {value: ws.WebService},
  setUrl: {value: function (value) {
    if (value === undefined) return this.url;
    this.url = value;
    return this;
  }},
  rpc: {value: function (method, args) {
    var that = this;

    var soapRequestHeader =
	'<?xml version="1.0" encoding="utf-8"?>' +
	'<soap:Envelope ' +
	'  xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
	'  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
	'<soap:Body>';
    var soapRequestFooter =
	'</soap:Body>' +
	'</soap:Envelope>';

    var soapRequest =
	soapRequestHeader
	+ '<' + method +'>'
	+ ws.WebService.json2xml (args)
	+ '</' + method +'>'
	+ soapRequestFooter;

    try {
      return ws.WebService.xml2json
      (sendSoapRequest () .match ('<' + method + 'RESULT>(.*)</' + method + 'RESULT>')[1]);
    }
    catch (e) {
      return {error: e.message};
    }

    function sendSoapRequest () {
      var request = new XMLHttpRequest();
      request.open ('POST', localStorage.wsURL + that.url, false);
      request.setRequestHeader('Content-Type', 'text/xml');
      request.setRequestHeader('SOAPAction', localStorage.wsURL + method);
      request.send(soapRequest);
      if (request.status === 200 ) return request.responseText;
      else throw new Error
      (request.responseText.match (/<faultstring>(.*?)<\/faultstring>/)[1]);
    }
  }},
});

ws.WebService.json2xml = function json2xml (o) {
  var xml = '';
  for (var p in o) {
    if (o[p] instanceof Object)
      xml += '<' + p + '>' + json2xml (o[p]) + '</' + p + '>';
    else xml += '<' + p + '>' + o[p] + '</' + p + '>';
  }
  return xml;
};

ws.WebService.xml2json = function xml2json (s) {
  var o = {};
  var regexp = '<(\\w*)>(.*?)<\\/\\1>';
  var match = s.match (new RegExp (regexp, 'g'));
  for (var i = 0; i < match.length; i++) {
    var match_i = match[i].match (regexp);
    var p = match_i[1];
    var c = match_i[2];
    if (c.match (regexp)) o[p] = xml2json (c);
    else o[p] = c;
  }
  return o;
};
