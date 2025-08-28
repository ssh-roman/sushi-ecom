'use client'

import { useState } from "react";
import { useCart } from "@/contexts/CartContext"; // Adjust path as needed
import { toast } from "react-hot-toast"; // Optional: for notifications

interface AddToCartProps {
    productId: number;
    productName: string;
    productPrice: number;
    productImage?: string;
    hasQuantity: boolean;
}

const AddToCart = ({ productId, productName, productPrice, productImage, hasQuantity }: AddToCartProps) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const { addItem } = useCart();

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            setIsAdding(true);
            
            // Add to cart context (which will automatically save to localStorage)
            addItem({
                productId,
                name: productName,
                price: productPrice,
                image: productImage
            }, quantity);

            // Optional: Show success message
            toast.success(`Added ${quantity} ${productName}(s) to cart!`);
            // alert(`Added ${quantity} ${productName}(s) to cart!`);
            
            // Reset quantity after adding
            setQuantity(1);
        } catch (error) {
            console.error('Error adding to cart:', error);
            // toast.error('Failed to add item to cart');
            alert('Failed to add item to cart');
        } finally {
            setIsAdding(false);
        }
    }

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        setQuantity(newQuantity);
    }

    return (
        <div className='flex gap-5'>
            {hasQuantity &&
                <div className='flex items-center gap-3 lg:gap-6 bg-white p-2.5'>
                    <button 
                        onClick={() => handleQuantityChange(quantity - 1)} 
                        className='bg-gray-200 text-black py-1 px-3 rounded-full font-heading cursor-pointer hover:bg-gray-300 transition-colors'
                        disabled={quantity <= 1}
                    >
                        −
                    </button>
                    <span className='text-sm min-w-[20px] text-center'>{quantity}</span>
                    <button 
                        onClick={() => handleQuantityChange(quantity + 1)} 
                        className='bg-gray-200 text-black py-1 px-3 rounded-full font-heading cursor-pointer hover:bg-gray-300 transition-colors'
                    >
                        +
                    </button>
                </div>
            }
            <button 
                onClick={handleAddToCart} 
                disabled={isAdding}
                className="text-white bg-[#e94222] px-10 py-3 group hover:bg-[#4C4C4C] font-heading transition-all duration-300 cursor-pointer font-light text-base lg:text-lg italic flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isAdding ? 'Adding...' : 'add to cart'}
            </button>
        </div>
    )
}

export default AddToCart;