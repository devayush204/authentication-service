import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div className="flex  gap-5">
      <button >
        <Link href={'/register'} >signup</Link>
      </button>
      <button>
        <Link href={'/login'} >login</Link>
      </button>
      </div>
    </section>
  );
}
