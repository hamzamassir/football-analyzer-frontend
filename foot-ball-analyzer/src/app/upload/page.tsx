'use client';
import { uid } from 'react-uid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select"
  

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

	const initState:Marathon = {
		ID: "",
		Name: "",
		image: null,
		Description: "",
		Distance: "",
		Country: "",
		Gender: ""
	}
	

	const [marathon, setMarathon] = useState<Marathon>(initState);
	const [marathonImg, setMarathonImg] = useState<FileList | null>(null);

	function handleImages(e:React.ChangeEvent<HTMLInputElement>){
		setMarathon(prevState => {
			return {...prevState, image:e.target.files, ID:uid(prevState)}
		})
	}

	function handleSubmit(e:React.FormEvent<HTMLFormElement>){
		e.preventDefault();
		setMarathon(prevState => {
			return {...prevState, ID:uid(prevState)}
		})
		console.log(marathon)
	}
	
	function handleChange(e:React.ChangeEvent<HTMLInputElement>){
		const field:string = e.target.id;
		const value:string | number = e.target.value;

		setMarathon( (prevState) => {
			return {...prevState, [field]:value} 
		})
		
	}
	
	function handleChangeTextArea(e:React.ChangeEvent<HTMLTextAreaElement>){
		const field:string = e.target.id;
		const value:string | number = e.target.value;

		setMarathon( (prevState) => {
			return {...prevState, [field]:value} 
		})
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
					<Label htmlFor='Gender'>Participant Gender (Male / Female) </Label>
					<Input
						id='Gender'
						type='text'
						placeholder="Participant Gender"
						value={marathon.Gender}
						onChange={handleChange}
					/>
				</div>

				{/* Images Input */}
				<div className='grid gap-3'>
					<Label htmlFor='marathon-pics'>Marathon's Pictures</Label>
					<Input className=''
						id='marathon-pics'
						type='file'
						onChange={handleImages}
						multiple={true}
					/>
				</div>
				<Button>Submit</Button>
			</form>
		</section>
	);
}
