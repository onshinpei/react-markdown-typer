export const replaceMathBracket = (value: string) => {
  // Extract all block-level formula content, temporarily replace with placeholder, [...]
  const blockMatches: string[] = [];
  let replaced = value.replace(/\\*\[([\s\S]+?)\\*\]/g, (_m, p1) => {
    blockMatches.push(p1);
    return `__BLOCK_MATH_${blockMatches.length - 1}__`;
  });

  // Extract all inline formula content, temporarily replace with placeholder, [...]
  replaced = replaced.replace(/\$\$([\s\S]+?)\$\$/g, (_m, p1) => {
    blockMatches.push(p1);
    return `__BLOCK_MATH_${blockMatches.length - 1}__`;
  });

  // Replace ( ... ) outside the block-level formula with $...$
  replaced = replaced.replace(/\\*\(([^)]+?)\\*\)/g, (_m, p1) => {
    return '$' + p1 + '$';
  });

  // Restore block-level formula content, keep the original parentheses inside
  replaced = replaced.replace(/__BLOCK_MATH_(\d+)__/g, (_m, idx) => {
    return '$$' + blockMatches[Number(idx)] + '$$';
  });

  return replaced;
};
