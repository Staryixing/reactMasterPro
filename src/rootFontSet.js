(function flexible(window, document) {
  var docEl = document.documentElement;
  let counter = function (value) {
    return (value * docEl.clientWidth) / 20 / 96;
  };

  function setRemUnit() {
    var rem = docEl.clientWidth / 20;
    docEl.style.fontSize = rem + "px";
    window.counter = counter;
  }

  setRemUnit();

  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });
})(window, document);
