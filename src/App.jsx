import Layout from './components/Layout'
import LinkPage from './components/Linkage'
import Login from './components/Login'
import Register from './components/Register'
import { Routes, Route } from 'react-router-dom'
import Unauthorized from './components/Unauthorized'
import Home from './components/Home'
import Editor from './components/Editor'
import Admin from './components/Admin'
import Lounge from './components/Lounge'
import Missing from './components/Missing'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* public routes */}
        <Route path='/login' element={<Login />} />
        <Route path="/linkpage" element={<LinkPage />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        {/* we want to protect this route */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={['admin', 'user']} />}>
            <Route path='/' element={<Home />} />
            <Route path='/editor' element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path='/admin' element={<Admin />} />
            <Route path='/lounge' element={<Lounge />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
