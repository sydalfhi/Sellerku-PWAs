import { useParams } from "react-router-dom";
import InvoicePDFBase from "./components/Base";

export default function InvoicePDFPage() {
  const { outNo } = useParams<{ outNo: string }>();
  return <InvoicePDFBase outNo={outNo} />;
}
