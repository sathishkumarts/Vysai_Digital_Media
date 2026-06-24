/**
 * generate-favicons.mjs
 * Generates all favicon sizes from public/favicon.png using sharp.
 * Run: node scripts/generate-favicons.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const src = path.join(publicDir, 'favicon.png');

const sizes = [
  { name: 'favicon-16x16.png',    size: 16 },
  { name: 'favicon-32x32.png',    size: 32 },
  { name: 'favicon-48x48.png',    size: 48 },
  { name: 'favicon-96x96.png',    size: 96 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-192x192.png',  size: 192 },
  { name: 'favicon-512x512.png',  size: 512 },
];

console.log('🔧 Generating favicons from:', src);

// Generate all PNG sizes
for (const { name, size } of sizes) {
  const dest = path.join(publicDir, name);
  await sharp(src)
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(dest);
  console.log(`✅ Generated: ${name} (${size}x${size})`);
}

// Generate favicon.ico (multi-size: 16, 32, 48) using raw buffers + manual ICO format
// We produce a proper .ico from the 32x32 PNG using a simple 1-image ICO structure
// Sharp doesn't natively output ICO, so we construct it manually
const ico32 = await sharp(src)
  .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toBuffer();

const ico16 = await sharp(src)
  .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toBuffer();

const ico48 = await sharp(src)
  .resize(48, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toBuffer();

// Build a multi-resolution ICO file (ICONDIR header + 3 ICONDIRENTRY + image data)
function buildIco(images) {
  const count = images.length;
  // ICONDIR: 6 bytes
  const iconDir = Buffer.alloc(6);
  iconDir.writeUInt16LE(0, 0);     // Reserved (must be 0)
  iconDir.writeUInt16LE(1, 2);     // Type: 1 = ICO
  iconDir.writeUInt16LE(count, 4); // Number of images

  const dirEntrySize = 16;
  const dataOffset = 6 + count * dirEntrySize;

  const entries = [];
  let offset = dataOffset;

  for (const img of images) {
    const { buf, size } = img;
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size === 256 ? 0 : size, 0);  // Width (0 = 256)
    entry.writeUInt8(size === 256 ? 0 : size, 1);  // Height
    entry.writeUInt8(0, 2);                          // Color count (0 for PNG)
    entry.writeUInt8(0, 3);                          // Reserved
    entry.writeUInt16LE(1, 4);                       // Color planes
    entry.writeUInt16LE(32, 6);                      // Bits per pixel
    entry.writeUInt32LE(buf.length, 8);              // Size of image data
    entry.writeUInt32LE(offset, 12);                 // Offset to image data
    entries.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([
    iconDir,
    ...entries,
    ...images.map(i => i.buf),
  ]);
}

const icoBuffer = buildIco([
  { buf: ico16, size: 16 },
  { buf: ico32, size: 32 },
  { buf: ico48, size: 48 },
]);

const icoPath = path.join(publicDir, 'favicon.ico');
fs.writeFileSync(icoPath, icoBuffer);
console.log('✅ Generated: favicon.ico (16x16, 32x32, 48x48 multi-size ICO)');

console.log('\n🎉 All favicon files generated successfully!');
console.log('\nPublic folder now contains:');
for (const { name } of sizes) {
  const filePath = path.join(publicDir, name);
  const stat = fs.statSync(filePath);
  console.log(`   ${name} — ${(stat.size / 1024).toFixed(1)} KB`);
}
const icoStat = fs.statSync(icoPath);
console.log(`   favicon.ico — ${(icoStat.size / 1024).toFixed(1)} KB`);
