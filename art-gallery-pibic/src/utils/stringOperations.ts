export function capitalizeStr(str: string) {
  const newStr = str.charAt(0).toUpperCase() + str.slice(1);

  return newStr;
}
