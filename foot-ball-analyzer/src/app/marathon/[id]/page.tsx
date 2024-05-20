'use client'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge"


interface Marathon {
	ID: string;
	Name: string;
	image: string[];
	Description: string;
	Distance: string;
	Country: string;
	Gender: string;
}


async function getMarathons(): Promise<Marathon[]> {
	const result = await fetch('http://localhost:4001/Marathons');
	return await result.json();
}


export default function page({searchParams}: { searchParams: {
		marathonName: string,
		marathonID: string,
		marathonDescription: string,
		marathonDistance: string,
		marathonCountry: string,
		marathonGender: string
	};
}) {

	const initState:Marathon = {
		ID: "",
		Name: "",
		image: [],
		Description: "",
		Distance: "",
		Country: "",
		Gender: ""
	}
	

	const [marathon, setMarathon] = useState<Marathon>(initState);

	useEffect(() => {
		getMarathons().then((data) => {
			let newData = data.filter((marathon)=> marathon.ID == searchParams.marathonID)
			setMarathon(newData[0]);
		});
	}, []);
	
	return (
		
		<section>
			<Link href='/'>
				<Badge className='my-4 cursor-pointer'>{'<-Back'}</Badge>
			</Link>
			<div className='grid grid-cols-3  gap-4'>
				<div className='col-span-2'>	
					{/* {searchParams.marathonID} */}
					<Card>
						<CardHeader>
							<CardTitle>{searchParams.marathonName}</CardTitle>
							<CardDescription>
								<p>
									{searchParams.marathonDescription}
								</p>
								<p>{searchParams.marathonDistance}, <Badge>{searchParams.marathonCountry}</Badge></p>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='flex flex-wrap gap-2 overflow-hidden w-ful h-full'>
								{marathon.image.map((img)=>{
									return (<Card className=' w-64'>
										<img src={img} className='h-full w-full'></img>
									</Card>)
								})}
							</div>
						</CardContent>
					</Card>
				</div>
				<div>
					<Card>
						<CardHeader>
							<CardTitle>Image Finder</CardTitle>
							<CardDescription>
								Type the number of dossard
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form>
								<div className='grid w-full items-center gap-4'>
									<div className='flex flex-col space-y-1.5'>
										<Label htmlFor='name'>
											Runner&apos;s Number
										</Label>
										<Input
											id='name'
											type='number'
											placeholder="Runner's Number"
										/>
									</div>
								</div>
							</form>
						</CardContent>
						<CardFooter className='flex justify-between'>
							<Button>Find</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
