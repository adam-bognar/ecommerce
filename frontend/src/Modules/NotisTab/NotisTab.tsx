import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { BellIcon } from "lucide-react";

export function NotisTab(){
    return (
        <TabsContent value="notifications">
                  <Card className="bg-neutral-800 border-neutral-700">
                    <CardHeader>
                      <CardTitle>Értesítési beállítások</CardTitle>
                      <CardDescription className="text-neutral-400">
                        Értesítések fogadásának kezelése.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">E-mail értesítések</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="order-updates">Rendelés frissítések</Label>
                              <p className="text-sm text-neutral-400">E-mailek fogadása a rendelésed állapotáról</p>
                            </div>
                            <Switch id="order-updates" defaultChecked />
                          </div>
                          <Separator className="bg-neutral-700" />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="promotions">Akciók</Label>
                              <p className="text-sm text-neutral-400">E-mailek fogadása új termékekről és ajánlatokról</p>
                            </div>
                            <Switch id="promotions" defaultChecked />
                          </div>
                          <Separator className="bg-neutral-700" />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="account-updates">Fiók frissítések</Label>
                              <p className="text-sm text-neutral-400">E-mailek fogadása fiókod tevékenységeiről</p>
                            </div>
                            <Switch id="account-updates" defaultChecked />
                          </div>
                        </div>
                      </div>
  
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Push értesítések</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="push-order-updates">Rendelés frissítések</Label>
                              <p className="text-sm text-neutral-400">
                                Push értesítések fogadása rendelésed állapotáról
                              </p>
                            </div>
                            <Switch id="push-order-updates" />
                          </div>
                          <Separator className="bg-neutral-700" />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="push-promotions">Akciók</Label>
                              <p className="text-sm text-neutral-400">
                                Push értesítések fogadása új termékekről és ajánlatokról
                              </p>
                            </div>
                            <Switch id="push-promotions" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto bg-amber-300 hover:bg-amber-400 text-black">
                        <BellIcon className="mr-2 h-4 w-4" />
                        Beállítások mentése
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
    )
}