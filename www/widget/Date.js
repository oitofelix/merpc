widget.Date = function () {
  var that = this;

  that.day = new widget.Select ()
    .addOption ('', '', null);
  for (var i = 1; i <= 31; i++)
    that.day.addOption (i, ('00' + i).slice (-2), null);

  that.month = new widget.Select ()
    .addOption ('', '', null);
  var monthsList = ['Janeiro', 'Fevereiro', 'Março', 'Abril',
		    'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
		    'Outubro', 'Novembro', 'Dezembro'];
  for (var i = 0; i < monthsList.length; i++) {
    that.month.addOption (i, monthsList[i], null);
  }

  that.year = new widget.Select ()
    .addOption ('', '', null);
  for (var i = -1; i <= 1; i++) {
    var year = new Date ().getFullYear () + i;
    that.year.addOption (year, year, null);
  }

  widget.Widget.call (that)
    .addWidget (that.day)
    .addWidget (that.month)
    .addWidget (that.year)
    .borderWidth ('0px')
    .legendTextAlign ('left');
};

widget.Date.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: widget.Date},
  legendText: {value: function (value) {
    if (value === undefined) return this.legend.textContent;
    this.legend.textContent = value || '';
    return this;
  }},
  value: {value: function (value) {
    if (value === undefined) {
      if (this.day.value () && this.month.value ()
	  && this.year.value ())
	return new Date (this.year.value (), this.month.value (),
			 this.day.value ());
      else return undefined;
    }

    if (value) {
      this.day.value (value.getDate ());
      this.month.value (value.getMonth ());
      this.year.value (value.getFullYear ());
    } else {
      this.day.value ('');
      this.month.value ('');
      this.year.value ('');
    }
    return this
  }},
  disabled: {value: function (value) {
    if (value === undefined)
      return this.day.disabled ()
      && this.month.disabled ()
      && this.year.disabled ();

    this.day.disabled (value);
    this.month.disabled (value);
    this.year.disabled (value);

    return this;
  }},
  relative: {value: function (monthOffset, day) {
    return new Date (this.year.value (), + this.month.value () + monthOffset, day);
  }},
  focus: {value: function () {
    this.day.focus ();
  }},
});
