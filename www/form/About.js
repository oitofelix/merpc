form.About = function () {
  var that = this;

  this.logo = new widget.Input ()
    .type ('image')
    .title ('Mobile ERP Client')
    .maxWidth ('128px')
    .borderWidth ('0px')
    .src ('logo.png')
    .onclick (logo_onclick);

  this.text = new widget.P ()
    .addParagraph ('Um cliente móvel para sistemas ERP')
    .addParagraph ('Copyright (C) 2015 Bruno Félix Rezende Ribeiro <oitofelix@gnu.org>')
    .addParagraph ('This program is free software; you can redistribute it and/or modify '
		   + 'it under the terms of the GNU General Public License as published by '
		   + 'the Free Software Foundation; either version 3, or (at your option) '
		   + 'any later version.');

  this.ok = new widget.Input ()
    .type ('button')
    .value ('OK')
    .onclick (ok_onclick);

  widget.Widget.call (this)
    .addWidget (this.logo, 'br',
		this.text, 'br',
		this.ok)
    .addEvent ('close');

  function logo_onclick () {
    return false;
  }

  function ok_onclick () {
    that.generateEvent ('close');
  }
}

form.About.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: form.About},
});
