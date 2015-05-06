form.Main = function () {
  var that = this;

  that.login = new form.Login ()
    .addEventListener ('login', login,
		       'cfg', cfg,
		       'about', about);

  that.empresa = new widget.Input ()
    .title ('Empresa')
    .type ('text')
    .size ('40')
    .disabled ('true');

  that.representante = new widget.Input ()
    .title ('Representante')
    .type ('text')
    .size ('40')
    .disabled ('true');

  that.ambientes = new form.Ambientes ()
    .addEventListener ('rdv', rdv)
    .addEventListener ('close', ambientes_close);

  that.cfg = new form.Cfg ()
    .addEventListener ('close', cfg_close);

  that.about = new form.About ()
    .addEventListener ('close', about_close);

  that.rdv = new form.Rdv ();

  that.rdvBrowser = new widget.Browser ()
    .useForm (that.rdv)
    .addEventListener ('close', browser_close);

  widget.Widget.call (this)
    .legendText ('Mobile ERP Client')
    .addWidget (that.login);

  function login (e) {
    that.empresa.value (e.EMPRESA);
    that.representante.value (e.REPRESENTANTE);
    that.removeWidget (this);
    that.addWidget (that.empresa, 'br',
		    that.representante, 'br',
		    that.ambientes);
  }

  function cfg () {
    that.replaceWidget (this, that.cfg);
  }

  function cfg_close () {
    that.replaceWidget (this, that.login)
  }

  function ambientes_close () {
    that.removeWidget (that.empresa, that.representante);
    that.replaceWidget (this, that.login);
  }

  function about () {
    that.replaceWidget (this, that.about);
  }

  function about_close () {
    that.replaceWidget (this, that.login);
  }

  function rdv () {
    that.replaceWidget (this, that.rdvBrowser);
  }

  function browser_close () {
    that.replaceWidget (this, that.ambientes);
  }
};

form.Main.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: form.Main},
});
