'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcher from './LocaleSwitcher'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

import { useCart } from "@/contexts/CartContext";
import CartButton from './microComponents/ecom/CartButton'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems } = useCart();
  const t = useTranslations('Navbar')
  const locale = useLocale()
  
  const navigation = [
    { name: t('navlink1'), href: '/' },
    { name: t('navlink2'), href: '/about-us' },
    { name: t('navlink3'), href: '/store' },
    { name: t('navlink4'), href: '/contacts' },
  ]

  return (
    <header className="top-0 z-30 w-full" id="home">
      <nav
        className="z-30 flex justify-center p-5 mx-auto w-full fixed bg-[#F3EDEA]"
        aria-label="Global"
      >
        <div className="container flex w-full justify-between items-center ">
          <Image
            src={'/logos/logo_1x.png'}
            alt="Sushi E-Commerce"
            width={150}
            height={50}
            className='w-[100px] lg:w-[150px]'
          />

          <div className="hidden lg:flex gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                locale={locale}
                className={`cursor-pointer text-xs font-medium transition-all duration-300 text-[#4C4C4C] hover:text-[#e94222] uppercase`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-1 md:gap-4">
            <LocaleSwitcher />

            <CartButton count={totalItems} locale={locale} />
          </div>

          <div className="flex lg:hidden px-2">
            <button
              type="button"
              className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-500`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#a1a1a152] backdrop-blur-xl px-6 py-12 lg:py-5 lg:px-8 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Image src="/logos/logo_1x.png" alt="Green Energy Logo" width={100} height={56} />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)} // <-- close the panel on click
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-900 transition"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6 flex items-center justify-between">
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  href="#contact"
                  className="bg-white ps-6 p-2 rounded-full w-full flex items-center justify-between gap-4 hover:bg-[#eeeeee]"
                >
                  <span className="text-[#001D3D] font-medium">{t('button')}</span>

                  <Image src="/icons/arrow-up-filled.svg" width={34} height={34} alt="" />
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
