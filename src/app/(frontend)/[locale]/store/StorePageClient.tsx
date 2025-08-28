'use client'

import { useState, useEffect } from 'react';
import type { Product, Category } from './page';
import ProductCard from '@/components/microComponents/ecom/ProductCard';

interface FilterProps {
    isOpen: boolean;
    onClose: () => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    priceRange: [number, number];
    onPriceChange: (range: [number, number]) => void;
    maxPrice: number;
    categories: Category[];
    productCountByCategory: Record<number, number>;
}

const Filter = ({ 
    isOpen, 
    onClose, 
    searchTerm, 
    onSearchChange, 
    selectedCategory, 
    onCategoryChange, 
    priceRange, 
    onPriceChange, 
    maxPrice,
    categories,
    productCountByCategory
}: FilterProps) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
            
            {/* Filter Sidebar */}
            <div className={`
                fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 lg:relative lg:transform-none lg:w-80 lg:min-h-0 lg:bg-transparent lg:z-auto
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 lg:p-0">
                    {/* Close button - mobile only */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-2xl lg:hidden"
                    >
                        ×
                    </button>

                    <h2 className="text-xl font-heading font-light mb-4">Filter Products</h2>
                    
                    {/* Search Bar */}
                    <div className="mb-6">
                        {/* <label className="block text-sm font-light mb-2">Search</label> */}
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e94222] focus:border-transparent"
                        />
                    </div>

                    {/* Category Filter */}
                    {/* <div className="mb-6">
                        <label className="block text-sm font-light mb-2 uppercase">Product categories</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className="w-full px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#e94222] focus:border-transparent"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div> */}

                    <div className="mb-6">
                        <label className="block mb-2 uppercase font-medium text-lg">🍣 Product categories</label>
                        <ul>
                            {categories.map((category) => (
                                <li key={category.id} className="py-1">
                                    <button
                                        onClick={() => onCategoryChange(category.name)}
                                        className={`w-full text-left py-1 hover:text-[#e94222] transition-all duration-300 uppercase cursor-pointer text-sm ${
                                            selectedCategory === category.name ? 'font-medium' : ''
                                        }`}
                                    >
                                        {category.name}
                                        {productCountByCategory[category.id] > 0 && (
                                            <span className="ml-1 text-xs text-gray-500">
                                                ({productCountByCategory[category.id]})
                                            </span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Price Range Filter */}
                    <div className="mb-6">
                        <label className="block mb-2 uppercase font-medium text-lg">
                            🏷️ Price Range:
                        </label>
                        <div className="space-y-4">
                            {/* <div>
                                <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                                <input
                                    type="range"
                                    min="0"
                                    max={maxPrice}
                                    step="0.01"
                                    value={priceRange[0]}
                                    onChange={(e) => onPriceChange([parseFloat(e.target.value), priceRange[1]])}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                />
                            </div> */}
                            <div>
                                <span className='text-sm text-black/70'>${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max={maxPrice}
                                    step="0.5"
                                    value={priceRange[1]}
                                    onChange={(e) => onPriceChange([priceRange[0], parseFloat(e.target.value)])}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    <button
                        onClick={() => {
                            onSearchChange('');
                            onCategoryChange('');
                            onPriceChange([0, maxPrice]);
                        }}
                        className="w-full px-4 py-3 text-sm border border-gray-300 hover:bg-white transition-colors cursor-pointer"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </>
    );
};

interface StorePageClientProps {
    products: Product[];
    categories: Category[];
    productCountByCategory: Record<number, number>;
}

function StorePageClient({ products, categories, productCountByCategory }: StorePageClientProps) {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Calculate max price for slider
    const maxPrice = Math.max(...products.map(p => p.price));

    // Initialize price range
    useEffect(() => {
        if (priceRange[0] === 0 && priceRange[1] === 0) {
            setPriceRange([0, maxPrice]);
        }
    }, [maxPrice, priceRange]);

    // Filter products
    useEffect(() => {
        let filtered = [...products];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.ingredients.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory) {
            filtered = filtered.filter(product => 
                product.category.name === selectedCategory
            );
        }

        // Price filter
        filtered = filtered.filter(product => 
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        setFilteredProducts(filtered);
    }, [products, searchTerm, selectedCategory, priceRange]);

    return (
        <>
            <div className="container mx-auto py-14 lg:py-28 px-5">
                <div className="flex gap-8">
                    

                    {/* Mobile Filter Sidebar */}
                    <Filter
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                        maxPrice={maxPrice}
                        categories={categories}
                        productCountByCategory={productCountByCategory}
                    />

                    {/* Products Section */}
                    <div className="flex-1">
                        {/* Mobile Filter Button & Results Count */}
                        <div className="flex justify-between items-center mb-6 lg:mb-8">
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="lg:hidden px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Filter
                            </button>
                            <span className="text-sm text-gray-600">
                                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                            </span>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        image={product.image?.url || '/placeholder-image.jpg'}
                                        name={product.name}
                                        ingredients={product.ingredients}
                                        price={product.price}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #000;
                    cursor: pointer;
                    box-shadow: 0 0 2px 0 #555;
                }
                .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #000;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 0 2px 0 #555;
                }
            `}</style>
        </>
    );
}

export default StorePageClient;