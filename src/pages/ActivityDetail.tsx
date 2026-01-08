import ActivityDetailFeature from "@/features/ActivityDetail";
import { useParams } from "react-router-dom";

export default function ActivityDetailPage() {
  const { id } = useParams();
  console.log(typeof id);

  return (
    <main className="md:w-[80vw] lg:w-[70vw] mx-auto ">
      <ActivityDetailFeature id={id} />
    </main>
  );
}
