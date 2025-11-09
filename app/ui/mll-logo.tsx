import { clashGrotesk } from "@/app/ui/fonts"

export default function MLLLogo() {
  return (
    <div className="flex flex-row items-center leading-none text-white">
      <p className={`${clashGrotesk.className} font-bold text-[44px] antialiased drop-shadow-md md:text-[80px]`}>My&nbsp;Little&nbsp;Library</p>
    </div>
  );
}
