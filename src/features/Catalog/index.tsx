import React from "react";
import CatalogBase from "./components/Base";
import Tabbar from "@/components/fragments/Tabbar";

export default function CatalogFeature() {
  return (
    <div className="relative">
      <CatalogBase />
      <Tabbar />
    </div>
  );
}
