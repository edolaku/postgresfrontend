import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Public from "./components/Public"
import Login from "./components/Login"
import Welcome from "./components/Welcome"
import RequireAuth from "./components/RequireAuth"
import UsersList from "./features/users/UsersList"
import Unauthorized from "./components/Unauthorized"
import PersistLogin from "./features/persistLogin/PersistLogin"
import Missing from "./components/Missing"
import Logout from "./components/Logout"





function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="logout" element={<Logout />} />
        
        {/* protected routes */}
        <Route element={<PersistLogin />}>

          <Route element={<RequireAuth allowedRoles={['admin', 'user']} />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path="users" element={<UsersList />} />
          </Route>

        </Route>

        {/* catch all */}
        <Route path='*' element={<Missing />} />

      </Route>
    </Routes>
  )
}

export default App
