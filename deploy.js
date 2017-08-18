const { exec } = require('child_process');
exec('rm -rf server/images/ && git add . && git ci -m "update" && git push origin master && git push heroku master', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});