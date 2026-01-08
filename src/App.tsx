import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/Home";
import CatalogPage from "@/pages/Catalog";
import ActivityPage from "@/pages/Activity";
import ActivityDetailPage from "@/pages/ActivityDetail";
import SettingsPage from "@/pages/Setting";
import NotFound from "@/pages/NotFound";
import Cartpage from "./pages/Cart";
import PaymentPage from "./pages/Payment";
import WelcomePage from "./pages/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/activity" element={<ActivityPage />} />
      <Route path="/activity/:id" element={<ActivityDetailPage />} />
      <Route path="/setting" element={<SettingsPage />} />
      <Route path="/cart" element={<Cartpage />} />
      <Route path="/payment" element={<PaymentPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
