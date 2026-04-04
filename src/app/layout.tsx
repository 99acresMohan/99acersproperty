import './globals.css';
import TopBar from '@/components/TopBar';

export const metadata = {
  title: 'JMD Properties | Real Estate Rohini',
  description: 'Buy and Sell properties in Rohini, Delhi NCR - 99AcersProperty',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {/* TopBar stays here globally */}
        <TopBar />
        
        {/* Main content of each page renders here */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}