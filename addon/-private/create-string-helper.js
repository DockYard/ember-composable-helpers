export default function(stringFunction) {
  return function([string]) {
    string = string || '';
    return stringFunction(string);
  };
}
