widget.Table = function () {
  var that = this;

  that.table = document.createElement ('table');
  that.table.style.borderWidth = '1px';
  // that.table.style.height = '200px';
  // that.table.style.overflow = 'scroll';

  widget.Widget.call (that)
    .appendChild (that.table)
    .addEvent ('select');

  that.node.style.overflow = 'scroll';
};

widget.Table.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: widget.Table},
  setHeader: {value: function () {
    this.header = this.table.insertRow (0);
    for (var i = 0; i < arguments.length; i++) {
      var th = document.createElement ('th');
      th.textContent = arguments[i];
      this.header.appendChild (th);
    }
    return this;
  }},
  addRow: {value: function (rowIndex) {
    var that = this;
    var tr = this.table.insertRow (rowIndex ? rowIndex : -1);
    for (var i = 1; i < arguments.length; i++) {
      var td = tr.insertCell ()
      td.textContent = arguments[i];
    }
    tr.onclick = selectRow;
    return this;

    function selectRow () {
      if (that.selectedRow) that.selectedRow.style.backgroundColor = '';
      this.style.backgroundColor = 'LightBlue';
      that.selectedRow = this;
      that.generateEvent ('select', this);
    }
  }},
  clear: {value: function () {
    while (this.table.rows[1]) this.table.deleteRow (1);
  }},

  // height: {value: function (value) {
  //   if (value === undefined) return this.fieldset.style.height;
  //   this.fieldset.style.height = value;
  //   return this;
  // }},
});
