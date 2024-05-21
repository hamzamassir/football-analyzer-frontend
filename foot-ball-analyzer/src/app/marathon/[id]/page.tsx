'use client'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
  } from "@/components/ui/dialog"
  
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
	const result = await fetch('http://localhost:3001/api/marathons');
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

	interface fetchedMarathon{
		desired_bib_number: string,
		image_paths: string[],
		marathon_name: string
	}

	const initFM = {
		desired_bib_number: "",
		image_paths: [],
		marathon_name: ""
	}

	const [query, setQuery] = useState<string>('');
	const [fetchMarathon, setFetchMarathon] = useState<fetchedMarathon>(initFM);


	function handleQuery(e:React.ChangeEvent<HTMLInputElement>){
		setQuery(e.target.value);
	}
	const handleSearch = () => {
		
        fetch(`http://127.0.0.1:5000/search?desired_bib_number=${query}&marathon_name=${searchParams.marathonName}`)
            .then(response => response.json())
            .then(data => {
				console.log(data)
                setFetchMarathon(data);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    };
	
	return (
		
		<section>
			<Link href='/'>
				<Badge className='my-4 text-lg cursor-pointer'>{'<-Back'}</Badge>
			</Link>
			<div className='grid md:grid-cols-4  gap-4'>
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
											value={query}
											onChange={handleQuery}
										/>
									</div>
								</div>
							</form>
						</CardContent>
						<CardFooter className='flex justify-between'>
							<Button onClick={handleSearch}>Find</Button>
						</CardFooter>
					</Card>
				</div>
				<div className='col-span-3'>	
					{/* {searchParams.marathonID} */}
					<Card>
						<CardHeader>
							<CardTitle>{searchParams.marathonName}</CardTitle>
							<CardDescription>
									{searchParams.marathonDescription}
							</CardDescription>
							<p><Badge variant="secondary">{searchParams.marathonDistance} Km</Badge> , Location: <Badge variant="secondary">{searchParams.marathonCountry}</Badge></p>
						</CardHeader>
						<CardContent>
							<div className=' grid md:grid-cols-3 sm:grid-cols-1 mt-2 gap-2 overflow-hidden w-ful h-full'>
								{/* Just comp for test u can delete it */}
									{/* <Card className='relative p-4 w-64 hover:bg-slate-800'>
											<img src={`http://localhost:3001/uploads/marathon_1_1716289250438.png`} className='h-full w-full' />
											
											<Dialog>
												<DialogTrigger>
													<Button variant="secondary" className=' absolute bottom-2'>View Full Image
													</Button>
												</DialogTrigger>
												<DialogContent>
													<div className=' '>
														<img className=' h-full' src={`http://localhost:3001/uploads/marathon_1_1716289250438.png`} alt="marathon img"/>
													</div>
												</DialogContent>
											</Dialog>

									</Card> */}
						
								
								{fetchMarathon.image_paths.map((img)=>{
									return (
									<Card className=' w-64'>
										<img src={`http://localhost:3001/uploads/${img}`} className='w-full' />
										<Dialog>
												<DialogTrigger>
													<Button variant="secondary" className=' absolute bottom-2'>View Full Image
													</Button>
												</DialogTrigger>
												<DialogContent>
													<div className=' '>
														<img className=' h-full' src={`http://localhost:3001/uploads/${img}`} alt="marathon img"/>
													</div>
												</DialogContent>
										</Dialog>
									</Card>)
								})}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
