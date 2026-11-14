import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import Layout from "./components/Layout.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import { SessionProvider } from "./context/session.context.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/auth/Login.jsx"
import Logout from "./pages/auth/Logout.jsx"
import Register from "./pages/auth/Register.jsx"
import Categorias from "./pages/categorias/Categorias.jsx"
import NuevaCategoria from "./pages/categorias/NuevaCategoria.jsx"
import EditarCategoria from "./pages/categorias/EditarCategoria.jsx"
import EliminarCategoria from "./pages/categorias/EliminarCategoria.jsx"
import Comandos from "./pages/comandos/Comandos.jsx"
import NuevoComando from "./pages/comandos/NuevoComando.jsx"
import EditarComando from "./pages/comandos/EditarComando.jsx"
import EliminarComando from "./pages/comandos/EliminarComando.jsx"
import MiCuenta from "./pages/cuenta/MiCuenta.jsx"
import NotFound from "./pages/NotFound.jsx"
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProtectedRoute element={<Home />} />,
      },
      {
        path: "categorias",
        element: <ProtectedRoute element={<Categorias />} />,
      },
      {
        path: "categorias/nueva",
        element: <ProtectedRoute element={<NuevaCategoria />} />,
      },
      {
        path: "categorias/:id/editar",
        element: <ProtectedRoute element={<EditarCategoria />} />,
      },
      {
        path: "categorias/:id/eliminar",
        element: <ProtectedRoute element={<EliminarCategoria />} />,
      },
      {
        path: "comandos",
        element: <ProtectedRoute element={<Comandos />} />,
      },
      {
        path: "comandos/nuevo",
        element: <ProtectedRoute element={<NuevoComando />} />,
      },
      {
        path: "comandos/:id/editar",
        element: <ProtectedRoute element={<EditarComando />} />,
      },
      {
        path: "comandos/:id/eliminar",
        element: <ProtectedRoute element={<EliminarComando />} />,
      },
      {
        path: "cuenta",
        element: <ProtectedRoute element={<MiCuenta />} />,
      },
      {
        path: "registro",
        element: <Register />,
      },
      {
        path: "ingreso",
        element: <Login />,
      },
      {
        path: "salir",
        element: <Logout />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
])


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
)
