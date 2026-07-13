const fs = require("fs");

const html = fs.readFileSync("work/cee.html", "utf8");
const nonAscii = [...html].filter((ch) => ch.charCodeAt(0) > 127);
console.log(nonAscii.length ? `non-ascii ${nonAscii.length}` : "ascii only");

const scriptRe = /<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/gi;
const scripts = [...html.matchAll(scriptRe)].map((match) => match[1]);
console.log(`scripts ${scripts.length}`);

scripts.forEach((script, index) => {
  try {
    new Function(script);
    console.log(`script ${index} ok`);
  } catch (error) {
    console.error(`script ${index} ${error.message}`);
    process.exitCode = 1;
  }
});
