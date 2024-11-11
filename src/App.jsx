import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Public from "./components/pages/Public"
import Login from "./components/Login"
import Welcome from "./components/pages/Welcome"
import RequireAuth from "./components/RequireAuth"
import UsersList from "./features/users/UsersList"
import Unauthorized from "./components/pages/Unauthorized"
import PersistLogin from "./features/persistLogin/PersistLogin"
import Missing from "./components/pages/Missing"
import Logout from "./components/Logout"

const ADMIN = ['admin']
const USER = ['admin', 'user']




function App() {
  return (
    <Routes>
      <Route path="/">
        {/* public routes */}
        {/* <Route index element={<Welcome />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />

        {/* protected routes */}
        <Route element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path='*' element={<Missing />} />

            <Route element={<RequireAuth allowedRoles={USER} />}>
              <Route path="welcome" element={<Welcome />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={ADMIN} />}>
              <Route path="users" element={<UsersList />} />
            </Route>
          </Route>
        </Route>

        {/* catch all */}

      </Route>
    </Routes>
  )
}

export default App
