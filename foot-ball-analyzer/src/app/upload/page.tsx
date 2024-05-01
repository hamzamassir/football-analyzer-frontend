'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';

export default function page() {
	const [marathon, setMarathon] = useState<string>('');
	const [marathonImg, setMarathonImg] = useState<FileList | null>(null);

	return (
		<section>
			<Link href='../'>
				<Badge className='my-4 cursor-pointer'>{'<-Back'}</Badge>
			</Link>
			<form
				method='post'
				onSubmit={(event) => {
					event.preventDefault();
					console.log(`Name: ${marathon}, Image URL: ${marathonImg}`);
				}}
				className='grid w-full max-w-sm items-center gap-3'
			>
				<div className='grid gap-3'>
					<Label htmlFor='marathon-pics'>Marathon's Name</Label>
					<Input
						id='marathon-Name'
						type='text'
						placeholder="Marathon's Name"
						value={marathon}
						onChange={(e) => setMarathon(e.target.value)}
					/>
				</div>
				<div className='grid gap-3'>
					<Label htmlFor='marathon-pics'>Marathon's Pictures</Label>
					<Input
						id='marathon-pics'
						type='file'
						onChange={(e) => setMarathonImg(e.target.files)}
						multiple={true}
					/>
				</div>
				<Button>Submit</Button>
			</form>
		</section>
	);
}
