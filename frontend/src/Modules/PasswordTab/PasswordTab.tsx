
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { KeyIcon } from "lucide-react";

export function PasswordTab(){
    return (
        <TabsContent value="password">
                  <Card className="bg-neutral-800 border-neutral-700">
                    <CardHeader>
                      <CardTitle>Jelszó módosítása</CardTitle>
                      <CardDescription className="text-neutral-400">
                        Frissítsd a jelszavad fiókod biztonsága érdekében.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Jelenlegi jelszó</Label>
                        <Input
                          id="current-password"
                          type="password"
                          className="bg-neutral-700 border-neutral-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Új jelszó</Label>
                        <Input
                          id="new-password"
                          type="password"
                          className="bg-neutral-700 border-neutral-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Új jelszó megerősítése</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          className="bg-neutral-700 border-neutral-600 text-white"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto bg-amber-300 hover:bg-amber-400 text-black">
                        <KeyIcon className="mr-2 h-4 w-4" />
                        Jelszó frissítése
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
    )
}