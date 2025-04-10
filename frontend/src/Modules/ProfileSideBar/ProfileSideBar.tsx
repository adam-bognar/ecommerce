import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCardIcon, LogOutIcon, PackageIcon, UserIcon } from "lucide-react";
import { Link, useRoute } from "wouter";

export function ProfileSideBar() {
  // Get current route to determine which button should be highlighted
  const [, params] = useRoute<{ section?: string }>("/account/:section");
  const currentSection = params?.section || "settings";

  // Helper function to determine button styling based on active state
  const getButtonClass = (section: string) => {
    const isActive = currentSection === section;
    return isActive 
      ? "w-full justify-start text-white" 
      : "w-full justify-start text-neutral-400 hover:text-white";
  };

  return <aside className="md:w-64 flex-shrink-0">
    <Card className="bg-neutral-800 border-neutral-700 sticky top-6">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4 mb-6">
          <div className="text-center">
            <h3 className="font-medium text-lg">John Doe</h3>
            <p className="text-neutral-400 text-sm">john.doe@example.com</p>
          </div>
        </div>

        <nav className="space-y-1">
          <Button variant="ghost" className={getButtonClass("settings")} asChild>
            <Link href="/account/settings">
              <UserIcon className="mr-2 h-4 w-4" />
              Profil
            </Link>
          </Button>
          <Button variant="ghost" className={getButtonClass("orders")} asChild>
            <Link href="/account/orders">
              <PackageIcon className="mr-2 h-4 w-4" />
              Rendelések
            </Link>
          </Button>
        </nav>

        <Separator className="my-6 bg-neutral-700" />

        <Button
          variant="destructive"
          className="w-full bg-red-900 hover:bg-red-800 text-white"
          //onClick={handleLogout}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Kijelentkezés
        </Button>
      </CardContent>
    </Card>
  </aside>
}