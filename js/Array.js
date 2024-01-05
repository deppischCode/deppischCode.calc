export function toString() {
  let result = "";

  for (let element of this) {
    result += String(element) + " ";
  }

  return result;
}
