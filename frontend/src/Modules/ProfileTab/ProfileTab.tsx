import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { SaveIcon } from "lucide-react";

export function ProfileTab() {
    return <TabsContent value="profile">
        <Card className="bg-neutral-800 border-neutral-700">
            <CardHeader>
                <CardTitle>Személyes adatok</CardTitle>
                <CardDescription className="text-neutral-400">Itt frissítheted a személyes adataidat.</CardDescription>
            </CardHeader>
            <form onSubmit={() => {/*handleSaveProfile*/}}>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                            <Label htmlFor="last-name">Vezetéknév</Label>
                            <Input
                                id="last-name"
                                defaultValue="Doe"
                                className="bg-neutral-700 border-neutral-600 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="first-name">Keresztnév</Label>
                            <Input
                                id="first-name"
                                defaultValue="John"
                                className="bg-neutral-700 border-neutral-600 text-white"
                            />
                        </div>
                       
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="bg-neutral-700 border-neutral-600 text-white"
                            disabled
                        />
                        <p className="text-xs text-neutral-400">
                            Az email címed nem módosítható. Segítségért fordulj az ügyfélszolgálathoz.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Telefonszám</Label>
                        <Input
                            id="phone"
                            type="tel"
                            defaultValue="+36 30 123 4567"
                            className="bg-neutral-700 border-neutral-600 text-white"
                        />
                    </div>

                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="ml-auto mt-4 bg-amber-300 hover:bg-amber-400 text-black"
                        //disabled={isLoading}
                    >
                        <SaveIcon className="mr-2 h-4 w-4" />
                        Változtatások mentése
                    </Button>
                </CardFooter>
            </form>
        </Card>
    </TabsContent>
}