form.login = {

  html: loadForm ('login'),

  load: function () {
    document.getElementById ('form').innerHTML = this.html;

    // user
    this.user.node = document.getElementById ('user');
    this.user.node.oninput = this.user.oninput;
    this.user.node.onkeypress = this.user.onkeypress;
    this.user.node.value = sessionStorage.user || '';
    
    // password
    this.password.node = document.getElementById ('password');
    this.password.node.oninput = this.password.oninput;
    this.password.node.onkeypress = this.password.onkeypress;
    this.password.node.value = sessionStorage.password || '';

    // enter
    this.enter.node = document.getElementById ('enter');
    this.enter.node.onclick = this.enter.onclick;
    this.enter.node.disabled =
      ! (this.user.node.value && this.password.node.value);

    // cfg
    this.cfg.node = document.getElementById ('cfg');
    this.cfg.node.onclick = this.cfg.onclick;

  },

  // user
  user: {
    oninput: function () {
      form.login.enter.node.disabled =
	! (form.login.user.node.value && form.login.password.node.value);

      sessionStorage.user = form.login.user.node.value;
    },

    onkeypress: function (event) {
      if (event.keyCode == 13) form.login.enter.node.click ();
    }
  },

  // password
  password: {
    oninput: function () {
      form.login.enter.node.disabled = 
	! (form.login.user.node.value && form.login.password.node.value);

      sessionStorage.password = form.login.password.node.value;

      if (event.keyCode == 13) form.login.enter.node.click ();
    },

    onkeypress: function (event) {
      if (event.keyCode == 13) form.login.enter.node.click ();
    }
  },

  // enter
  enter: {
    onclick: function () {

      if (! localStorage.wsURL) {
        alert ('Por favor, defina a URL do Web Service na tela de configurações.');
        return;
      }


      if (form.login.user.node.value != 'debug'
	  || form.login.password.node.value != 'debug')
      {
	try {
	  var valid = ws.WSCUSUARIO.VALIDAR (form.login.user.node.value, form.login.password.node.value)
	}
	catch (e) {
	  alert (e);
	  return;
	}

	if (! valid) {
          alert ('Usuário ou senha inválidos');
          return;
	}
      }

      form.environment.load ();

    }
  },

  cfg: {
    onclick: function () {
      form.cfg.load ();
    }
  },

}
