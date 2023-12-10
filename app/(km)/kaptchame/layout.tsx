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
      <body className="w-100 h-100 bg-[url('/grid.svg')]">
        <div id="main" className="h-100 w-100">
          {children}
        </div>
      </body>
    </html>
  );
}
