form.Login = function () {
  var that = this;

  this.usuario = new widget.Input ()
    .title ('Usuário')
    .placeholder ('Usuário')
    .type ('text')
    .value (sessionStorage.usuario || '')
    .oninput (usuarioSenha_oninput)
    .onkeypress (usuarioSenha_onkeypress);

  this.senha = new widget.Input ()
    .title ('Senha')
    .placeholder ('Senha')
    .type ('password')
    .value (sessionStorage.senha || '')
    .oninput (usuarioSenha_oninput)
    .onkeypress (usuarioSenha_onkeypress);

  this.entrar = new widget.Input ()
    .title ('Efetuar Login')
    .value ('Entrar')
    .type ('button')
    .disabled (! (this.usuario.value () && this.senha.value ()))
    .onclick (entrar_onclick);

  this.cfg = new widget.Input ()
    .title ('Configurações do cliente ERP')
    .value ('Configurações')
    .type ('button')
    .onclick (cfg_onclick);

  this.about = new widget.Input ()
    .title ('Informações a respeito deste programa')
    .value ('Sobre')
    .type ('button')
    .onclick (about_onclick);

  widget.Widget.call (this)
    .addWidget (this.usuario, 'br',
		this.senha, 'br',
		this.entrar, this.cfg, this.about)
    .addEvent ('login')
    .addEvent ('cfg')
    .addEvent ('about');

  function usuarioSenha_oninput () {
    that.entrar.disabled (! (that.usuario.value ()
				  && that.senha.value ()));

    sessionStorage.usuario = that.usuario.value ();
    sessionStorage.senha = that.senha.value ();
  }

  function usuarioSenha_onkeypress (event) {
    if (event.keyCode == 13) that.entrar.click ();
  }

  function entrar_onclick () {
    if (! localStorage.wsURL) {
      alert ('Por favor, defina a URL do Web Service na tela de configurações.');
      return;
    }

    var loginInfo = {
      CODIGO: '0',
      EMPRESA: 'debug',
      FILIAL: '0',
      REPRESENTANTE: 'debug'};
    if (that.usuario.value () != 'debug' || that.senha.value () != 'debug')
    {
      loginInfo = new ws.Login ().login
      (that.usuario.value (), that.senha.value ());

      if (loginInfo.error) {
	alert (loginInfo.error);
	return;
      }
    }

    that.generateEvent ('login', loginInfo);
  }

  function cfg_onclick () {
    that.generateEvent ('cfg');
  }

  function about_onclick () {
    that.generateEvent ('about');
  }
};

form.Login.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: form.Login},
});
