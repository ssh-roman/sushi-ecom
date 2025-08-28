import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartButton({ count = 0, locale }: { count?: number; locale: string }) {
  return (
    <Link
      href="/cart"
      locale={locale}
      className="relative inline-flex items-center justify-center p-2 text-[#4C4C4C] hover:text-[#e94222] transition-colors duration-300"
    >
      {/* Cart icon */}
      <ShoppingBag size={24} strokeWidth={1} />

      {/* Counter badge */}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-[#e94222] rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}
