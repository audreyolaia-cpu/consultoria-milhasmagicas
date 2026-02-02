import Image from "next/image";
import Link from "next/link";

export default function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Milhas Mágicas" className={className}>
      <Image
        src="/brand/logo.png"
        alt="Milhas Mágicas"
        width={190}
        height={100}
        priority
      />
    </Link>
  );
}
