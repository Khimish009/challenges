import { NotificationList, TransportSwitcher, TransportProvider } from './features/notifications'

function App() {
  return (
    <TransportProvider>
      <TransportSwitcher />
      <NotificationList />
    </TransportProvider>
  )
}

export default App
