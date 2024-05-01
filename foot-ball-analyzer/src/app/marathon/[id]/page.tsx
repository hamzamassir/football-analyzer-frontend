import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



function page({params}: {params:{id: string}}) {


  return (
    <section>
        <div className="grid grid-cols-3  gap-4">
            <div className="col-span-2">
                {params.id}
                <Card>
                    <CardHeader>
                        <CardTitle>No images found</CardTitle>
                        <CardDescription>Type the number of dossard</CardDescription>
                    </CardHeader>
                </Card>
            </div>
            <div>
                <Card className="">
                    <CardHeader>
                        <CardTitle>Image Finder</CardTitle>
                        <CardDescription>Type the number of dossard</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Runner's Number</Label>
                            <Input id="name" type="number" placeholder="Runner's Number" />
                            </div>
                        </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button>Find</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>

    </section>
  )
}

export default page