const core = require('@actions/core');
const github = require('@actions/github');
const artifact = require('@actions/artifact');
const io = require('@actions/io');
const { exec } = require('child_process');

const aClient = artifact.create();

try {
    const {GITHUB_WORKFLOW} = process.env;
    ls();

    console.log("Retrieve _site from artifacts...");
    aClient.downloadArtifact("_site", `${GITHUB_WORKFLOW}/_site`);

    console.log("Retrieve s3_website.yml from artifacts...");
    aClient.downloadArtifact("s3_website", `${GITHUB_WORKFLOW}/s3_website`);

    console.log("Move s3_website.yml into root...");
    io.mv(`${GITHUB_WORKFLOW}/s3_website/s3_website.yml`, `${GITHUB_WORKFLOW}/s3_website.yml`);

    console.log("Set to production environment values when branch is gh-pages")
    ls();
} catch (error) {
    core.setFailed(error.message);
}

function ls() {
    exec('ls -la', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}
