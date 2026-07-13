const path = require("path");
const { chromium } = require("C:\\Users\\siddh\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\node_modules\\.pnpm\\playwright-core@1.61.1\\node_modules\\playwright-core");

(async () => {
  const fileUrl = "file:///" + path.resolve("work/cee.html").replace(/\\/g, "/");
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const errors = [];

  for (const viewport of [
    { name: "desktop", width: 1366, height: 900 },
    { name: "mobile", width: 390, height: 844 }
  ]) {
    const page = await browser.newPage({ viewport });
    page.on("pageerror", (error) => errors.push(`${viewport.name}: ${error.message}`));
    page.on("console", (message) => {
      if (message.type() === "error") {
        const text = message.text();
        if (!/ERR_|adsbygoogle|Failed to load resource/i.test(text)) {
          errors.push(`${viewport.name} console: ${text}`);
        }
      }
    });
    await page.goto(fileUrl, { waitUntil: "load" });
    await page.waitForFunction(() => document.querySelector("#loader")?.classList.contains("done"), null, { timeout: 3000 });
    await page.screenshot({ path: `work/cee-${viewport.name}-home.png`, fullPage: false });
    await page.locator('[data-set="beginner"]').click();
    await page.locator(".quiz-option").first().click();
    await page.screenshot({ path: `work/cee-${viewport.name}.png`, fullPage: false });
    const title = await page.title();
    const h1 = await page.locator("h1.title").innerText();
    const questionCount = await page.locator(".question-card").count();
    console.log(`${viewport.name}: ${title}`);
    console.log(`${viewport.name}: ${h1}`);
    console.log(`${viewport.name}: question cards ${questionCount}`);
    await page.close();
  }

  await browser.close();
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
})();
