import { createOrder } from "@/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";

type Props = {
  totalPrice: number;
}

export function OrderSummary({ totalPrice }: Props) {

const handleCreateOrder = async () => {
    try{
      await createOrder();


    } catch(e){
      if(e instanceof Error){
        console.error(e.message);
      }
    }
  }

    return (
        <Card className="bg-neutral-800 border-neutral-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Összegzés</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Összeg</span>
                    <span>{totalPrice} Ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Szállítás</span>
                    <span>0 Ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">ÁFA</span>
                    <span>27%</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Összesen</span>
                    <span>{Math.ceil(totalPrice*1.27)}  Ft</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <div className="w-full space-y-3">
                  <Button className="w-full bg-amber-300 hover:bg-amber-400 text-black" size="lg" asChild onClick={handleCreateOrder}>
                    <Link href="">Tovább a fizetéshez</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-neutral-700 text-white hover:bg-neutral-700"
                    size="lg"
                    asChild
                  >
                  </Button>
                </div>
              </CardFooter>
            </Card>
    )
}