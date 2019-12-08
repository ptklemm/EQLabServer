module.exports = (arr) => {
  arr.forEach(function (o) {
    Object.keys(o).forEach(function (key) {
      if (o[key] === null) {
        o[key] = '';
      }
    });
  });
  return arr;
}