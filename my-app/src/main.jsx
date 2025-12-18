import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import People from './pages/People.jsx'
import PeopleContextProvider from './context/people/PeopleContextProvider.jsx'
import PlanetContextProvider from './context/planets/PlanetContextProvider.jsx'
import VehicleContextProvider from './context/vehicle/VehicleContextProvider.jsx'
import Planet from './pages/Planet.jsx'
import Vehicle from './pages/Vehicle.jsx'
import AllTogether from './pages/AllTogether.jsx'
import PeopleDetail from './components/peopleComponent/PeopleDetail.jsx'
import PlanetDetail from './components/planetComponent/PlanetDetail.jsx'
import VehicleDetail from './components/vehicleComponent/VehicleDetail.jsx'
import FavoriteContextProvider from './context/favorite/FavoriteContextProvider.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route path='people' element={<People />} />
    <Route path='planet' element={<Planet />} />
    <Route path='vehicle' element={<Vehicle />} />
    <Route path='together' element={<AllTogether />} />
    <Route path='peopleDetail/:id' element={<PeopleDetail />} />
    <Route path='planetDetail/:id' element={<PlanetDetail />} />
    <Route path='vehicleDetail/:id' element={<VehicleDetail />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoriteContextProvider>
    <PeopleContextProvider>
      <PlanetContextProvider>
        <VehicleContextProvider>
          <RouterProvider router={router} />
        </VehicleContextProvider>
      </PlanetContextProvider>
    </PeopleContextProvider>
    </FavoriteContextProvider>
  </StrictMode>,
)
