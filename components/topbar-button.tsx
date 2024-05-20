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
            size={"topBar"}
            asChild
        >
            <Link href={href}>
                <Image
                    src={iconSrc}
                    alt={alt}
                    width={0}
                    height={0}
                    className="w-auto h-[60px]"
                />
            </Link>
        </Button>
    )
}