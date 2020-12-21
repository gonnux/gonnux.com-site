import AppBar from './AppBar'

export default function withLayout(Component) {
  return (props) => (
    <>
      <AppBar />
      <Component {...props} />
    </>
  )
}
