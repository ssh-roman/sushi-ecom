import Image from "next/image"
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { getPayload } from 'payload'
import config from '../../payload.config'

const ProductCard = ({ id, image, title, description, weight, price } : { id: number, image: string, title: string, description: string, weight: string, price: number }) => {
    const formattedPrice = price.toFixed(2);

    return (
        <Link href={`/shop/${id}`} className="flex flex-col gap-5 px-0 py-5 md:p-5 lg:p-7 group hover:shadow-lg transition-shadow">
            <div className="overflow-hidden aspect-[4/3]">
                <Image 
                    src={image} 
                    alt={title} 
                    className="hover:scale-110 transition-transform duration-300 aspect-[4/3] object-cover w-full h-full" 
                    width={500} 
                    height={500} 
                />
            </div>

            <div className="flex flex-col overflow-hidden">
                <span className="text-[#e94222] font-bold">{weight}g</span>
                <h1 className="font-heading text-2xl lg:text-3xl font-light tracking-[-1px]">{title}</h1>
                <span className="font-light text-sm lg:text-base opacity-70 mt-2 mb-4">{description}</span>
                <div className="flex justify-between items-center w-full font-heading">
                    <span className="text-xl lg:text-2xl font-light">${formattedPrice}</span>
                    <button className="text-[#e94222] group hover:text-[#4C4C4C] hover:translate-x-4 transition-all cursor-pointer font-light text-lg lg:text-xl italic flex items-center">
                        shop now
                        <ShoppingCart className="transition-all ml-2" width={16} height={16} fill="#e94222" />
                    </button>
                </div>
            </div>
        </Link>
    );
};

async function PopularProducts() {
    const payload = await getPayload({ config })
    const products = await payload.find({ collection: 'products', where: { isPopular: { equals: true } }, limit: 6 });

    return (
        <div className="container mx-auto flex flex-col items-center gap-6 py-26 px-5 text-[#0f1a1a]">
            <div className="flex flex-col items-center text-center">
                <span className="text-xl text-[#e94222]">最佳选择</span>
                <h2 className="font-heading font-light text-4xl md:text-5xl lg:text-7xl tracking-[-1px]">Popular Sushi Rolls</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {products.docs.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.image?.url}
                        title={product.name}
                        description={product.ingredients}
                        weight={product.weight}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
}

export default PopularProducts;