/**
 * @description normalize num or str
 * @param {number|string} item
 * @returns {number}
 */
export default function normalize(item: number | string | undefined): number {
  if (!item || isNaN(Number(item))) {
    return 0;
  }
  return Number(item);
}
