import yaml from 'js-yaml'
import fs from 'fs'

const CONFIG_YAML: string = process.env.CONFIG_YAML ?? 'config.yaml'
const config: Config = yaml.load(fs.readFileSync(CONFIG_YAML, 'utf8')) as Config

// 사이트 기본 정보 - SEO에 사용
export interface Site {
  name: string
  url: string
  description: string
  author: string
}

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
  site: Site,
  about: About,
  apps: App[]
  projects: Project[]
}

export default config