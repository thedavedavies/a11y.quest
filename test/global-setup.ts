import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

export default function setup(): void {
  execSync("npm run build", { stdio: existsSync("dist") ? "pipe" : "inherit" });
}
