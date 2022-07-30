const yaml = require('js-yaml')
const fs = require('fs')

const CONFIG_YAML = process.env.CONFIG_YAML ?? 'config.yaml'
module.exports = yaml.safeLoad(fs.readFileSync(CONFIG_YAML, 'utf8'))
