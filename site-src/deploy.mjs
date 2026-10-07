// Copies the Vite build into the repo root (GitHub Pages serves the root).
// Leaves privacy.html, terms.html, delete-account.html, style.css, badges/, CNAME untouched.
import { cpSync, rmSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve("dist");
const root = resolve("..");

for (const dir of ["assets", "photos", "screens", "people"]) {
  rmSync(resolve(root, dir), { recursive: true, force: true });
  if (existsSync(resolve(dist, dir))) cpSync(resolve(dist, dir), resolve(root, dir), { recursive: true });
}
cpSync(resolve(dist, "index.html"), resolve(root, "index.html"));
cpSync(resolve(dist, "logo-pin.png"), resolve(root, "logo-pin.png"));
console.log("Copied build to", root);
