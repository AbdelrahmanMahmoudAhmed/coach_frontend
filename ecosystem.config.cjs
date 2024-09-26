module.exports = {
  apps: [{
    name: "hustle-nation-website",
    script: './.output/server/index.mjs',
    instances: "max",
    max_memory_restart: "1G",
    port: '3031',
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
    },
    env_production: {
      NODE_ENV: "production",
    },
  },
]}



