import http from "node:http";
import https from "node:https";

const SITEMAP_URL = "https://www.msns.edu.pk/sitemap.xml";
const INDEXNOW_KEY = "e41e57c6b9074d2899478f7e8a939f40";
const DOMAIN = "www.msns.edu.pk";

const URL_LIST = [
  "https://www.msns.edu.pk/",
  "https://www.msns.edu.pk/about",
  "https://www.msns.edu.pk/admission",
  "https://www.msns.edu.pk/contact",
  "https://www.msns.edu.pk/terms-of-service",
  "https://msns.edu.pk/",
  "https://msns.edu.pk/about",
  "https://msns.edu.pk/admission",
  "https://msns.edu.pk/contact",
  "https://msns.edu.pk/terms-of-service"
];

/**
 * @param {string} serviceName
 * @param {string} pingUrl
 */
async function pingSitemap(serviceName, pingUrl) {
  return new Promise((resolve) => {
    console.log(`[+] Pinging ${serviceName}...`);
    https.get(pingUrl, (res) => {
      console.log(`  └─ Response Status: ${res.statusCode} ${res.statusMessage}`);
      resolve(res.statusCode);
    }).on("error", (err) => {
      console.error(`  └─ Error pinging ${serviceName}:`, err.message);
      resolve(null);
    });
  });
}

async function submitIndexNow() {
  const payload = JSON.stringify({
    host: DOMAIN,
    key: INDEXNOW_KEY,
    keyLocation: `https://${DOMAIN}/${INDEXNOW_KEY}.txt`,
    urlList: URL_LIST
  });

  const options = {
    hostname: "api.indexnow.org",
    port: 443,
    path: "/indexnow",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve) => {
    console.log("[+] Submitting URLs via IndexNow (Bing/Yandex/Seznam/Naver)...");
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        console.log(`  └─ Response Status: ${res.statusCode} ${res.statusMessage}`);
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log("  └─ Successfully submitted URLs to IndexNow!");
        } else {
          console.log(`  └─ IndexNow Response: ${body}`);
        }
        resolve(res.statusCode);
      });
    });

    req.on("error", (err) => {
      console.error("  └─ Error submitting to IndexNow:", err.message);
      resolve(null);
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log("=== MSNS Crawler Index Submission Tool ===");
  console.log(`Target Sitemap: ${SITEMAP_URL}\n`);

  await pingSitemap("Google Search Console Ping", `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);
  await pingSitemap("Bing Webmaster Ping", `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);
  await submitIndexNow();

  console.log("\n[✔] Crawler ping sequence executed successfully.");
}

main().catch(console.error);
