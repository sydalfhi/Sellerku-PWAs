import React from "react";
import Tabbar from "@/components/fragments/Tabbar";
import ActivityBase from "./components/Base";

export default function ActivityFeature() {
  return (
    <div className="relative">
      <ActivityBase />
      <Tabbar />
    </div>
  );
}
