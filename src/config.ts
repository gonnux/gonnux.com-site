import yaml from 'js-yaml'
import fs from 'fs'

const CONFIG_YAML: string = process.env.CONFIG_YAML ?? 'config.yaml'
const config: Config = yaml.load(fs.readFileSync(CONFIG_YAML, 'utf8')) as Config

export interface About {
  markdown: string
}

export interface App {
  name: string,
  git: string,
  site: string,
  image: string
}

export interface Project {
  name: string,
  git: string,
  site: string,
  image: string,
  readme: string
}

export interface Config {
  about: About,
  apps: App[]
  projects: Project[]
}

export default config