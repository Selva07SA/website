import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const INPUT_DIRS = ["public/products", "public/portfolio", "public/trusted"];
const JPEG_RE = /\.jpe?g$/i;

const toWebp = (file) => file.replace(JPEG_RE, ".webp");
const toAvif = (file) => file.replace(JPEG_RE, ".avif");

const fileExists = async (filePath) => {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
};

const processFile = async (inputPath) => {
  if (!JPEG_RE.test(inputPath)) return;
  const webpPath = toWebp(inputPath);
  const avifPath = toAvif(inputPath);

  if (!(await fileExists(webpPath))) {
    await sharp(inputPath).webp({ quality: 82 }).toFile(webpPath);
  }

  if (!(await fileExists(avifPath))) {
    await sharp(inputPath).avif({ quality: 55 }).toFile(avifPath);
  }
};

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else {
      await processFile(fullPath);
    }
  }
};

const run = async () => {
  for (const relDir of INPUT_DIRS) {
    const fullDir = path.join(ROOT, relDir);
    await walk(fullDir);
  }
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
