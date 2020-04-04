/**
 * @description pad for milliseconds
 * @param {number} ms milliseconds
 */
export default function padForMS(ms: number): string {
  let result = ms.toString();
  while (result.length < 3) {
    result = '0' + result;
  }
  return result;
}
