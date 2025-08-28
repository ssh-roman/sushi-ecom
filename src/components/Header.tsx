import Link from "next/link";

const Header = ({page} : {page: string}) => {
    return (
        <div className='mt-18 lg:mt-24 p-24 text-xs font-medium text-white flex justify-center gap-3 object-cover h-40 bg-center bg-no-repeat bg-cover uppercase'
            style={{
                backgroundImage: `url("/backgrounds/product-bg-overlay.jpg")`,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backgroundBlendMode: 'darken'
            }}>
            <Link href="/" className='text-white hover:text-[#e94222] transition-all duration-300'>home</Link>
            <span>{'//'}</span>
            <span className='text-[#e94222] whitespace-nowrap'>{page}</span>
        </div>
    );
};

export default Header;
