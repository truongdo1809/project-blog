module.exports = {
    apps: [
      {
        name: 'toolhub-news-fe',
        script: 'npm',
        args: 'run start',
        cwd: './.next',
        instances: 'max',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
          NEXT_PUBLIC_API_URL:'https://news-api.toolhub.asia'
        },
      },
    ],
  };
  