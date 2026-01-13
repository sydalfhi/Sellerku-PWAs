// CartPage.tsx
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useTransactionStore } from "../store/transactionStore";
import { useState } from "react";
import type { CartItem } from "@/types/cart.type";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import CancelModal from "./CancelModal";


export default function CartBase() {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [cart, updateQty, removeFromCart, clearTransaction ,updateDiscount ] = useTransactionStore(
    useShallow((state) => [
      state.cart,
      state.updateQty,
      state.removeFromCart,
      state.clearTransaction,
      state.updateDiscount,
    ])
  );


  const typedCart = cart as unknown as CartItem[];

  const increaseQty = (item: CartItem) => {
    if (item.qty < Number(item.stock)) {
      updateQty(item.mtrl_code, item.qty + 1);
    }
  };

  const decreaseQty = (item: CartItem) => {
    if (item.qty > 1) {
      updateQty(item.mtrl_code, item.qty - 1);
    } else {
      removeFromCart(item.mtrl_code);
    }
  };

  const handleCancelTransaction = () => {
    clearTransaction();
    setShowCancelModal(false);
    navigate("/home", { replace: true });
  };

  if (typedCart.length === 0) {
    return (
      <div className="min-h-screen bg-[#fefeff] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-500 text-lg">Keranjang kosong</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefeff] pb-2 relative">
      <CartItemList
        cart={typedCart}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onUpdateDiscount={updateDiscount}
      />

      <CartSummary onCancel={() => setShowCancelModal(true)} />

      <CancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelTransaction}
      />
    </div>
  );
}

