import React, { useEffect, useState } from 'react'

const MyOrdersPage = () => {
  const [orders, setOrders] = useState("");

  useEffect(() => {
    //simulate fetching orders
    setTimeout(() => {
      const mockOrders = [
       {
        _id: "1234",
        createdAt: new Date(),
        ShippingAddress: {city:"Delhi", country: "India"},
        orderItems: [
         {
          name: "product1",
          image: "https://picsum.photos/500/500?random=1"
         },
        ],
        totalPrice: 100,
        isPaid: true,
       },
       {
        _id: "5678",
        createdAt: new Date(),
        ShippingAddress: {city:"Hyderabad", country: "India"},
        orderItems: [
         {
          name: "product2",
          image: "https://picsum.photos/500/500?random=2"
         },
        ],
        totalPrice: 50,
        isPaid: false,
       },
       {
        _id: "4321",
        createdAt: new Date(),
        ShippingAddress: {city:"Bilaspur", country: "India"},
        orderItems: [
         {
          name: "product3",
          image: "https://picsum.photos/500/500?random=3"
         },
        ],
        totalPrice: 200,
        isPaid: true,
       },
      ];

      setOrders(mockOrders)
    }, 1000);

  }, []);

  return (
    <div className='w-full'>
      <h2 className='text-xl sm:text-2xl font-bold mb-5'>My Orders</h2>
      <div className='relative shadow-md rounded-lg overflow-x-auto'>
        <table className='min-w-full text-left text-sm text-gray-500'>
         <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
          <tr>
            <th className='py-3 px-4'>Image</th>
            <th className='py-3 px-4'>Order ID</th>
            <th className='py-3 px-4'>Created</th>
            <th className='py-3 px-4'>Shipping Address</th>
            <th className='py-3 px-4'>Items</th>
            <th className='py-3 px-4'>Price</th>
            <th className='py-3 px-4'>Status</th>
          </tr>
         </thead>
         <tbody>
          {orders.length > 0 ?(
            orders.map((order) => (
              <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                <td className='py-3 px-4'>
                  <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className='w-12 h-12 object-cover rounded-lg' />
                </td>
                <td className='py-3 px-4 font-medium text-gray-900 whitespace-nowrap'>#{order._id}</td>
                <td className='py-3 px-4 whitespace-nowrap'>
                  {new Date(order.createdAt).toLocaleDateString()}{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </td>
                <td className='py-3 px-4 whitespace-nowrap'>
                  {order.ShippingAddress ? `${order.ShippingAddress.city}, ${order.ShippingAddress.country}` : "N/A"}
                </td>
                <td className='py-3 px-4'>
                 {order.orderItems.length}
                </td>
                <td className='py-3 px-4'>
                  ${order.totalPrice}
                </td>
                <td className='py-3 px-4'>
                  <span
                   className={`${
                     order.isPaid
                     ? "bg-green-100 text-green-700"
                     : "bg-red-100 text-red-700"
                   } px-2 py-1 rounded-full text-xs font-medium`}
                  >
                   {order.isPaid ? "Paid" : "Pending"}  
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>You have no orders</td>
            </tr>
          )}
         </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyOrdersPage
