const path = require("path");

module.exports = {
  apps: [
    {
      name: "next-app",
      cwd: path.resolve(__dirname),
      script: "pnpm",
      args: "start",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        PORT: "12345",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: "12345",
      },
      instances: 1,
      watch: false,
      restart_delay: 4000,
      max_restarts: 10,
      out_file: "./logs/next-app.out.log",
      error_file: "./logs/next-app.err.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};

