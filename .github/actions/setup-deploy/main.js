const core = require('@actions/core');
const github = require('@actions/github');
const artifact = require('@actions/artifact');
const io = require('@actions/io');
const { exec } = require('child_process');

const aClient = artifact.create();

try {
    const {GITHUB_WORKSPACE} = process.env;
    console.log(`GITHUB_WORKSPACE: ${GITHUB_WORKSPACE}`);
    ls(GITHUB_WORKSPACE);

    console.log("Retrieve _site from artifacts...");
    aClient.downloadArtifact("_site");

    console.log("Retrieve s3_website.yml from artifacts...");
    aClient.downloadArtifact("s3_website");

    // (async () => {
    //     console.log("Move s3_website.yml into root...");
    //     await io.mv(`${GITHUB_WORKSPACE}/s3_website/s3_website.yml`,
    //         `${GITHUB_WORKSPACE}/s3_website.yml`)
    // })();

    console.log("Set to production environment values when branch is gh-pages")
    ls(GITHUB_WORKSPACE);
} catch (error) {
    core.setFailed(error.message);
}

function ls(dir) {
    exec(`ls -la ${dir}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}
