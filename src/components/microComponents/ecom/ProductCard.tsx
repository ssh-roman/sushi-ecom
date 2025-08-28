import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/microComponents/ecom/AddToCart";

interface ProductCardProps {
    id: number;
    image: string;
    name: string;
    ingredients: string;
    price: number;
}

const ProductCard = ({ id, image, name, ingredients, price }: ProductCardProps) => {
    const formattedPrice = price.toFixed(2);

    return (
        <Link href={`/shop/${id}`} className="flex flex-col gap-5 px-0 py-5 md:p-5 lg:p-7 group hover:shadow-lg transition-shadow">
            <div className="overflow-hidden aspect-[4/3]">
                <Image 
                    src={image} 
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
                    productImage={image}
                    hasQuantity={false}
                />
            </div>
        </Link>
    );
};

export default ProductCard;