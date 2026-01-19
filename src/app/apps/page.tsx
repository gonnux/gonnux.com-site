import AppList from '../../components/AppList'
import config from '../../config'

export default function AppsPage() {
  const { apps } = config
  return <AppList apps={apps} />
}
