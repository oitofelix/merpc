form.rdv = {

  html: loadForm ('rdv'),

  load: function () {
    document.getElementById ('form').innerHTML = this.html;

    // exit
    this.exit.node = document.getElementById ('exit');
    this.exit.node.onclick = this.exit.onclick;
  },

  exit: {
    onclick: function () {
      form.environment.load ();
    },
  },

}
