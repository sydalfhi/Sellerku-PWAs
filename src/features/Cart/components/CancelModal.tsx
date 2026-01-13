import { Button } from "@/components/ui/button";

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelModal({ isOpen, onClose, onConfirm }: CancelModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-2xl z-10 animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-bold text-gray-900">Batalkan Transaksi?</h2>
        <p className="text-sm text-gray-600 mt-3">
          Semua barang di keranjang dan data transaksi akan dihapus.
        </p>
        <div className="flex gap-3 mt-6">
          <Button variant="ghost" className="flex-1" onClick={onClose}>
            Tidak
          </Button>
          <Button variant="destructive" className="flex-1 font-semibold" onClick={onConfirm}>
            Ya, Batalkan
          </Button>
        </div>
      </div>
    </div>
  );
}