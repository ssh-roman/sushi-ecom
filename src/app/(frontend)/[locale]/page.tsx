import Footer from "@/components/Footer"
import Hero from "@/components/Landing/Hero"
import Categories from "@/components/Landing/Categories"
import PopularProducts from "@/components/Landing/PopularProducts"
import Navbar from "@/components/Navbar"

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      <Hero />

      <Categories />

      <PopularProducts />

      <Footer />
    </main>
  )
}
