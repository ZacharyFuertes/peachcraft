import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as getSupabaseClient } from "./supabase-BbYbDVIj.mjs";
import { g as getStoreDetails, u as uploadStoreImage, a as updateStoreDetails } from "./storeDetails.functions-DqZWPLX2.mjs";
import "../_libs/seroval.mjs";
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
import "./router-D98JWfRI.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./server-BWmwJzJ_.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function WebsiteSettings() {
  const [initial, setInitial] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    store_name: "",
    store_logo: null,
    store_description: "",
    contact_email: "",
    contact_number: "",
    address: "",
    facebook_url: "",
    instagram_url: "",
    twitter_url: "",
    footer_text: "",
    hero_banner: null
  });
  const [logoFile, setLogoFile] = reactExports.useState(null);
  const [bannerFile, setBannerFile] = reactExports.useState(null);
  const [logoPreview, setLogoPreview] = reactExports.useState(null);
  const [bannerPreview, setBannerPreview] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getStoreDetails();
      if (!mounted) return;
      if (data) {
        setInitial(data);
        setForm({
          store_name: data.store_name ?? "",
          store_logo: data.store_logo ?? null,
          store_description: data.store_description ?? "",
          contact_email: data.contact_email ?? "",
          contact_number: data.contact_number ?? "",
          address: data.address ?? "",
          facebook_url: data.facebook_url ?? "",
          instagram_url: data.instagram_url ?? "",
          twitter_url: data.twitter_url ?? "",
          footer_text: data.footer_text ?? "",
          hero_banner: data.hero_banner ?? null
        });
        setLogoPreview(data.store_logo ?? null);
        setBannerPreview(data.hero_banner ?? null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  function handleFileSelect(e, setFile, setPreview) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return setFile(null);
    const valid = ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type);
    if (!valid) {
      setMessage({
        type: "error",
        text: "Invalid image type. Use jpg, jpeg, png, webp."
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Image too large. Max 5MB."
      });
      return;
    }
    setFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  }
  const getAccessToken = async () => {
    const supabase = getSupabaseClient();
    const {
      data
    } = await supabase.auth.getSession();
    return data?.session?.access_token;
  };
  async function toBase64(file) {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  async function handleSave() {
    setMessage(null);
    if (!form.store_name || !form.contact_number) {
      setMessage({
        type: "error",
        text: "Store name and contact number are required."
      });
      return;
    }
    if (form.contact_email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.contact_email)) {
      setMessage({
        type: "error",
        text: "Invalid email address."
      });
      return;
    }
    setLoading(true);
    try {
      let storeLogoUrl = form.store_logo;
      let heroBannerUrl = form.hero_banner;
      const accessToken = await getAccessToken();
      if (logoFile) {
        const base64 = await toBase64(logoFile);
        const uploaded = await uploadStoreImage({
          data: {
            fileName: logoFile.name,
            base64,
            accessToken
          }
        });
        storeLogoUrl = uploaded.publicUrl;
      }
      if (bannerFile) {
        const base64 = await toBase64(bannerFile);
        const uploaded = await uploadStoreImage({
          data: {
            fileName: bannerFile.name,
            base64,
            accessToken
          }
        });
        heroBannerUrl = uploaded.publicUrl;
      }
      const payload = {
        store_name: form.store_name,
        store_logo: storeLogoUrl ?? null,
        store_description: form.store_description ?? null,
        contact_email: form.contact_email ?? null,
        contact_number: form.contact_number,
        address: form.address ?? null,
        facebook_url: form.facebook_url ?? null,
        instagram_url: form.instagram_url ?? null,
        twitter_url: form.twitter_url ?? null,
        footer_text: form.footer_text ?? null,
        hero_banner: heroBannerUrl ?? null,
        accessToken
      };
      await updateStoreDetails({
        data: payload
      });
      setMessage({
        type: "success",
        text: "Settings saved."
      });
      const refreshed = await getStoreDetails();
      setInitial(refreshed);
      setForm({
        store_name: refreshed?.store_name ?? "",
        store_logo: refreshed?.store_logo ?? null,
        store_description: refreshed?.store_description ?? "",
        contact_email: refreshed?.contact_email ?? "",
        contact_number: refreshed?.contact_number ?? "",
        address: refreshed?.address ?? "",
        facebook_url: refreshed?.facebook_url ?? "",
        instagram_url: refreshed?.instagram_url ?? "",
        twitter_url: refreshed?.twitter_url ?? "",
        footer_text: refreshed?.footer_text ?? "",
        hero_banner: refreshed?.hero_banner ?? null
      });
      setLogoFile(null);
      setBannerFile(null);
      setLogoPreview(refreshed?.store_logo ?? null);
      setBannerPreview(refreshed?.hero_banner ?? null);
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.message ?? "Failed to save settings."
      });
    } finally {
      setLoading(false);
    }
  }
  function handleReset() {
    if (!initial) return;
    setForm({
      store_name: initial.store_name ?? "",
      store_logo: initial.store_logo ?? null,
      store_description: initial.store_description ?? "",
      contact_email: initial.contact_email ?? "",
      contact_number: initial.contact_number ?? "",
      address: initial.address ?? "",
      facebook_url: initial.facebook_url ?? "",
      instagram_url: initial.instagram_url ?? "",
      twitter_url: initial.twitter_url ?? "",
      footer_text: initial.footer_text ?? "",
      hero_banner: initial.hero_banner ?? null
    });
    setLogoFile(null);
    setBannerFile(null);
    setLogoPreview(initial.store_logo ?? null);
    setBannerPreview(initial.hero_banner ?? null);
    setMessage(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold mb-6", children: "Website Settings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Store Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.store_name, onChange: (e) => setForm({
            ...form,
            store_name: e.target.value
          }), className: "w-full rounded-md border px-3 py-2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Store Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, value: form.store_description, onChange: (e) => setForm({
            ...form,
            store_description: e.target.value
          }), className: "w-full rounded-md border px-3 py-2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Contact Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.contact_email, onChange: (e) => setForm({
            ...form,
            contact_email: e.target.value
          }), className: "w-full rounded-md border px-3 py-2", type: "email" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Contact Number *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.contact_number, onChange: (e) => setForm({
            ...form,
            contact_number: e.target.value
          }), className: "w-full rounded-md border px-3 py-2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Business Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.address, onChange: (e) => setForm({
            ...form,
            address: e.target.value
          }), className: "w-full rounded-md border px-3 py-2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Facebook URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.facebook_url, onChange: (e) => setForm({
              ...form,
              facebook_url: e.target.value
            }), className: "w-full rounded-md border px-3 py-2" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Instagram URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.instagram_url, onChange: (e) => setForm({
              ...form,
              instagram_url: e.target.value
            }), className: "w-full rounded-md border px-3 py-2" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Twitter / X URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.twitter_url, onChange: (e) => setForm({
            ...form,
            twitter_url: e.target.value
          }), className: "w-full rounded-md border px-3 py-2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Footer Copyright Text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.footer_text, onChange: (e) => setForm({
            ...form,
            footer_text: e.target.value
          }), className: "w-full rounded-md border px-3 py-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Store Logo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-40 h-24 bg-white/5 rounded-md flex items-center justify-center border", children: logoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoPreview, alt: "logo preview", className: "max-w-full max-h-full object-contain" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted", children: "No logo" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => handleFileSelect(e, setLogoFile, setLogoPreview) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Hero Banner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-64 h-36 bg-white/5 rounded-md flex items-center justify-center border", children: bannerPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bannerPreview, alt: "banner preview", className: "w-full h-full object-cover rounded-md" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted", children: "No banner" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => handleFileSelect(e, setBannerFile, setBannerPreview) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Preview Text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border p-3 bg-white/5 min-h-[120px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: form.store_name || "Store name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted", children: form.store_description || "Store description" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSave, disabled: loading, className: "px-4 py-2 rounded-full bg-blush text-blush-foreground font-semibold", children: loading ? "Saving..." : "Save" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleReset, disabled: loading, className: "px-4 py-2 rounded-full border", children: "Reset" })
        ] }),
        message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 p-3 rounded-md " + (message.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"), children: message.text })
      ] })
    ] })
  ] });
}
export {
  WebsiteSettings as component
};
