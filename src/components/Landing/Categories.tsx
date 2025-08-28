import Image from "next/image";
import Link from "next/link";

const Category = ({ title, imageUrl, description } : { title: string; imageUrl: string; description: string; }) => {
  return (
    <Link href="/categories/sushi" className="w-full rounded-[200px] overflow-hidden relative hover:scale-105 hover:rounded-bl-3xl transition-all duration-300">
      <Image src={imageUrl} alt={title} width={600} height={500} />
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center">
        <h3 className="text-2xl lg:text-3xl font-light font-heading tracking-[-0.5px] whitespace-nowrap">{title}</h3>
        <p className="text-sm lg:text-base text-[#e94222] mt-2">{description}</p>
      </div>
    </Link>
  );
};

function Categories() {
  return (
    <div className="categories-section bg-[#e94222] py-28 px-5">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-between gap-10">
        <Category title="Sushi Menu" imageUrl="/categories/sushi.jpg" description="寿司と刺身" />
        <Category title="Soup & Ramen" imageUrl="/categories/soup.jpg" description="スープとラーメン" />
        <Category title="Seafood" imageUrl="/categories/seafood.jpg" description="海鮮料理" />
        <Category title="Drinks" imageUrl="/categories/drinks.jpg" description="飲み物" />
      </div>
    </div>
  );
}

export default Categories;