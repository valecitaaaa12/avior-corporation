import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AppContext.jsx';

// Sitio público
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import Home from './pages/Home.jsx';
import Carreras from './pages/Carreras.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Sedes from './pages/Sedes.jsx';
import Contacto from './pages/Contacto.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';

// Sistema académico
import DashboardLayout from './pages/dashboard/DashboardLayout.jsx';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function PrivateRoute({ children }) {
  const { session } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/carreras" element={<PublicLayout><Carreras /></PublicLayout>} />
      <Route path="/nosotros" element={<PublicLayout><Nosotros /></PublicLayout>} />
      <Route path="/sedes" element={<PublicLayout><Sedes /></PublicLayout>} />
      <Route path="/contacto" element={<PublicLayout><Contacto /></PublicLayout>} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard/*"
        element={<PrivateRoute><DashboardLayout /></PrivateRoute>}
      />
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}
