const core = require('@actions/core');
const github = require('@actions/github');
const artifact = require('@actions/artifact');
const io = require('@actions/io');
const { exec } = require('child_process');

const aClient = artifact.create();
const {GITHUB_WORKSPACE} = process.env;

try {
    console.log(`GITHUB_WORKSPACE: ${GITHUB_WORKSPACE}`);
    ls(GITHUB_WORKSPACE);

    downloadArtifact("_site");
    downloadArtifact("s3_website");

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

function downloadArtifact(name) {
    (async () => {
        console.log(`Retrieve ${name} from artifacts...`);
        await aClient.downloadArtifact(name);
    })()
        .then(a => {
            console.log(`Retrieved ${name} from artifacts...`, a);
            ls(GITHUB_WORKSPACE);
        })
        .catch(e => {
            core.setFailed(e.message);
        });
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
