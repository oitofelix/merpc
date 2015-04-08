ws.login = {
  serviceURL: 'ws/MERPC_LOGIN.apw',

  login: function (usuario, senha) {

    var soapRequest =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope ' +
      '  xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
      '  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<soap:Body>' +
      '  <LOGIN>' +
      '   <USUARIO>' + usuario + '</USUARIO>' +
      '   <SENHA>' + senha + '</SENHA>' +
      '  </LOGIN>' +
      '</soap:Body>' +
      '</soap:Envelope>';

    try {
      var response = sendSoapRequest (ws.login.serviceURL, 'LOGIN', soapRequest);
      var ret = {
	filial: response.match(/<FILIAL>(.*?)<\/FILIAL>/)[1],
	empresa: response.match(/<EMPRESA>(.*?)<\/EMPRESA>/)[1],
	representante: response.match(/<REPRESENTANTE>(.*?)<\/REPRESENTANTE>/)[1],
	codigo: response.match(/<CODIGO>(.*?)<\/CODIGO>/)[1],
      }
      return ret;
    }
    catch (e) {
      return false;
    }

  },

}
