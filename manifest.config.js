import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  author: pkg.author,
  version: pkg.version,
  description: pkg.description,
  homepage_url: pkg.homepage_url,
  icons: { 48: "public/logo.png" },
  host_permissions: ["*://*.hackerearth.com/*"],
  action: {
    default_icon: { 48: "public/logo.png" },
    default_popup: "src/popup/index.html",
  },
});
