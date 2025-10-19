#!/usr/bin/env node

const { exec } = require("child_process");

console.log("Deleting build files...");

exec("rm -rf *.d.ts *.js *.js.map url utils meta cms", () => {
  console.log("Creating public folder...");
  console.log("Project cleaned with success!");
});
