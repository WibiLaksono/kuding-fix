"use client";

import { useEffect, useState } from "react";
import Hero from "./components/hero";
import Catalog from "./components/catalog";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen text-black">
      <Hero/>
      <Catalog/>
    </div>
  );
}

// <main className="p-6 bg-gray-100 min-h-screen text-black">
//   <h1 className="text-3xl font-bold text-center mb-6 ">Database WRPL</h1>

//   {/* Table Users */}
//   <section className="mb-10">
//     <h2 className="text-2xl font-semibold mb-4">Users</h2>
//     <div className="overflow-y-auto bg-white shadow-md rounded-lg p-4 max-h-96">
//       <table className="w-full border-collapse border border-gray-200">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="border p-2 ">ID</th>
//             <th className="border p-2 ">Username</th>
//             <th className="border p-2 ">Email</th>
//             <th className="border p-2 ">Role</th>
//             <th className="border p-2 ">Join Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.slice(0, 20).map((user) => (
//             <tr key={user.id} className="hover:bg-gray-100 ">
//               <td className="border p-2 text-center">{user.id}</td>
//               <td className="border p-2">{user.username}</td>
//               <td className="border p-2">{user.email}</td>
//               <td className="border p-2 text-center">{user.role}</td>
//               <td className="border p-2 text-center">{user.join_date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </section>

  // {/* Table Listings */}
  // <section className="mb-10">
  //   <h2 className="text-2xl font-semibold mb-4">Listings</h2>
  //   <div className="overflow-y-auto bg-white shadow-md rounded-lg p-4 max-h-96">
  //     <table className="w-full border-collapse border border-gray-200">
  //       <thead className="bg-gray-200">
  //         <tr>
  //           <th className="border p-2">ID</th>
  //           <th className="border p-2">Title</th>
  //           <th className="border p-2">Description</th>
  //           <th className="border p-2">Price</th>
  //           <th className="border p-2">Condition</th>
  //           <th className="border p-2">Status</th>
  //           <th className="border p-2">Owner</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {listings.slice(0, 20).map((listing) => (
  //           <tr key={listing.id} className="hover:bg-gray-100">
  //             <td className="border p-2 text-center">{listing.id}</td>
  //             <td className="border p-2">{listing.title}</td>
  //             <td className="border p-2">{listing.description}</td>
  //             <td className="border p-2 text-center">{listing.price}</td>
  //             <td className="border p-2 text-center">{listing.condition}</td>
  //             <td className="border p-2 text-center">{listing.status}</td>
  //             <td className="border p-2">{listing.User?.username}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // </section>

//   {/* Table Transactions */}
//   <section>
//     <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
//     <div className="overflow-y-auto bg-white shadow-md rounded-lg p-4 max-h-96">
//       <table className="w-full border-collapse border border-gray-200">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Buyer</th>
//             <th className="border p-2">Seller</th>
//             <th className="border p-2">Listing</th>
//             <th className="border p-2">Total</th>
//             <th className="border p-2">Payment Status</th>
//             <th className="border p-2">Shipping Status</th>
//             <th className="border p-2">Transaction Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.slice(0, 20).map((transaction) => (
//             <tr key={transaction.id} className="hover:bg-gray-100">
//               <td className="border p-2 text-center">{transaction.id}</td>
//               <td className="border p-2">{transaction.Buyer?.username}</td>
//               <td className="border p-2">{transaction.Seller?.username}</td>
//               <td className="border p-2">{transaction.Listing?.title}</td>
//               <td className="border p-2 text-center">{transaction.total_amount}</td>
//               <td className="border p-2 text-center">{transaction.payment_status}</td>
//               <td className="border p-2 text-center">{transaction.shipping_status}</td>
//               <td className="border p-2 text-center">{transaction.transaction_date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </section>
// </main>