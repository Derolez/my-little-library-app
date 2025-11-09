import MLLLogo from "@/app/ui/mll-logo";
import { clashGrotesk } from "@/app/ui/fonts";
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col md:p-6">
      <div className="flex h-20 pt-20 pb-10 shrink-0 items-end md:rounded-t-3xl p-4 pb-5 overflow-hidden bg-center bg-[url('/library-books.jpeg')] md:h-80 md:bg-top">
        <MLLLogo />
      </div>
      <div className= "mt-0 flex grow flex-col gap-4 md:flex-row bg-gradient-to-b from-brown to-transparent to-60% md:to-80%">
        <div className="flex flex-col justify-center gap-6 m-6 relative -top-0 rounded-3xl bg-saumonLight px-6 py-10 border-2 overflow-visible text-black md:w-2/5 md:ml-10 md:px-20 md:-top-10">
          <p className="text-2xl text-gray-800">Bienvenue dans l&apos;application{' '}
            <span className={`${clashGrotesk.className} antialiased font-bold text-3xl`}>My&nbsp;Little&nbsp;Library</span>
            .</p>
          <p className="text-xl text-gray-800">Cette application est mise à votre disposition par Sébastien Goffin. Celle-ci a été pensée et réalisée par <span className="font-medium">Sébastien&nbsp;Goffin</span>.</p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-3xl bg-black/15 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black/55 hover:text-white md:text-base"
          >
            <span>Connectez-vous</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-3xl bg-black/15 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black/55 hover:text-white md:text-base"
          >
            <span>View Dashboard</span>
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
        <Image
            src="/DevicesSet.png"
            width={1000}
            height={600}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
    </div>
    </main>
  );
};