import Link from "next/link";
import { User } from "@/types";

// This is where you will add your navigation links and user profile dropdown
// For now, it's just a placeholder to get you started.

export default function Navbar() {
    // We'll hook this up to authentication later
    const user: User | null = null;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block text-xl">FoodMart</span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
                        <Link href="/restaurants" className="hover:text-black">Restaurants</Link>
                        <Link href="/orders" className="hover:text-black">My Orders</Link>
                    </nav>
                </div>

                {/* Mobile Menu & User Auth Section will go here */}
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search Component Placeholder */}
                    </div>
                    <nav className="flex items-center">
                        {user ? (
                            // @ts-ignore - name access is safe because user is typed
                            <span>Hello, {user?.name}</span>
                        ) : (
                            <Link href="/auth/login" className="text-sm font-medium bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                                Login
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
