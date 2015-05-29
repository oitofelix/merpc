libs.DB = function () {
  var that = this;

  var request = indexedDB.open("merpc", 1);
  request.onerror = openDB_error;
  request.onupgradeneeded = openDB_upgrade;
  request.onsuccess = openDB_success;

  function openDB_error (e) {
    alert ('Error opening database: ' + e.errorCode);
  }

  function openDB_upgrade (e) {
    var idb = e.target.result;
    idb.createObjectStore ('rdv', {autoIncrement: true});
  }

  function openDB_success (e) {
    that.idb = e.target.result;
  }
};

libs.DB.prototype = Object.create (Object.prototype, {
  constructor: {value: libs.DB},
  include: {value: function (objectStoreName, object, handler) {
    var transaction = this.idb.transaction([objectStoreName], 'readwrite');
    var request = transaction
	.objectStore (objectStoreName)
	.add (object);
    if (handler) transaction.oncomplete = handler;
    request.onerror = error;
    function error () {
      alert ('Error adding record to database "' + objectStoreName + '"');
    }
  }},
  exclude: {value: function (objectStoreName, key, handler) {
    var transaction = this.idb.transaction([objectStoreName], 'readwrite');
    var request = transaction
	.objectStore(objectStoreName)
	.delete (key);
    if (handler) transaction.oncomplete = handler;
    request.onerror = error;
    function error () {
      alert ('Error deleting database record "' + objectStoreName
	     + '(' + key + ')"');
    }
  }},
  update: {value: function (objectStoreName, object, key, handler) {
    var transaction = this.idb.transaction([objectStoreName], 'readwrite');
    var request = transaction
	.objectStore(objectStoreName)
	.put (object, key);
    if (handler) transaction.oncomplete = handler;
    request.onerror = error;
    function error () {
      alert ('Error updating database record "' + objectStoreName
	     + '(' + key + ')"');
    }
  }},
  cursor: {value: function (objectStoreName, handler) {
    var request = this.idb
	.transaction([objectStoreName])
	.objectStore(objectStoreName)
	.openCursor();
    if (handler) request.onsuccess = handler;
    request.onerror = error;
    function error () {
      alert ('Error getting database cursor "' + objectStoreName + '"');
    }
  }},
  get: {value: function (objectStoreName, key, handler) {
    var request = this.idb
	.transaction([objectStoreName])
	.objectStore(objectStoreName)
	.get (key);
    if (handler) request.onsuccess = handler;
    request.onerror = error;
    function error () {
      alert ('Error getting database record "' + objectStoreName
	     + '(' + key + ')"');
    }
  }},
});
