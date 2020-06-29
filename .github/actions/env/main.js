const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require('child_process');

try {
    console.log(JSON.stringify(process.env, undefined, 2));
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

    exec('ls -la', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
} catch (error) {
    core.setFailed(error.message);
}