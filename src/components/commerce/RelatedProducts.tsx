import { getPayload } from 'payload'
import config from '../../payload.config'
import { Media } from '@/payload-types';

import Link from "next/link";
import Image from "next/image";
import AddToCart from '../microComponents/ecom/AddToCart';

const ProductCard = ({ id, image, name, ingredients, price } : { id: number, image: Media | number | null | undefined, name: string, ingredients: string, price: number }) => {
    const formattedPrice = price.toFixed(2);

    const imageURL = image as Media;

    return (
        <Link href={`/shop/${id}`} className="flex flex-col gap-5 px-0 py-5 md:p-5 lg:p-7 group hover:shadow-lg transition-shadow">
            <div className="overflow-hidden aspect-[4/3]">
                <Image 
                    src={imageURL?.url as string}
                    alt={name} 
                    className="hover:scale-110 transition-transform duration-300 aspect-[4/3] object-cover w-full h-full" 
                    width={500} 
                    height={500} 
                />
            </div>

            <div className="flex flex-col items-center overflow-hidden text-center">
                <h1 className="font-heading text-2xl lg:text-3xl font-light tracking-[-1px]">{name}</h1>
                <span className="font-light text-sm lg:text-base opacity-70 mt-2 mb-4">{ingredients}</span>
                <span className="text-xl font-light font-heading mb-3">${formattedPrice}</span>

                <AddToCart 
                    productId={id} 
                    productName={name}
                    productPrice={price}
                    productImage={imageURL?.url as string}
                    hasQuantity={false}
                />
            </div>
        </Link>
    );
};

export default async function RelatedProducts() {
    const payload = await getPayload({ config })
    const allSushiProducts = await payload.find({
        collection: 'products',
        where: { 'category.name': { equals: 'Sushi' } },
    });
    const shuffled = allSushiProducts.docs.sort(() => 0.5 - Math.random());
    const products = { ...allSushiProducts, docs: shuffled.slice(0, 3) };

    return (
        <div className="container mx-auto px-5 pb-16 lg:pb-32 flex flex-col items-center gap-5">
            <h2 className="font-heading text-4xl font-light">Related Products</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {products.docs.map((product) => (
                    <ProductCard 
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        ingredients={product.ingredients as string}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
}
