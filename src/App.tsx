import { BrowserRouter, Route, Routes } from 'react-router'
import { Account } from './pages/account'
import { Home } from './pages/home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
