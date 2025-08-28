'use client'

import { useCart } from '@/contexts/CartContext';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CartPage() {
  const {
    items: cartItems,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice
  } = useCart();

  console.log(cartItems)


  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      <Header page="Cart" />

      <div className="container mx-auto py-14 lg:py-28 px-5">
        {/* Cart Items Table */}
        <Table className="w-full border-collapse">
          <Thead>
            <Tr className="bg-[#0f1a1a] text-white uppercase">
              <Th className="text-left p-4 w-16"></Th>
              <Th className="text-left p-4 w-24"></Th>
              <Th className="text-left p-4 font-medium">Product</Th>
              <Th className="text-left p-4 font-medium">Price</Th>
              <Th className="text-left p-4 font-medium">Quantity</Th>
              <Th className="text-left p-4 font-medium">Subtotal</Th>
            </Tr>
          </Thead>
          {cartItems.length === 0 && (
            <Tbody>
              <Tr>
                <Td colSpan={6} className="py-5 text-center text-[#0f1a1a]">
                  Your cart is empty
                </Td>
              </Tr>
            </Tbody>
          )}
          <Tbody>
            {cartItems.map(item => (
              <Tr key={item.productId} className="border-b border-black/5 text-[#0f1a1a]">
                {/* Remove Button */}
                <Td className="py-5 px-4 text-center flex justify-end lg:justify-center !pl-[90%] ">
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-400 hover:text-red-700 text-xl w-8 h-8 flex items-center justify-center rounded hover:bg-red-50"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    ×
                  </button>
                </Td>

                {/* Product Image */}
                <Td className="p-3 !hidden lg:!table-cell">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={70}
                      height={60}
                      className="object-cover rounded"
                    />
                  )}
                </Td>

                {/* Product Name */}
                <Td className="p-4 py-9">
                  <h3 className="font-semibold">{item.name}</h3>
                </Td>

                {/* Product Price */}
                <Td className="p-4">
                  <span className="font-light ">${item.price.toFixed(2)}</span>
                </Td>

                {/* Quantity Controls */}
                <Td className="p-4">
                  <div className='flex items-center gap-3 lg:gap-4 bg-white p-2.5 w-fit'>
                    <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)} 
                        className='bg-gray-200 text-black py-1 px-3 rounded-full font-heading cursor-pointer hover:bg-gray-300 transition-colors'
                        disabled={item.quantity <= 1}
                    >
                        −
                    </button>
                    <span className='text-sm min-w-[20px] text-center'>{item.quantity}</span>
                    <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)} 
                        className='bg-gray-200 text-black py-1 px-3 rounded-full font-heading cursor-pointer hover:bg-gray-300 transition-colors'
                    >
                        +
                    </button>
                </div>
                </Td>

                {/* Subtotal */}
                <Td className="p-4">
                  <span className="font-light">${(item.price * item.quantity).toFixed(2)}</span>
                </Td>
              </Tr>
            ))}

            {/* Actions Row */}
            {/* Actions Row */}
            <Tr>
              <Td colSpan={6} className="p-4 text-right">
              <button
                onClick={clearCart}
                className="py-2 font-heading uppercase font-light text-xl text-[#0f1a1a]"
              >
                Clear Cart
              </button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        
        <div className='w-full lg:w-fit ml-auto flex flex-col gap-6'>
          <table>
            <tbody>
              <tr className='border-b border-black/5 text-[#0f1a1a]'>
                <td className='font-medium p-6 px-10 lg:text-right'>Subtotal</td>
                <td className='p-5 px-10 lg:text-right font-light pe-0'>${totalPrice.toFixed(2)}</td>
              </tr>
              <tr className='border-b border-black/5 text-[#0f1a1a]'>
                <td className='font-medium p-6 px-10 lg:text-right'>Total</td>
                <td className='p-5 px-10 lg:text-right font-light pe-0'>${totalPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <button disabled={cartItems.length === 0} className='text-white bg-[#e94222] px-12 py-5 group hover:bg-[#0f1a1a] transition-all duration-300 cursor-pointer font-heading font-light text-base lg:text-xl italic flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'>
            proceed to checkout
          </button>
        </div>
      </div>


      <Footer />
    </div>
  );
}