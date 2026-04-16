"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Package } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setLoading(false);
      return;
    }
    
    fetch(`/api/orders?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setOrders(data);
      })
      .finally(() => setLoading(false));
  }, [isLoaded, user]);

  if (loading) return <div className="p-8 text-center bg-white min-h-[500px]">Loading orders...</div>;

  return (
    <div className="max-w-[1000px] mx-auto mt-4 px-2">
      <div className="bg-white shadow-sm font-medium text-[16px] px-6 py-4 flex items-center gap-2 mb-4">
        <Package className="text-fk-blue" />
        My Orders
      </div>

      {(!user) ? (
        <div className="bg-white p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myorders-empty_3b1b61.png" className="w-48 mb-4" alt="auth required"/>
          <h2 className="text-lg font-medium mb-2">Login Required</h2>
          <p className="text-gray-500 mb-6">Please login to view your order history.</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myorders-empty_3b1b61.png" className="w-48 mb-4" alt="no orders"/>
          <h2 className="text-lg font-medium mb-2">No orders found</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't placed an order yet.</p>
          <Link href="/" className="bg-[#2874f0] font-medium text-white px-10 py-2.5 rounded-sm shadow-sm inline-block">Start Shopping</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 shadow-sm flex flex-col md:flex-row justify-between hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-medium text-[#212121]">Order ID:</span>
                  <span className="text-gray-600">OD{new Date(order.created_at).getTime().toString().slice(0, 4)}FLIP{order.id}</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-medium text-[#212121]">Total Amount:</span>
                  <span className="text-[16px] font-medium text-green-600">₹{Number(order.total_amount).toLocaleString('en-IN')}</span>
                </div>
                <div className="text-[14px] text-gray-500 max-w-[400px] line-clamp-2">
                  <span className="font-medium mr-2">Delivering to:</span>
                  {order.shipping_address}
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col justify-center items-start md:items-end w-48">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-[15px] text-[#212121]">{order.status || 'Delivered'}</span>
                </div>
                <div className="text-[13px] text-gray-500">
                  On {new Date(order.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
