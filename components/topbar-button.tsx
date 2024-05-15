'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    alt: string;
    iconSrc: string;
    href: string;
}

export const TopBarButton = ({
    alt,
    iconSrc,
    href,
}: Props) => {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Button
            variant={"ghost"}
            className="px-6"
            asChild
        >
            <Link href={href} className="relative">
                <Image
                    src={iconSrc}
                    alt={alt}
                    width={45}
                    height={45}
                />
            </Link>
        </Button>
    )
}