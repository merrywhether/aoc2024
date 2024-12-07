import "@std/dotenv/load";
import { parseArgs } from "@std/cli/parse-args";
import { crypto } from "@std/crypto/crypto";
import { decodeHex, encodeHex } from "@std/encoding/hex";

const flags = parseArgs(Deno.args, {
  boolean: ["decrypt"],
  string: ["get"],
});

if (flags.decrypt && flags.get) {
  throw new Error("Cannot provide both --decrypt and --get flags");
}

const keyString = Deno.env.get("INPUT_KEY");
if (!keyString) {
  throw new Error("Missing INPUT_KEY environment variable");
}

const encoder = new TextEncoder();
const key = await crypto.subtle.importKey(
  "raw",
  new Uint8Array(
    await crypto.subtle.digest("SHA-256", encoder.encode(keyString)),
  ).slice(0, 16),
  "AES-GCM",
  true,
  ["encrypt", "decrypt"],
);

const srcDirPath = `${new URL(".", import.meta.url).pathname}`;

if (flags.decrypt) {
  console.log("Decrypting all enput.txt files...");
  for await (const dirEntry of Deno.readDir(srcDirPath)) {
    if (dirEntry.isDirectory && dirEntry.name.match(/^\d{2}$/)) {
      const targetDirPath = `${srcDirPath}${dirEntry.name}/`;
      const enputPath = `${targetDirPath}enput.txt`;

      let enput = "";
      try {
        enput = await Deno.readTextFile(enputPath);
      } catch {
        continue;
      }
      const [iv, encrypted] = enput.split("\n");
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: Uint8Array.from(iv.split(",").map(Number)) },
        key,
        decodeHex(encrypted),
      );

      const decoder = new TextDecoder();
      await Deno.writeTextFile(
        `${targetDirPath}input.txt`,
        decoder.decode(decrypted),
      );
    }
  }

  console.log("Done.");
  Deno.exit();
}

if (!flags.get) {
  throw new Error("Must provide either --decrypt or --get flag");
}

if (!flags.get.match(/^\d{2}$/)) {
  throw new Error("--get flag must be a two-digit number");
}

const aocSession = Deno.env.get("AOC_SESSION");
if (!aocSession) {
  throw new Error("Missing AOC_SESSION environment variable");
}

console.log(`Fetching input for day ${flags.get}...`);

const headers = new Headers();
headers.append("Cookie", `session=${aocSession}`);
const input = await fetch(
  `https://adventofcode.com/2024/day/${Number(flags.get)}/input`,
  {
    headers,
  },
);
const text = await input.text();

await Deno.writeTextFile(`${srcDirPath}${flags.get}/input.txt`, text);

console.log(`Encrypting input for day ${flags.get}...`);

const iv = crypto.getRandomValues(new Uint8Array(12));
const encrypted = encodeHex(
  await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(text),
  ),
);

await Deno.writeTextFile(
  `${srcDirPath}${flags.get}/enput.txt`,
  `${iv}\n${encrypted}`,
);

console.log("Done.");
