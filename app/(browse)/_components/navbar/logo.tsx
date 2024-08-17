import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:placeholder-opacity-75 transition">
        <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
          <Image src="/logo.png" alt="Shop.fyi" height="95" width="95" />
        </div>
      </div>
    </Link>
  );
};
