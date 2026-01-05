import "@fontsource/inter";
import "./App.css";
import logo from "@/assets/logo-full.png";
import { Button } from "@/components/ui/button";
import { Challenges } from "@/components/Challenges";

export default function App() {
  return (
    <div className='main-app h-screen w-screen'>
      <div className='app-header h-14 flex items-center justify-between border-b px-3 py-2 shadow-custom'>
        <img src={logo} alt='HackerEarth Logo' className='h-full' />
        <Button size='sm' variant='outline' onClick={() => window.close()}>
          Close
        </Button>
      </div>

      <div className='app-content p-4 pt-2 overflow-y-auto h-[calc(100%-56px-48px)] relative'>
        <Challenges />
      </div>

      <div className='app-footer h-12 flex items-center justify-between px-3 py-2 bg-slate-900 text-white'>
        <p className='text-sm'>&copy; {new Date().getFullYear()} HackerEarth Challenges</p>
        <p className='text-sm'>
          Designed & Developed by{" "}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='http://www.tcmhack.in'
            className='text-white font-bold underline hover:underline-offset-2 hover:text-blue-400'
          >
            TCMHACK
          </a>
        </p>
      </div>
    </div>
  );
}
