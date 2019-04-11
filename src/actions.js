export const select = (itemId, text) => ({
  type: 'ON_ITEM_SELECT',
  index: itemId,
  text: text
});