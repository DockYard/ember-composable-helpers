export default function includes(haystack, ...args) {
  let finder = haystack.includes || haystack.contains;
  return finder.apply(haystack, args);
}
