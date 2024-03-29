import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/Navbar';
import SideBar from './components/sideBar/SideBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title:
    'Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church',
  description: 'Храм Покрова Пресвятой Богородицы | Holy Protection of the Mother of God Church, Hamilton, Ontario',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div>
          <Navbar />
          <div className='relative w-full flex flex-col md:flex-row gap-4 justify-around p-4 md:p-8 bg-white'>
            <section className='min-w-[65%]'>{children}</section>
            <aside className='min-w-[30%] bg-white'>
              <SideBar />
            </aside>
          </div>
        </div>
      </body>
    </html>
  );
}

{
  /* <html lang="en">
<body className={inter.className}>
  <div>
    <Navbar />
    <div className="w-full flex flex-col md:flex-row gap-4 justify-around p-4 md:p-8 bg-white">
      <LogInLogoutButton />
      <section className="min-w-[65%]">{children}</section>
      <aside className="min-w-[30%] bg-white">
        <SideBar />
      </aside>
    </div>
  </div>
</body>
</html> */
}
