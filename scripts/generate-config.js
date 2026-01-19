const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

const CONFIG_YAML = process.env.CONFIG_YAML ?? 'config.yaml'
const config = yaml.load(fs.readFileSync(CONFIG_YAML, 'utf8'))

const output = `// Auto-generated from ${CONFIG_YAML} - DO NOT EDIT
const config = ${JSON.stringify(config, null, 2)}

export default config
`

const outputPath = path.join(__dirname, '../src/config.generated.ts')
fs.writeFileSync(outputPath, output)
console.log(`Generated ${outputPath}`)
