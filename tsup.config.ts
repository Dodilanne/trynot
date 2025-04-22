import { copyFile } from "node:fs/promises";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src", "!**/*.test.ts"],
  dts: true,
  format: ["cjs", "esm"],
  clean: true,
  plugins: [
    {
      name: "Copy package files",
      buildEnd: async () => {
        await copyFile("./package.json", "dist/package.json");
        await copyFile("./README.md", "dist/README.md");
        await copyFile("./LICENSE", "dist/LICENSE");
      },
    },
  ],
});
