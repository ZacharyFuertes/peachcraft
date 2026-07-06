import { f as createSsrRpc } from "./router-CKtFdSku.mjs";
import { c as createServerFn } from "./server-CAyWubo2.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const uploadStoreImage = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  fileName: stringType().min(1),
  base64: stringType().min(1),
  accessToken: stringType().optional()
})).handler(createSsrRpc("2096d130a286e3dfec5d2a1f28242a67bcb36445b791d215188e546a5f85f4ef"));
const getStoreDetails = createServerFn({
  method: "GET"
}).handler(createSsrRpc("c1efde8f7b62c99682bf334c4daacec2d017d9c10b92c7930bc2a47e0e0848ac"));
const updateStoreDetails = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  store_name: stringType().min(1),
  store_logo: stringType().nullable(),
  store_description: stringType().nullable(),
  contact_email: stringType().nullable(),
  contact_number: stringType().min(1),
  address: stringType().nullable(),
  facebook_url: stringType().nullable(),
  instagram_url: stringType().nullable(),
  twitter_url: stringType().nullable(),
  footer_text: stringType().nullable(),
  hero_banner: stringType().nullable(),
  accessToken: stringType().optional()
})).handler(createSsrRpc("59a79d6f704facff26f36b652cb66d2fff0e4b7a343a79c87ae3c4938fd08949"));
export {
  updateStoreDetails as a,
  getStoreDetails as g,
  uploadStoreImage as u
};
