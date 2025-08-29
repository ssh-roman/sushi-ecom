import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { CartProvider } from '../../../contexts/CartContext'
import { notFound } from 'next/navigation'
import { Jost } from 'next/font/google'
import { routing } from '@/i18n/routing'
import clsx from 'clsx'
import '../globals.css'
import { Toaster } from 'react-hot-toast'

const jost = Jost({ subsets: ['latin'], variable: '--font-jost' });

export const metadata = {
  title: 'Sushi Shop',
  description: 'Delicious sushi and Japanese cuisine',
  keywords: 'sushi, japanese food, restaurant',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={clsx(jost.variable)}>
      <head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/fraunces-144pt-s000" />
      </head>
      <body>
        <NextIntlClientProvider>
          <CartProvider>
            {children}
            <Toaster position="bottom-right" />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
