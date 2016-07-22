export default function titleize(string = '') {
  if (typeof string !== 'string') {
    throw new TypeError(`Expected a string, got a ${typeof string}`);
  }

  return string.toLowerCase().replace(/(?:^|\s|-|\/)\S/g, function(m) {
    return m.toUpperCase();
  });
}
