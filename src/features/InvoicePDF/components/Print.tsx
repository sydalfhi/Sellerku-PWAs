// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { Printer, Settings } from "lucide-react";
import { useActivityDetail } from "@/features/ActivityDetail/hooks/useActivity";
import { getStoredUserData } from "@/utils/getStoredUser";
import { useParams } from "react-router-dom";
import Error from "@/components/fragments/Error";
import Loading from "@/components/fragments/Loadin";

const ReceiptPrinter = () => {
  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [paperSize, setPaperSize] = useState("58mm");
  const [showSettings, setShowSettings] = useState(false);
  const receiptRef = useRef(null);

  const userData = getStoredUserData();
  const { outNo } = useParams();
  const email = userData?.email || "";

  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useActivityDetail({ email, outNo });

  useEffect(() => {
    detectPrinters();
  }, []);

  const detectPrinters = async () => {
    const defaultPrinters = [
      { id: "default", name: "Printer Default" },
      { id: "thermal-58mm", name: "Thermal Printer 58mm" },
      { id: "thermal-80mm", name: "Thermal Printer 80mm" },
    ];

    setPrinters(defaultPrinters);
    setSelectedPrinter(defaultPrinters[0].id);
  };

  if (isLoading) {
    return (
      <Loading fullScreen={true} message="Loading transaction details..." />
    );
  }

  if (isError) {
    const statusCode = error?.response?.status;
    return <Error statusCode={statusCode} fullScreen={true} />;
  }

  // Helper function untuk format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Akses data dengan optional chaining
  const receiptData = transactions;
  const storeName = userData?.buss_name;
  const storeBranch = userData?.store_name;
  const storeAddress = userData?.store_address;
  const cashierName = userData?.emp_name;

  const handlePrint = () => {
    if (!selectedPrinter) {
      alert("Silakan pilih printer terlebih dahulu!");
      return;
    }

    if (!receiptData) {
      alert("Data struk tidak tersedia!");
      return;
    }

    const printWindow = window.open("", "_blank");
    const receiptContent = receiptRef.current.innerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Struk</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Courier New', monospace;
              font-size: 12px;
              line-height: 1.4;
            }
            
            @page {
              size: ${paperSize === "58mm" ? "58mm" : "80mm"} auto;
              margin: 0;
            }
            
            .receipt {
              width: ${paperSize === "58mm" ? "58mm" : "80mm"};
              padding: 10px;
              background: white;
            }
            
            .text-center {
              text-align: center;
            }
            
            .text-right {
              text-align: right;
            }
            
            .font-bold {
              font-weight: bold;
            }
            
            .text-xl {
              font-size: 16px;
            }
            
            .text-lg {
              font-size: 14px;
            }
            
            .text-sm {
              font-size: 11px;
            }
            
            .text-xs {
              font-size: 10px;
            }
            
            .border-t {
              border-top: 1px dashed #000;
              margin: ${paperSize === "58mm" ? "4px 0" : "8px 0"};
            }
            
            .border-b {
              border-bottom: 1px dashed #000;
              margin: ${paperSize === "58mm" ? "4px 0" : "8px 0"};
            }
            
            .my-1 {
              margin: ${paperSize === "58mm" ? "2px 0" : "4px 0"};
            }
            
            .my-2 {
              margin: ${paperSize === "58mm" ? "4px 0" : "8px 0"};
            }
            
            .flex {
              display: flex;
            }
            
            .justify-between {
              justify-content: space-between;
            }
            
            .w-full {
              width: 100%;
            }
          </style>
        </head>
        <body>
          ${receiptContent}
        </body>
      </html>
    `);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleDirectPrint = async () => {
    if (!receiptData) {
      alert("Data struk tidak tersedia!");
      return;
    }

    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      const writer = port.writable.getWriter();
      const encoder = new TextEncoder();
      const ESC = "\x1B";
      const GS = "\x1D";

      // Initialize printer
      await writer.write(encoder.encode(ESC + "@"));
      await writer.write(encoder.encode(GS + "!" + "\x00"));
      await writer.write(encoder.encode(ESC + "a" + "1"));

      // Store name
      await writer.write(encoder.encode(ESC + "E" + "1"));
      await writer.write(encoder.encode(storeName + "\n"));
      await writer.write(encoder.encode(ESC + "E" + "0"));

      await writer.write(encoder.encode(storeBranch + "\n"));
      await writer.write(encoder.encode(storeAddress + "\n"));
      await writer.write(encoder.encode("--------------------------------\n"));

      // Receipt info
      await writer.write(encoder.encode(ESC + "a" + "0"));
      await writer.write(encoder.encode(`No: ${receiptData?.out_no || ""}\n`));
      await writer.write(
        encoder.encode(`${formatDate(receiptData?.out_date)}\n\n`)
      );
      await writer.write(encoder.encode(`Kasir: ${cashierName}\n`));
      await writer.write(
        encoder.encode(`Pelanggan: ${receiptData?.cust_name || ""}\n`)
      );
      await writer.write(encoder.encode("--------------------------------\n"));

      // Items
      const details = receiptData?.details || [];
      for (const item of details) {
        await writer.write(encoder.encode(`${item?.mtrl_name || ""}\n`));

        const qty = parseFloat(item?.qty || 0);
        const price = parseFloat(item?.sell_price || 0);
        const qtyPrice = `${qty} x @ Rp ${price.toLocaleString("id-ID")}`;
        await writer.write(encoder.encode(qtyPrice + "\n"));

        const subtotal = parseFloat(item?.subtotal || 0);
        await writer.write(encoder.encode(" ".repeat(20) + "Rp "));
        await writer.write(encoder.encode(ESC + "!" + "\x01"));
        await writer.write(
          encoder.encode(subtotal.toLocaleString("id-ID") + "\n")
        );
        await writer.write(encoder.encode(ESC + "!" + "\x00"));
      }

      await writer.write(encoder.encode("--------------------------------\n"));

      // Totals
      const discountTotal = parseFloat(receiptData?.discount_total || 0);
      await writer.write(
        encoder.encode(`Diskon Transaksi${" ".repeat(10)}Rp `)
      );
      await writer.write(encoder.encode(ESC + "!" + "\x01"));
      await writer.write(
        encoder.encode(discountTotal.toLocaleString("id-ID") + "\n")
      );
      await writer.write(encoder.encode(ESC + "!" + "\x00"));

      const totalPrice = parseFloat(receiptData?.total_price || 0);
      await writer.write(encoder.encode(`Sub Total${" ".repeat(15)}Rp `));
      await writer.write(encoder.encode(ESC + "!" + "\x01"));
      await writer.write(
        encoder.encode(totalPrice.toLocaleString("id-ID") + "\n")
      );
      await writer.write(encoder.encode(ESC + "!" + "\x00"));

      const totalBayar = parseFloat(receiptData?.totalbayar || 0);
      await writer.write(encoder.encode(ESC + "E" + "1"));
      await writer.write(encoder.encode(`Tunai${" ".repeat(18)}Rp `));
      await writer.write(encoder.encode(ESC + "!" + "\x01"));
      await writer.write(
        encoder.encode(totalBayar.toLocaleString("id-ID") + "\n")
      );
      await writer.write(encoder.encode(ESC + "!" + "\x00"));
      await writer.write(encoder.encode(ESC + "E" + "0"));

      const kembalian = parseFloat(receiptData?.kembalian || 0);
      await writer.write(encoder.encode(`Kembali${" ".repeat(17)}Rp `));
      await writer.write(encoder.encode(ESC + "!" + "\x01"));
      await writer.write(
        encoder.encode(kembalian.toLocaleString("id-ID") + "\n\n")
      );
      await writer.write(encoder.encode(ESC + "!" + "\x00"));

      // Footer
      await writer.write(encoder.encode(ESC + "a" + "1"));
      await writer.write(
        encoder.encode("Terima Kasih Atas Kunjungan Anda\n\n")
      );
      await writer.write(encoder.encode("\n\n"));
      await writer.write(encoder.encode(GS + "V" + "1"));

      writer.releaseLock();
      await port.close();

      alert("Struk berhasil dicetak!");
    } catch (error) {
      console.error("Print error:", error);
      handlePrint();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Sistem Print Struk
            </h1>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <Settings size={20} color="white" />
              Pengaturan
            </button>
          </div>

          {showSettings && (
            <div className="border-t pt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Printer
                </label>
                <select
                  value={selectedPrinter}
                  onChange={(e) => setSelectedPrinter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {printers?.map((printer) => (
                    <option key={printer?.id} value={printer?.id}>
                      {printer?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ukuran Kertas
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="58mm"
                      checked={paperSize === "58mm"}
                      onChange={(e) => setPaperSize(e.target.value)}
                      className="mr-2"
                    />
                    58mm (Kecil)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="80mm"
                      checked={paperSize === "80mm"}
                      onChange={(e) => setPaperSize(e.target.value)}
                      className="mr-2"
                    />
                    80mm (Standar)
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              <Printer size={20} />
              Print Struk (Browser)
            </button>

            <button
              onClick={handleDirectPrint}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              <Printer size={20} />
              Print Langsung (Thermal)
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            * Print Langsung memerlukan koneksi USB ke thermal printer dan
            browser yang mendukung Web Serial API
          </p>
        </div>

        {/* Receipt Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Preview Struk
          </h2>

          <div className="flex justify-center">
            <div
              ref={receiptRef}
              className="receipt bg-white border-2 border-gray-300"
              style={{
                width: paperSize === "58mm" ? "58mm" : "80mm",
                fontFamily: "'Courier New', monospace",
                fontSize: "12px",
                padding: "10px",
              }}
            >
              {/* Header */}
              <div className="text-center">
                <div className="font-bold text-xl">{storeName}</div>
                <div className="text-lg">{storeBranch}</div>
                <div className="text-sm">{storeAddress}</div>
              </div>

              <div className="border-t my-2"></div>

              {/* Receipt Info */}
              <div className="text-sm">
                <div>No: {receiptData?.out_no || ""}</div>
                <div>{formatDate(receiptData?.out_date)}</div>
              </div>

              <div className="border-b my-2"></div>

              {/* Customer Info */}
              <div className="flex justify-between text-sm my-1">
                <span>Kasir</span>
                <span>{cashierName}</span>
              </div>
              <div className="flex justify-between text-sm my-1">
                <span>Pelanggan</span>
                <span>{receiptData?.cust_name || ""}</span>
              </div>

              <div className="border-b my-2"></div>

              {/* Items */}
              {receiptData?.details?.map((item, index) => (
                <div key={index} className="my-2">
                  <div className="flex justify-between">
                    <span className="font-bold">{item?.mtrl_name || ""}</span>
                    <span>
                      Rp{" "}
                      {parseFloat(item?.subtotal || 0).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="text-xs">
                    {item?.qty || 0} x @ Rp{" "}
                    {parseFloat(item?.sell_price || 0).toLocaleString("id-ID")}
                  </div>
                </div>
              ))}

              <div className="border-t my-2"></div>

              {/* Totals */}
              <div className="text-sm">
                <div className="flex justify-between my-1">
                  <span style={{ fontStyle: "italic" }}>Diskon Transaksi</span>
                  <span>
                    Rp{" "}
                    {parseFloat(
                      receiptData?.discount_total || 0
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between my-1">
                  <span>Sub Total</span>
                  <span>
                    Rp{" "}
                    {parseFloat(receiptData?.total_price || 0).toLocaleString(
                      "id-ID"
                    )}
                  </span>
                </div>
                <div className="flex justify-between my-1 font-bold">
                  <span>Tunai</span>
                  <span>
                    Rp{" "}
                    {parseFloat(receiptData?.totalbayar || 0).toLocaleString(
                      "id-ID"
                    )}
                  </span>
                </div>
                <div className="flex justify-between my-1">
                  <span>Kembali</span>
                  <span>
                    Rp{" "}
                    {parseFloat(receiptData?.kembalian || 0).toLocaleString(
                      "id-ID"
                    )}
                  </span>
                </div>
              </div>

              <div className="border-t my-2"></div>

              {/* Footer */}
              <div className="text-center text-sm">
                <div>Terima Kasih Atas Kunjungan Anda</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPrinter;
