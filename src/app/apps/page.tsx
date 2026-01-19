import AppList from '../../components/AppList'
import config from '../../config'

export const dynamic = 'force-static'

export default function AppsPage() {
  const { apps } = config
  return <AppList apps={apps} />
}
