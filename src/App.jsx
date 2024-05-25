import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { UserAuthProvider } from "./Provider/userProvider";
import { CitiesProvider } from "./Provider/CityProvider";

import CityList from "./features/Cities/CityList";
import City from "./features/Cities/City";
import CountryList from "./features/Countries/CountryList";
import Profile from "./features/User/Profile";

import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Product from "./pages/product";
import Homepage from "./pages/Homepage";

import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
  return (
    <UserAuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/product" element={<Product />} />
              <Route path="/app" element={<AppLayout />}>
                <Route path="profile" element={<Profile />} />
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </UserAuthProvider>
  );
}

export default App;
