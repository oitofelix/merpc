function login () {
  try {
    loadForm (document.getElementById ('ambiente').value);
  }
  catch (e) {
    alert ('Ambiente não implementado');
  }
}
