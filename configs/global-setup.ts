import rimraf from "rimraf";
import { rimrafSync } from "rimraf";

async function globalSetup() {
  rimrafSync(`../allure-results`);
}
export default globalSetup;
