import React from "react";
import ActivityDetailBase from "./components/Base";

export default function ActivityDetailFeature({
  id,
}: {
  id: string | undefined;
}) {
  return (
    <div className="relative">
      <ActivityDetailBase outNo={id} />
    </div>
  );
}
