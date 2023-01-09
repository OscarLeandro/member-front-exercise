
import LayoutDashboard from '../../components/dashboard/layouts/LayoutDashboard'
import PrivateRoute from '../../routes/PrivateRoute'
  
  export default function Directory() {
    return (
      <PrivateRoute>
        <LayoutDashboard />
      </PrivateRoute>
    )
  }
  