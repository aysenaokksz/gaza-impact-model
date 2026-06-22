import { copyFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outDir = join(process.cwd(), "dist", "client");
const indexPath = join(outDir, "index.html");

await copyFile(indexPath, join(outDir, "404.html"));
await writeFile(join(outDir, ".nojekyll"), "");

console.log("GitHub Pages artifacts ready in dist/client");
