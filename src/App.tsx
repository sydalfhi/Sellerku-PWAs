import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/Home";
import CatalogPage from "@/pages/Catalog";
import ActivityPage from "@/pages/Activity";
import ActivityDetailPage from "@/pages/ActivityDetail";
import SettingsPage from "@/pages/Setting";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/activity" element={<ActivityPage />} />
      <Route path="/activity/:id" element={<ActivityDetailPage />} />
      <Route path="/setting" element={<SettingsPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
