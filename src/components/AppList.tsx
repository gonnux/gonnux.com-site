import type { FC } from 'react'
import type { App } from '@/config'
import GridCardList from './GridCardList'

const AppList: FC<{ apps: App[] }> = ({ apps }) => (
  <GridCardList
    items={apps}
    getUrl={(app) => app.site ?? app.git}
    getName={(app) => app.name}
    getImage={(app) => app.image}
    component="section"
  />
)

export default AppList
