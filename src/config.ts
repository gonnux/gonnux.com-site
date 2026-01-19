import generatedConfig from './config.generated'

const config: Config = generatedConfig

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