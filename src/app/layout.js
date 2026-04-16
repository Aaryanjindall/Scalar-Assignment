import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: 'Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!',
  description: 'Shop Online for Mobiles, Electronics, Computers, Fashion, Watches, Toys & more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] min-h-screen no-scrollbar">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main className="mt-[68px] w-full flex justify-center pb-8">
                <div className="w-full max-w-[1700px]">
                  {children}
                </div>
              </main>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}