import Image from "next/image";

export default function LogoImage({
  className,
  size = 50,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/logo.png"
      width={size}
      height={size}
      alt="site logo"
      className={className}
    />
  );
}
