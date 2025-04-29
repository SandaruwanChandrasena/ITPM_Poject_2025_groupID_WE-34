import { FC, useState } from "react";
import useCart from "../hooks/useCart";
import Skeletons from "../components/skeletons";
import { Button, Chip, Divider } from "@nextui-org/react";
import { calculateDiscount, formatPrice, parseError } from "../utils/helper";
import { FaMinus, FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import client from "../api/client";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Props {}

const Cart: FC<Props> = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const {
    id,
    pending,
    items,
    totalCount,
    fetching,
    subTotal,
    totalPrice,
    updateCart,
    clearCart,
  } = useCart();

  const handleCheckout = async () => {
    try {
      if (!profile) return navigate("/sign-up");
      setBusy(true);
      const { data } = await client.post("/checkout", { cartId: id });
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      parseError(error);
    } finally {
      setBusy(false);
    }
  };

  if (fetching) return <Skeletons.Cart />;

  if (!totalCount)
    return (
      <div className="p-5 lg:p-0">
        <h1 className="mb-6 text-xl font-semibold">Your Shopping Cart</h1>
        <div className="p-5 text-center">
          <h1 className="text-3xl font-semibold opacity-40">
            This Cart is Empty!
          </h1>
        </div>
      </div>
    );

  return (
    <div className="p-5 lg:p-0">
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-xl font-semibold">Your Shopping Cart</h1>
        <button onClick={clearCart} className="underline">
          Clear Cart
        </button>
      </div>
      <div className="space-y-6">
        {items.map(({ product, quantity }) => {
          return (
            <div key={product.id} className="flex">
              {/* Product Image */}

              <img
                src={product.cover}
                alt={product.title}
                className="w-28 h-[185px] object-cover rounded"
              />

              {/* Product Details */}
              <div className="flex flex-col grid-cols-6 md:grid">
                <div className="col-span-5 p-5">
                  <h1>{product.title}</h1>

                  <div className="flex space-x-2">
                    <Chip color="danger">
                      {calculateDiscount(product.price)}% Off
                    </Chip>
                    <h1 className="italic line-through">
                      {formatPrice(Number(product.price.mrp))}
                    </h1>
                  </div>

                  <div className="flex space-x-2">
                    <h1 className="font-bold">
                      {formatPrice(Number(product.price.sale))}
                    </h1>

                    <span>x {quantity}</span>
                  </div>
                </div>

                {/* Cart Control */}
                <div className="flex items-center col-span-1 p-5 space-x-3 md:p-0">
                  <Button
                    isIconOnly
                    variant="solid"
                    size="sm"
                    isLoading={pending || busy}
                    onClick={() => updateCart({ product, quantity: -1 })}
                  >
                    <FaMinus />
                  </Button>
                  <Chip radius="sm" variant="bordered">
                    {quantity}
                  </Chip>
                  <Button
                    isIconOnly
                    variant="solid"
                    size="sm"
                    isLoading={pending || busy}
                    onClick={() => updateCart({ product, quantity: 1 })}
                  >
                    <FaPlus />
                  </Button>
                  <Button
                    isIconOnly
                    variant="solid"
                    size="sm"
                    isLoading={pending || busy}
                    onClick={() => updateCart({ product, quantity: -quantity })}
                  >
                    <FaRegTrashCan />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Divider className="my-6" />

      <div className="flex items-end justify-between md:block">
        <div className="space-y-1 text-right">
          <h1 className="text-xl font-semibold">Cart Total</h1>
          <Divider />
          <p className="italic line-through">{formatPrice(subTotal)}</p>
          <p className="text-xl font-semibold">{formatPrice(totalPrice)}</p>
        </div>

        <div className="text-right md:mt-3">
          <Button
            color="danger"
            radius="sm"
            size="lg"
            isLoading={pending || busy}
            startContent={<MdOutlineShoppingCartCheckout size={18} />}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
          <div className="mt-3">
            <Chip size="sm">
              <p>
                You are saving total{" "}
                {calculateDiscount({
                  mrp: subTotal.toFixed(2),
                  sale: totalPrice.toFixed(2),
                })}
                %
              </p>
            </Chip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
