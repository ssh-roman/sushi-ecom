import { getPayload } from 'payload'
import config from '../../../../../payload.config'
import { Media } from '@/payload-types';
import Image from 'next/image';
import Link from 'next/link';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AddToCart from '@/components/microComponents/ecom/AddToCart';
import RelatedProducts from '@/components/commerce/RelatedProducts';

async function ProductDetails({
        params,
    }: {
        params: Promise<{ id: string; locale: string }>
    }) {

    const { id, locale } = await params
    const payload = await getPayload({ config })

    const response = await payload.find({
        collection: 'products',
        where: {
          id: {
            equals: id,
          },
        },
        depth: 1,
      })

    const product = response.docs[0];
    const category = product.category as { name: string };
    const image = product.image as Media;

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />

            <Header page={response.docs[0].name} />

            <div className='container mx-auto px-5 pt-16 pb-7 lg:py-16 lg:pt-32 flex flex-col lg:flex-row gap-10'>
                <div className='w-full'>
                    <Image src={image!.url as string} alt={product.name} className='object-cover aspect-[4/3]' width={700} height={500} quality={100}/>
                </div>
                <div className='w-full flex flex-col gap-4'>
                    {/* Add 5 yellow stars */}
                    <div className='flex gap-1'>
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className='w-4 h-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                                <path d='M10 15l-5.878 3.09 1.121-6.535L0 6.545l6.545-.954L10 0l2.455 5.591L20 6.545l-5.243 4.005 1.121 6.535z' />
                            </svg>
                        ))}
                    </div>
                    <h1 className='font-heading text-4xl lg:text-6xl font-light'>{product.name}</h1>
                    <p className='font-heading text-2xl font-light lg:my-2'>${product.price}.00</p>
                    <p className='font-light text-sm lg:text-base opacity-70 lg:my-3'>{product.ingredients}</p>

                    <AddToCart 
                        productId={product.id} 
                        productName={product.name}
                        productPrice={product.price}
                        productImage={image?.url as string}
                        hasQuantity={true}
                    />

                    <p className='my-3 opacity-70'> <b>Category:</b> {category.name}</p>
                    
                    <div className='flex flex-col lg:flex-row gap-5 lg:gap-10 lg:mt-5'>
                        <div className='hidden lg:block h-full w-px bg-black/20'></div>

                        <div className='flex flex-col gap-2'>
                            <h2 className='font-heading text-2xl font-light'>Shipping</h2>
                            <div>
                                <p className='font-light text-sm lg:text-base opacity-70'>USA: Free Shipping (purchasing over $10)</p>
                                <p className='font-light text-sm lg:text-base opacity-70'>Other countries: $14 – $25</p>
                            </div>
                        </div>

                        <div className='hidden lg:block h-full w-px bg-black/20'></div>

                        <div className='flex flex-col gap-2'>
                            <h2 className='font-heading text-2xl font-light'>Payment</h2>
                            <div>
                                <p className='font-light text-sm lg:text-base opacity-70'>Card/Cash on Delivery</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className='container mx-auto px-5 pb-16 lg:pb-32'>
                <h2 className='font-heading text-2xl font-light'>Description</h2>
                <p className='font-light text-sm lg:text-base opacity-90 my-3'>{product.description}</p>
            </div>

            <RelatedProducts />

            <Footer />
        </div>
    );
}

export default ProductDetails;