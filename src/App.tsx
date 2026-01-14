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

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BarcodeScanPage from "./pages/BarcodeScan";
import { Toaster } from "react-hot-toast";
import { GuestOnly, RequireAuth } from "./middleware/authMiddleware";

import InvoicePDFPage from "./features/InvoicePDF";
import ReceiptPrinter from "./features/InvoicePDF/components/Print";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />

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
          <Route path="/barcode-scan" element={<BarcodeScanPage />} />
          <Route path="/invoice-pdf/:outNo" element={<InvoicePDFPage />} />
          <Route path="/struk/:outNo" element={<ReceiptPrinter />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <ReactQueryDevtools position="right" /> */}
    </QueryClientProvider>
  );
}

export default App;
