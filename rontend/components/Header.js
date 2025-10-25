import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-red-600 text-white p-4">
      <div className="container flex justify-between items-center">
        <div className="text-xl font-bold">Sanjeevani</div>
        <nav className="space-x-4">
          <Link href="/"><a>Home</a></Link>
          <Link href="/donate"><a>Donate</a></Link>
          <Link href="/request"><a>Request</a></Link>
          <Link href="/login"><a>Login</a></Link>
        </nav>
      </div>
    </header>
  );
}
