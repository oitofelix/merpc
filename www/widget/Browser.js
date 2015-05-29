widget.Browser = function () {
  var that = this;

  that.form = new widget.Widget ();

  that.include = new widget.Input ()
    .title ('Incluir')
    .type ('image')
    .maxWidth ('48px')
    .src ('img/include.png')
    .onclick (include);

  that.exclude = new widget.Input ()
    .title ('Excluir')
    .type ('image')
    .maxWidth ('48px')
    .src ('img/exclude.png')
    .disableImage ()
    .onclick (exclude);

  that.update = new widget.Input ()
    .title ('Atualizar')
    .type ('image')
    .maxWidth ('48px')
    .src ('img/update.png')
    .disableImage ()
    .onclick (update);

  that.query = new widget.Input ()
    .title ('Consultar')
    .type ('image')
    .maxWidth ('48px')
    .src ('img/query.png')
    .onclick (query);

  that.closeQuery = new widget.Input ()
    .title ('Fechar consulta')
    .type ('image')
    .maxWidth ('48px')
    .src ('img/close-query.png')
    .disableImage ()
    .onclick (closeQuery);

  that.close = new widget.Input ()
    .title ('Fechar')
    .type ('image')
    .maxWidth ('48px')
    .src ('img/close.png')
    .onclick (close);

  widget.Widget.call (that)
    .addWidget (that.form, 'br',
		that.include, that.exclude, that.update, that.query,
		that.closeQuery, 'space', '48px', that.close)
    .addEvent ('close');

  function include () {
    if (that.queryMode) return;

    if (! that.form.validation ()) return false;
    that.db.include (that.form.constructor.OBJECT_STORE,
		     that.form.recordObject ());
    that.form.clear ();
    that.form.focus ();
  }

  function exclude () {
    if (! that.selected) return;

    that.db.exclude (that.form.constructor.OBJECT_STORE, that.selected.key);
    that.queryTable.table.deleteRow (that.selected.row);
    that.form.clear ();
  }

  function update () {
    if (! that.selected) return;

    if (! that.form.validation ()) return false;

    var recordObject = that.form.recordObject ()
    that.db.update (that.form.constructor.OBJECT_STORE,
		    recordObject, that.selected.key, updateHandler);

    function updateHandler () {
      that.queryTable.table.deleteRow (that.selected.row);
      that.addQueryTableRow (that.selected.row, that.selected.key, recordObject, that.form.constructor.QUERY_FIELDS);
      that.queryTable.table.rows[that.selected.row].click ();
    }
  }

  function query () {
    if (! that.queryMode) {
      that.include.disableImage ();
      that.closeQuery.enableImage ();

      that.queryTable = new widget.Table ();
      that.queryTable
      // .legendText ('Resultado da Consulta')
	.setHeader.apply (that.queryTable, ['KEY'].concat (that.form.constructor.QUERY_FIELDS))
	.width ('400px')
	.height ('200px')
	.addEventListener ('select', loadForm)
      that.addWidget ('br', that.queryTable);

      that.queryMode = true;
    }

    that.queryTable.clear ();
    that.db.cursor (that.form.constructor.OBJECT_STORE, cursorHandler);

    function loadForm (row) {
      that.exclude.enableImage ();
      that.update.enableImage ();

      that.selected = {
	key: + row.cells[0].textContent,
	row: row.rowIndex,
      }
      that.db.get (that.form.constructor.OBJECT_STORE, that.selected.key, getHandler);

      function getHandler (e) {
	var value = e.target.result;
	that.form.loadRecord (value);
      }
    }

    function cursorHandler (e) {
      var cursor = e.target.result;
      if (cursor) {
	if (that.form.match (cursor.value))
	  that.addQueryTableRow (-1, cursor.key, cursor.value, that.form.constructor.QUERY_FIELDS);
	cursor.continue();
      }
    }
  }

  function closeQuery () {
    if (! that.queryMode) return;
    that.removeWidget (that.queryTable);
    that.form.clear ();
    that.include.enableImage ();
    that.exclude.disableImage ();
    that.update.disableImage ();
    that.closeQuery.disableImage ();
    that.form.focus ();
    that.selected = null;
    that.queryMode = false;
  }

  function close () {
    that.generateEvent ('close');
  }

};

widget.Browser.prototype = Object.create (widget.Widget.prototype, {
  constructor: {value: widget.Browser},
  setDB: {value: function (value) {
    if (value === undefined) return this.db;
    this.db = value;
    return this
  }},
  useForm: {value: function (value) {
    if (value === undefined) return this.form;
    this.replaceWidget (this.form, value);
    this.form = value;
    return this;
  }},
  addQueryTableRow: {value: function (rowIndex, key, value, fields) {
    var row = [key];
    for (var i = 0; i < fields.length; i++) row.push (value[fields[i]]);
    this.queryTable.addRow.apply (this.queryTable, [rowIndex].concat (row));
  }},
});
