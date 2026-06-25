import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseServer } from "../supabase";

export type SearchProductResult = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  images: string[] | null;
  tag: string | null;
  swatch: string | null;
  category: string | null;
  stock_qty: number | null;
  is_active: boolean | null;
  created_at: string | null;
  brand: string;
  searchScore: number;
  salesCount: number;
};

export type AutocompleteSuggestions = {
  products: Array<{
    id: string;
    name: string;
    price: number;
    category: string | null;
    brand: string;
    image: string | null;
  }>;
  categories: string[];
  brands: string[];
};

// Map virtual brands based on category/description/name
export function getVirtualBrand(product: {
  name: string;
  category?: string | null;
  description?: string | null;
}): string {
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

// Levenshtein distance helper for fuzzy matching
function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];
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
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Tokenize text into normalized lowercase alphanumeric words
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

// Execute relevance ranking on the active product list
async function rankProducts(queryStr: string): Promise<SearchProductResult[]> {
  const supabase = getSupabaseServer();

  // 1. Fetch active products
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id,name,price,description,images,tag,swatch,category,stock_qty,is_active,created_at")
    .eq("is_active", true);

  if (productsError) {
    throw productsError;
  }

  if (!products || products.length === 0) {
    return [];
  }

  // 2. Fetch sales popularity counts from order_items
  const { data: orderItems, error: orderItemsError } = await supabase
    .from("order_items")
    .select("product_id,qty");

  const popularityMap: Record<string, number> = {};
  if (!orderItemsError && orderItems) {
    for (const item of orderItems) {
      if (item.product_id) {
        popularityMap[item.product_id] = (popularityMap[item.product_id] || 0) + (item.qty || 1);
      }
    }
  }

  const queryTokens = tokenize(queryStr);
  if (queryTokens.length === 0) {
    // If empty query, return all products sorted by popularity, then date
    return products.map((p) => {
      const salesCount = popularityMap[p.id] || 0;
      const brand = getVirtualBrand(p);
      return {
        ...p,
        brand,
        searchScore: 1,
        salesCount,
      };
    }).sort((a, b) => b.salesCount - a.salesCount || new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  }

  const rankedResults: SearchProductResult[] = [];

  for (const p of products) {
    const brand = getVirtualBrand(p);
    const nameTokens = tokenize(p.name);
    const descTokens = tokenize(p.description ?? "");
    const catTokens = tokenize(p.category ?? "");
    const brandTokens = tokenize(brand);
    const tagTokens = tokenize(p.tag ?? "");

    let baseScore = 0;
    let matchedAny = false;

    // Check matches for each token in the query
    for (const qToken of queryTokens) {
      let tokenScore = 0;

      // 1. Match in Name (Weight: 10)
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

      // 2. Match in Category (Weight: 6)
      for (const cToken of catTokens) {
        if (cToken === qToken) {
          tokenScore += 6;
          matchedAny = true;
        } else if (cToken.startsWith(qToken)) {
          tokenScore += 3;
          matchedAny = true;
        }
      }

      // 3. Match in Brand (Weight: 6)
      for (const bToken of brandTokens) {
        if (bToken === qToken) {
          tokenScore += 6;
          matchedAny = true;
        } else if (bToken.startsWith(qToken)) {
          tokenScore += 3;
          matchedAny = true;
        }
      }

      // 4. Match in Tag (Weight: 4)
      for (const tToken of tagTokens) {
        if (tToken === qToken) {
          tokenScore += 4;
          matchedAny = true;
        }
      }

      // 5. Match in Description (Weight: 2)
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
      // Popularity boost: log scale boost, weight of 0.25
      const popularityBoost = Math.log1p(salesCount) * 0.25;
      const finalScore = baseScore * (1 + popularityBoost);

      rankedResults.push({
        ...p,
        brand,
        searchScore: parseFloat(finalScore.toFixed(2)),
        salesCount,
      });
    }
  }

  // Sort by searchScore descending, then salesCount descending, then created_at descending
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

// 1. Endpoint for full product search results
export const searchProducts = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      q: z.string(),
    })
  )
  .handler(async ({ data }) => {
    try {
      const results = await rankProducts(data.q);
      return { products: results };
    } catch (error) {
      console.error("[searchProducts] Error:", error);
      throw error;
    }
  });

// 2. Endpoint for real-time autocomplete suggestions
export const getAutocompleteSuggestions = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      q: z.string(),
    })
  )
  .handler(async ({ data }) => {
    try {
      const queryStr = data.q.trim().toLowerCase();
      if (!queryStr) {
        return { products: [], categories: [], brands: [] };
      }

      // Rank all products based on the query string
      const rankedProducts = await rankProducts(queryStr);

      // Extract unique categories & brands from matching products to suggest
      const categorySet = new Set<string>();
      const brandSet = new Set<string>();

      // Static list of possible virtual brands to match directly
      const allVirtualBrands = ["Peach Craft", "Kawaii Deco", "Clay Dream", "Strawberry Fields"];
      for (const brand of allVirtualBrands) {
        if (brand.toLowerCase().includes(queryStr)) {
          brandSet.add(brand);
        }
      }

      // Populate sets from matched products
      for (const p of rankedProducts) {
        if (p.category) {
          // Check if category matches query prefix/tokens
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

      // Format suggestions
      const suggestions: AutocompleteSuggestions = {
        products: rankedProducts.slice(0, 5).map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.category,
          brand: p.brand,
          image: p.images?.[0] ?? null,
        })),
        categories: Array.from(categorySet).slice(0, 3),
        brands: Array.from(brandSet).slice(0, 3),
      };

      return suggestions;
    } catch (error) {
      console.error("[getAutocompleteSuggestions] Error:", error);
      throw error;
    }
  });
