import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

	// delay response
	await new Promise((resolve) => setTimeout(resolve, 3000));

	return result.json();
}

export default async function Home() {
	const Marathons = await getMarathons();

	return (
		<main>
			<div>
				<Input
					type='Search'
					placeholder='Search Marathon'
					className='mb-8'
				></Input>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
					{Marathons.map((Marathon) => (
						<Card
							key={Marathon.ID}
							className='flex flex-col justify-between'
						>
							<CardHeader className='flex-row gap-4 items-center'>
								{/* <Avatar>
								<AvatarImage
									src={`/img/${Marathon.image}`}
									alt='@shadcn'
								/>
								<AvatarFallback>
									{Marathon.Name.slice(0, 2)}
								</AvatarFallback>
							</Avatar> */}
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
								<Button>View</Button>
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
