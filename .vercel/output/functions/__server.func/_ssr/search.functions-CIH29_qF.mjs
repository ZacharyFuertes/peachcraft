import { c as createServerRpc } from "./createServerRpc-B7vsMDas.mjs";
import { c as createServerFn } from "./server-BWmwJzJ_.mjs";
import { g as getSupabaseServer } from "./supabase-BbYbDVIj.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/supabase__ssr.mjs";
import "../_libs/cookie.mjs";
function getVirtualBrand(product) {
  const nameLower = product.name.toLowerCase();
  const descLower = (product.description ?? "").toLowerCase();
  const categoryLower = (product.category ?? "").toLowerCase();
  if (categoryLower.includes("accessories")) {
    return "Kawaii Deco";
  }
  if (categoryLower.includes("clay") || nameLower.includes("clay") || descLower.includes("clay")) {
    return "Clay Dream";
  }
  if (nameLower.includes("strawberry") || descLower.includes("strawberry")) {
    return "Strawberry Fields";
  }
  return "Peach Craft";
}
function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          // substitution
          matrix[i][j - 1] + 1,
          // insertion
          matrix[i - 1][j] + 1
          // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}
function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
}
async function rankProducts(queryStr) {
  const supabase = getSupabaseServer();
  const {
    data: products,
    error: productsError
  } = await supabase.from("products").select("id,name,price,description,images,tag,swatch,category,stock_qty,is_active,created_at").eq("is_active", true);
  if (productsError) {
    throw productsError;
  }
  if (!products || products.length === 0) {
    return [];
  }
  const {
    data: orderItems,
    error: orderItemsError
  } = await supabase.from("order_items").select("product_id,qty");
  const popularityMap = {};
  if (!orderItemsError && orderItems) {
    for (const item of orderItems) {
      if (item.product_id) {
        popularityMap[item.product_id] = (popularityMap[item.product_id] || 0) + (item.qty || 1);
      }
    }
  }
  const queryTokens = tokenize(queryStr);
  if (queryTokens.length === 0) {
    return products.map((p) => {
      const salesCount = popularityMap[p.id] || 0;
      const brand = getVirtualBrand(p);
      return {
        ...p,
        brand,
        searchScore: 1,
        salesCount
      };
    }).sort((a, b) => b.salesCount - a.salesCount || new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  }
  const rankedResults = [];
  for (const p of products) {
    const brand = getVirtualBrand(p);
    const nameTokens = tokenize(p.name);
    const descTokens = tokenize(p.description ?? "");
    const catTokens = tokenize(p.category ?? "");
    const brandTokens = tokenize(brand);
    const tagTokens = tokenize(p.tag ?? "");
    let baseScore = 0;
    let matchedAny = false;
    for (const qToken of queryTokens) {
      let tokenScore = 0;
      for (const nToken of nameTokens) {
        if (nToken === qToken) {
          tokenScore += 10;
          matchedAny = true;
        } else if (nToken.startsWith(qToken)) {
          tokenScore += 5;
          matchedAny = true;
        } else if (qToken.length >= 3 && levenshtein(qToken, nToken) <= (qToken.length >= 5 ? 2 : 1)) {
          tokenScore += 3;
          matchedAny = true;
        }
      }
      for (const cToken of catTokens) {
        if (cToken === qToken) {
          tokenScore += 6;
          matchedAny = true;
        } else if (cToken.startsWith(qToken)) {
          tokenScore += 3;
          matchedAny = true;
        }
      }
      for (const bToken of brandTokens) {
        if (bToken === qToken) {
          tokenScore += 6;
          matchedAny = true;
        } else if (bToken.startsWith(qToken)) {
          tokenScore += 3;
          matchedAny = true;
        }
      }
      for (const tToken of tagTokens) {
        if (tToken === qToken) {
          tokenScore += 4;
          matchedAny = true;
        }
      }
      for (const dToken of descTokens) {
        if (dToken === qToken) {
          tokenScore += 2;
          matchedAny = true;
        } else if (dToken.startsWith(qToken)) {
          tokenScore += 1;
          matchedAny = true;
        }
      }
      baseScore += tokenScore;
    }
    if (matchedAny && baseScore > 0) {
      const salesCount = popularityMap[p.id] || 0;
      const popularityBoost = Math.log1p(salesCount) * 0.25;
      const finalScore = baseScore * (1 + popularityBoost);
      rankedResults.push({
        ...p,
        brand,
        searchScore: parseFloat(finalScore.toFixed(2)),
        salesCount
      });
    }
  }
  return rankedResults.sort((a, b) => {
    if (b.searchScore !== a.searchScore) {
      return b.searchScore - a.searchScore;
    }
    if (b.salesCount !== a.salesCount) {
      return b.salesCount - a.salesCount;
    }
    return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
  });
}
const searchProducts_createServerFn_handler = createServerRpc({
  id: "3da541399998645662eb6354918334f237760cff00d444ed65abbc1f10fa8a46",
  name: "searchProducts",
  filename: "src/lib/api/search.functions.ts"
}, (opts) => searchProducts.__executeServer(opts));
const searchProducts = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  q: stringType()
})).handler(searchProducts_createServerFn_handler, async ({
  data
}) => {
  try {
    const results = await rankProducts(data.q);
    return {
      products: results
    };
  } catch (error) {
    console.error("[searchProducts] Error:", error);
    throw error;
  }
});
const getAutocompleteSuggestions_createServerFn_handler = createServerRpc({
  id: "18ed727622b898cf89c5c033b5a38eda1bf0aa8e890c7960beff86b493fae0ab",
  name: "getAutocompleteSuggestions",
  filename: "src/lib/api/search.functions.ts"
}, (opts) => getAutocompleteSuggestions.__executeServer(opts));
const getAutocompleteSuggestions = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  q: stringType()
})).handler(getAutocompleteSuggestions_createServerFn_handler, async ({
  data
}) => {
  try {
    const queryStr = data.q.trim().toLowerCase();
    if (!queryStr) {
      return {
        products: [],
        categories: [],
        brands: []
      };
    }
    const rankedProducts = await rankProducts(queryStr);
    const categorySet = /* @__PURE__ */ new Set();
    const brandSet = /* @__PURE__ */ new Set();
    const allVirtualBrands = ["Peach Craft", "Kawaii Deco", "Clay Dream", "Strawberry Fields"];
    for (const brand of allVirtualBrands) {
      if (brand.toLowerCase().includes(queryStr)) {
        brandSet.add(brand);
      }
    }
    for (const p of rankedProducts) {
      if (p.category) {
        if (p.category.toLowerCase().includes(queryStr)) {
          categorySet.add(p.category);
        }
      }
      if (p.brand) {
        if (p.brand.toLowerCase().includes(queryStr)) {
          brandSet.add(p.brand);
        }
      }
    }
    const suggestions = {
      products: rankedProducts.slice(0, 5).map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
        brand: p.brand,
        image: p.images?.[0] ?? null
      })),
      categories: Array.from(categorySet).slice(0, 3),
      brands: Array.from(brandSet).slice(0, 3)
    };
    return suggestions;
  } catch (error) {
    console.error("[getAutocompleteSuggestions] Error:", error);
    throw error;
  }
});
export {
  getAutocompleteSuggestions_createServerFn_handler,
  searchProducts_createServerFn_handler
};
