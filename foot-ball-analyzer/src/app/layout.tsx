import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CgAdd } from 'react-icons/cg';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

interface Marathon {
	ID: number;
	Name: string;
	image: string;
	Description: string;
	Distance: string;
	Country: string;
	Gender: string;
}


export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<nav className='flex justify-between'>
					<h1>Marathon image finder</h1>
				</nav>
				{children}
			</body>
		</html>
	);
}
