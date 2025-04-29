import { FC, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import client from "../api/client";
import { formatPrice, parseError } from "../utils/helper";
import { Divider } from "@nextui-org/react";
import Skeletons from "../components/skeletons";

interface Props {}

interface OrderItem {
  id: string;
  cover?: string;
  price: string;
  qty: number;
  slug: string;
  title: string;
  totalPrice: string;
}

interface Order {
  orders: OrderItem[];
  totalAmount: string;
}

const PaymentSuccess: FC<Props> = () => {
  const [busy, setBusy] = useState(true);
  const [order, setOrder] = useState<Order>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    const fetchOrderDetail = async () => {
      try {
        const { data } = await client.post("/order/success", { sessionId });
        setOrder(data);
      } catch (error) {
        parseError(error);
      } finally {
        setBusy(false);
      }
    };

    fetchOrderDetail();
  }, [sessionId]);

  if (busy) return <Skeletons.Payment />;

  return (
    <div className="p-5 lg:p-0">
      <h1 className="text-2xl font-semibold">
        Congrats Your Order is Successful.
      </h1>
      <div className="flex flex-col items-center p-5">
        {order?.orders.map((item) => {
          return (
            <div key={item.id} className="w-96">
              <div className="flex">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="object-cover h-40 rounded w-28"
                />

                <div className="flex-1 p-3">
                  <Link
                    className="text-lg font-bold underline line-clamp-1"
                    to={`/book/${item.slug}`}
                  >
                    {item.title}
                  </Link>

                  <p>Price: {formatPrice(Number(item.price))}</p>
                  <p>Qty: {item.qty}</p>
                </div>
              </div>

              <Divider className="my-3" />
            </div>
          );
        })}

        <div className="flex items-center justify-between w-96">
          <p className="font-bold">Total Amount:</p>
          <p className="font-bold">{formatPrice(Number(order?.totalAmount))}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
