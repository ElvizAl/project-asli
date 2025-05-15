"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Heart, ShoppingCart } from "lucide-react";


interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}

const NavbarItem = ({
    href, children, isActive
}: NavbarItemProps) => {
    return (
        <Button variant="outline" className={cn("bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent text-black px-4 py-2 text-md", isActive && "bg-blue-500 text-black hover:bg-blue-500 hover:text-black")}>
            <Link href={href}>
                {children}
            </Link>
        </Button>
    );
};

const navbarItems = [
    { href: "/", children: "Home" },
    { href: "/produk", children: "Produk" },
    { href: "/kontak", children: "Kontak" },
    { href: "/Maps", children: "Maps" },
];


export default function Navbar() {
    const pathname = usePathname();
    return (
        <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 border-b">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/">
                            <Image src="/logo.svg" alt="logo" width={150} height={150} />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {navbarItems.map((item) => (
                            <NavbarItem
                                key={item.href}
                                href={item.href}
                                isActive={pathname === item.href}
                            >
                                {item.children}
                            </NavbarItem>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <div className="flex-row items-center space-x-4">
                            <div className="flex items-center space-x-4">
                                <Button asChild variant="ghost" size="icon" className="w-5 h-5 cursor-pointer">
                                    <ShoppingCart className="w-5 h-5" />
                                </Button>
                                <Button asChild variant="default" className="px-4 py-1 rounded-md">
                                    <Link href="/login">Login</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}