import BarcodeScanner from "react-qr-barcode-scanner";
import { Result } from "@zxing/library";

export default function BarcodeScanBase() {
  const handleUpdate = (err: unknown, result?: Result) => {
    if (err) {
      console.error(err);
      return;
    }

    if (result) {
      // Accessing the scanned text depends on the library version
      // For some versions, Result has a getText() method
      const scannedText = (result as any).text ?? (result as any).getText?.();
      if (scannedText) {
        alert(`Barcode: ${scannedText}`);
      }
    }
  };

  return (
    <div className="relative w-full h-screen">
      <BarcodeScanner width="100%" height="100%" onUpdate={handleUpdate} />

      {/* Indikator frame scan */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 border-4 border-white rounded-lg">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-red-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-red-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-red-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-red-500"></div>
        </div>
      </div>
    </div>
  );
}
