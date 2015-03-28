form.cfg = {

  html: loadForm ('cfg'),

  load: function () {
    document.getElementById ('form').innerHTML = this.html;

    // wsURL
    this.wsURL.node = document.getElementById ('wsURL');
    this.wsURL.node.value = localStorage.wsURL || '';

    // save
    this.save.node = document.getElementById ('save');
    this.save.node.onclick = this.save.onclick;

    // exit
    this.exit.node = document.getElementById ('exit');
    this.exit.node.onclick = this.exit.onclick;
  },

  wsURL: {
    
  },

  save: {
    onclick: function () {
      localStorage.wsURL = form.cfg.wsURL.node.value;
      form.login.load ();
    },
  },

  exit: {
    onclick: function () {
      form.login.load ();
    },
  },

}
