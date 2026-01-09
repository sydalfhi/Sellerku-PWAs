import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/Home";
import CatalogPage from "@/pages/Catalog";
import ActivityPage from "@/pages/Activity";
import ActivityDetailPage from "@/pages/ActivityDetail";
import SettingsPage from "@/pages/Setting";
import NotFound from "@/pages/NotFound";
import Cartpage from "@/pages/Cart";
import PaymentPage from "@/pages/Payment";
import WelcomePage from "@/pages/Welcome";
import LoginPage from "@/pages/Login";

import { RequireAuth, GuestOnly } from "@/middleware/authMiddleware";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* public */}
        <Route path="/" element={<WelcomePage />} />

        {/* guest only */}
        <Route element={<GuestOnly />}>
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>

        {/* protected */}
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/activity/:id" element={<ActivityDetailPage />} />
          <Route path="/setting" element={<SettingsPage />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
