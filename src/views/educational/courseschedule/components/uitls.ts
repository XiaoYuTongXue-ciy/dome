/**
 * 数字转中文
 * @param {Number} num 需要转换的数字
 * @param {String} identifier 标识符
 * @returns {String} 转换后的中文
 */
export const digital2Chinese = (num: number, identifier: string) => {
  const character = ['零', '一', '二', '三', '四', '五', '六', '七', '八'];
  return identifier === 'week' && (num === 0 || num === 7) ? '日' : character[num];
};
