const PRODUCT_CATEGORY_OPTIONS = ["Necklaces", "Airdry Clay Crafts", "Fake Cakes"];
function normalizeProductCategories(categoryValue) {
  if (!categoryValue) return [];
  return categoryValue.split(",").map((item) => item.trim()).filter(Boolean);
}
function getAvailableProductCategories(selectedCategories = []) {
  return PRODUCT_CATEGORY_OPTIONS.filter((category) => !selectedCategories.includes(category));
}
export {
  PRODUCT_CATEGORY_OPTIONS as P,
  getAvailableProductCategories as g,
  normalizeProductCategories as n
};
