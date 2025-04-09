module.exports = {
  apps: [
    {
      name: 'communication-back',
      script: './gradlew',
      args: 'bootRun',
      cwd: './back',
      interpreter: 'bash',
      watch: false,
    },
    {
      name: 'communication-front',
      script: 'npm',
      args: 'start',
      cwd: './front',
      watch: false,
    },
  ],
};
