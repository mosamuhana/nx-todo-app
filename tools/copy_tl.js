const fs = require("fs");
const path = require("path");

const SRC_DIR = './libs/telegram/src/lib/tl/static/';
const DST_DIR = './dist/apps/tele-app/static/';

function copyFiles() {
  const srcApiPath = path.join(SRC_DIR, 'api.tl');
  const dstApiPath = path.join(DST_DIR, 'api.tl');

  const srcSchemaPath = path.join(SRC_DIR, 'schema.tl');
  const dstSchemaPath = path.join(DST_DIR, 'schema.tl');

  if (!fs.existsSync(DST_DIR)) {
    fs.mkdirSync(DST_DIR, { recursive: true });
  }

  if (!fs.existsSync(dstApiPath)) {
    fs.copyFileSync(srcApiPath, dstApiPath);
  }

  if (!fs.existsSync(dstSchemaPath)) {
    fs.copyFileSync(srcSchemaPath, dstSchemaPath);
  }
}

copyFiles();
