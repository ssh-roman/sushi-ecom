import { getPayload } from 'payload'
import config from '../../../../payload.config'

import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import StorePageClient from './StorePageClient';

interface Product {
    id: number;
    name: string;
    description: string;
    weight: string;
    ingredients: string;
    price: number;
    category: {
        id: number;
        name: string;
    };
    image: {
        url: string;
    };
    stock: number;
    isPopular: boolean;
}

interface Category {
    id: number;
    name: string;
}

// Server Component - handles data fetching
async function StorePage() {
    const payload = await getPayload({ config });

    // Fetch products and categories
    const [productsResponse, categoriesResponse] = await Promise.all([
        payload.find({
            collection: 'products',
            depth: 2,
        }),
        payload.find({
            collection: 'categories',
            depth: 1,
        })
    ]);

    const products = productsResponse.docs as Product[];
    const categories = categoriesResponse.docs as Category[];
    const productCountByCategory = categories.reduce((acc, category) => {
        acc[category.id] = products.filter(product => product.category.id === category.id).length;
        return acc;
    }, {} as Record<number, number>);

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <Header page="Shop" />
            
            <StorePageClient 
                products={products} 
                categories={categories}
                productCountByCategory={productCountByCategory}
            />
        </div>
    );
}

export default StorePage;
export type { Product, Category };