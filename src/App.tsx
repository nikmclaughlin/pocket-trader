import { BrowserRouter, Route, Routes } from 'react-router'
import { NavBar } from './components/NavBar'
import { ThemeProvider } from './context/ThemeProvider'
import { Account } from './pages/Account'
import { Home } from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route element={<NavBar />}>
            <Route path="/" element={<Home />} />
            <Route path="/account/:accountId" element={<Account />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
