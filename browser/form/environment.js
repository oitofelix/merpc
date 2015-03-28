form.environment = {

  html: loadForm ('environment'),

  load: function () {
    document.getElementById ('form').innerHTML = this.html;

    // rdv
    this.rdv.node = document.getElementById ('rdv');
    this.rdv.node.onclick = this.rdv.onclick;

    // rep
    this.rep.node = document.getElementById ('rep');
    this.rep.node.onclick = this.rep.onclick;

    // rac
    this.rac.node = document.getElementById ('rac');
    this.rac.node.onclick = this.rac.onclick;

    // pv
    this.pv.node = document.getElementById ('pv');
    this.pv.node.onclick = this.pv.onclick;

    // exit
    this.exit.node = document.getElementById ('exit');
    this.exit.node.onclick = this.exit.onclick;
  },

  rdv: {
    onclick: function () {
      form.rdv.load ();
    },
  },

  rep: {
    onclick: function () {
      form.rep.load ();
    },
  },

  rac: {
    onclick: function () {
      form.rac.load ();
    },
  },

  pv: {
    onclick: function () {
      form.pv.load ();
    },
  },

  exit: {
    onclick: function () {
      form.login.load ();
    },
  },

}
