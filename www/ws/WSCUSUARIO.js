ws.WSCUSUARIO = {
  serviceURL: 'ws/WSCUSUARIO.apw',

  VALIDAR: function (CLOGIN, CSENHA) {

    var soapRequest =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope ' +
      '  xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
      '  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<soap:Body>' +
      '  <VALIDAR>' +
      '   <CLOGIN>' + CLOGIN + '</CLOGIN>' +
      '   <CSENHA>' + CSENHA + '</CSENHA>' +
      '  </VALIDAR>' +
      '</soap:Body>' +
      '</soap:Envelope>';

    var response = sendSoapRequest (ws.WSCUSUARIO.serviceURL, 'VALIDAR', soapRequest);
    if (response.match ('<STRING>OK</STRING>')) return true;
    else return false;

  },

}
