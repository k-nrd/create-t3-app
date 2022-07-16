import type { Installer } from "./index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "../consts.js";
import { runPkgManagerInstall } from "../utils/runPkgManagerInstall.js";

export const tailwindInstaller: Installer = async ({
  projectDir,
  pkgManager,
  noInstall,
}) => {
  await runPkgManagerInstall({
    pkgManager,
    projectDir,
    packages: ["tailwindcss", "postcss", "autoprefixer"],
    devMode: true,
    noInstallMode: noInstall,
  });

  const twAssetDir = path.join(PKG_ROOT, "template/addons/tailwind");

  const twCfgSrc = path.join(twAssetDir, "tailwind.config.cjs");
  const twCfgDest = path.join(projectDir, "tailwind.config.cjs");

  const postcssCfgSrc = path.join(twAssetDir, "postcss.config.cjs");
  const postcssCfgDest = path.join(projectDir, "postcss.config.cjs");

  const cssSrc = path.join(twAssetDir, "app.css");
  const cssDest = path.join(projectDir, "src/app.css");

  await Promise.all([
    fs.copy(twCfgSrc, twCfgDest),
    fs.copy(postcssCfgSrc, postcssCfgDest),
    fs.copy(cssSrc, cssDest),
  ]);
};
