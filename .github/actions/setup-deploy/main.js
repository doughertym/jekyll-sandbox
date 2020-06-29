const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require('child_process');

try {
    console.log("Retrieve site from artifacts...");
    console.log("Retrieve s3_website.yml from artifacts...");
    console.log("Move s3_website.yml into root...");
    console.log("Set to production environment values when branch is gh-pages")
} catch (error) {
    core.setFailed(error.message);
}