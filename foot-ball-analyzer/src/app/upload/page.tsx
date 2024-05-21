'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
// import fs from 'fs';
import Link from 'next/link';
import path from 'path';
import { useState } from 'react';
import { uid } from 'react-uid';

//Marathon interface.
interface Marathon {
	ID: string;
	Name: string;
	image: FileList | null;
	Description: string;
	Distance: string;
	Country: string;
	Gender: string;
}

export default function page() {
	const initState: Marathon = {
		ID: '',
		Name: '',
		image: null,
		Description: '',
		Distance: '',
		Country: '',
		Gender: ''
	};

	const [marathon, setMarathon] = useState<Marathon>(initState);
	const [marathonImg, setMarathonImg] = useState<FileList | null>(null);

	function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
		setMarathon((prevState) => {
			return { ...prevState, image: e.target.files, ID: uid(prevState) };
		});
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData();
		formData.append('ID', marathon.ID);
		formData.append('Name', marathon.Name);
		formData.append('Description', marathon.Description);
		formData.append('Distance', marathon.Distance);
		formData.append('Country', marathon.Country);
		formData.append('Gender', marathon.Gender);

		if (marathonImg) {
			for (let i = 0; i < marathonImg.length; i++) {
				formData.append('image', marathonImg[i]);
			}
		}

		try {
			const response = await fetch(
				'http://localhost:3001/api/marathons',
				{
					method: 'POST',
					body: formData
				}
			);

			const result = await response.json();
			console.log('Server response:', result);

			// Reset form after submission
			setMarathon(initState);
			setMarathonImg(null);
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const field: string = e.target.id;
		const value: string | number = e.target.value;

		setMarathon((prevState) => {
			return { ...prevState, [field]: value };
		});
	}

	function handleChangeTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const field: string = e.target.id;
		const value: string | number = e.target.value;

		setMarathon((prevState) => {
			return { ...prevState, [field]: value };
		});
	}

	return (
		<section>
			<Link href='../'>
				<Badge className='my-4 cursor-pointer'>{'<-Back'}</Badge>
			</Link>
			<form
				method='post'
				className='grid w-full max-w-sm items-center gap-3'
				onSubmit={handleSubmit}
			>
				{/* Name Input */}
				<div className='grid gap-3'>
					<Label htmlFor='Name'>Marathon's Name</Label>
					<Input
						id='Name'
						type='text'
						placeholder="Marathon's Name"
						value={marathon.Name}
						onChange={handleChange}
					/>
				</div>

				{/* Description Input */}
				<div className='grid gap-3'>
					<Label htmlFor='Description'>Marathon's Description</Label>
					<Textarea
						id='Description'
						placeholder="Marathon's Description"
						value={marathon.Description}
						onChangeCapture={handleChangeTextArea}
					/>
				</div>

				{/* Distance Input */}
				<div className='grid gap-3'>
					<Label htmlFor='Distance'>Marathon's Distance</Label>
					<Input
						id='Distance'
						type='number'
						placeholder="Marathon's Distance"
						value={marathon.Distance}
						onChange={handleChange}
					/>
				</div>

				{/* Country Input */}
				<div className='grid gap-3'>
					<Label htmlFor='Country'>Marathon's Country</Label>
					<Input
						id='Country'
						type='text'
						placeholder="Marathon's Location"
						value={marathon.Country}
						onChange={handleChange}
					/>
				</div>

				{/* Gender Input */}
				<div className='grid gap-3'>
					<Label htmlFor='Gender'>
						Participant Gender (Male / Female){' '}
					</Label>
					<Input
						id='Gender'
						type='text'
						placeholder='Participant Gender'
						value={marathon.Gender}
						onChange={handleChange}
					/>
				</div>

				{/* Images Input */}
				<div className='grid gap-3'>
					<Label htmlFor='marathon-pics'>Marathon's Pictures</Label>
					<Input
						id='marathon-pics'
						type='file'
						onChange={(e) => {
							handleImages(e);
							setMarathonImg(e.target.files);
						}}
						multiple
					/>
				</div>

				<Button type='submit'>Submit</Button>
			</form>
		</section>
	);
}
