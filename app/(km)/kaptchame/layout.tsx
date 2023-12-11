import React from 'react';

const title = 'Dynamic Data';

export const metadata = {
  title,
  openGraph: {
    title,
    images: [`/api/og?title=${title}`],
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      <body className="h-screen w-screen bg-[url('/grid.svg')]">
        <div id="main" className="h-screen w-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
