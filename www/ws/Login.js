ws.Login = function () {
  var that = this;

  ws.WebService.call (that)
    .setUrl ('MERPC_LOGIN.apw');
};

ws.Login.prototype = Object.create (ws.WebService.prototype, {
  constructor: {value: ws.Login},
  login: {value: function (usuario, senha) {
    return this.rpc ('LOGIN', {
      USUARIO: usuario,
      SENHA: senha});
  }},
});
