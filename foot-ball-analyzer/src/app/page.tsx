'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CgAdd } from 'react-icons/cg';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
interface Marathon {
	ID: number;
	Name: string;
	image: string;
	Description: string;
	Distance: string;
	Country: string;
	Gender: string;
}

async function getMarathons(): Promise<Marathon[]> {
	const result = await fetch('http://localhost:4001/Marathons');
	//await new Promise(resolve => setTimeout(resolve, 3000));
	return await result.json();
}

export default function Home() {
	//const marathons = await getMarathons();
	const [marathons, setMarathons] = useState<Marathon[]>([]);
	const [filteredMarathons, setFilteredMarathons] = useState<Marathon[]>([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		getMarathons().then((data) => {
			setMarathons(data);
			setFilteredMarathons(data);
		});
	}, []);

	useEffect(() => {
		if (search === '') {
			setFilteredMarathons(marathons);
		} else {
			setFilteredMarathons(
				marathons.filter((marathon) =>
					marathon.Name.toLowerCase().includes(search.toLowerCase())
				)
			);
		}
	}, [search, marathons]);

	return (
		<main>
			<nav className='flex justify-between items-center'>
				<h2>Marathons list :</h2>
				<Link href='/upload'>
					<Button className='inner-flex justify-center items-center'>
						<CgAdd className='mr-2 h-4 w-4' />
						<span>Upload</span>
					</Button>
				</Link>
			</nav>
			<div>
				<Input
					type='Search'
					placeholder='Search Marathon'
					className='mb-8'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				></Input>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
					{filteredMarathons.map((Marathon) => (
						<Card
							key={Marathon.ID}
							className='flex flex-col justify-between'
						>
							<CardHeader className='flex-row gap-4 items-center'>
								<div>
									<CardTitle>{Marathon.Name}</CardTitle>
									<CardDescription>
										{Marathon.Country}
									</CardDescription>
								</div>
							</CardHeader>
							<CardContent>
								<p>{Marathon.Description}</p>
							</CardContent>
							<CardFooter className='flex justify-between'>
								<Link
									href={{
										pathname: `/marathon/${Marathon.ID}`,
										query: {
											marathonName: Marathon.Name,
											marathonID: Marathon.ID,
											marathonDescription:
												Marathon.Description,
											marathonDistance: Marathon.Distance,
											marathonCountry: Marathon.Country,
											MarathonGender: Marathon.Gender
										}
									}}
								>
									<Button>View</Button>
								</Link>
								<Badge variant='secondary'>
									{Marathon.Distance}
								</Badge>
								<Badge variant='secondary'>
									{Marathon.Gender}
								</Badge>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</main>
	);
}
