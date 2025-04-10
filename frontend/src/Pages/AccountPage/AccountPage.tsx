
import { getOrders } from "@/api"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderDto } from "@/Models"
import { NotisTab } from "@/Modules/NotisTab/NotisTab"
import { OrdersTab } from "@/Modules/OrdersTab/OrdersTab"
import { PasswordTab } from "@/Modules/PasswordTab/PasswordTab"
import { ProfileSideBar } from "@/Modules/ProfileSideBar/ProfileSideBar"
import { ProfileTab } from "@/Modules/ProfileTab/ProfileTab"
import { SettingsTab } from "@/Modules/SettingsTab/SettingsTab"
import { useEffect, useState } from "preact/hooks"
import { Route, Router, useRoute } from "wouter"





export function AccountPage() {
  const [match, params] = useRoute<{ section: string }>(
    "/account/:section"
  );
    const [isLoading, setIsLoading] = useState(false)
    const [selectedTab, setSelectedTab] = useState("profile")
  
    // Handle logout
    const handleLogout = () => {
      setIsLoading(true)
  
      // Simulate logout API call
      setTimeout(() => {
        // In a real app, this would call a server action to invalidate the session
        // localStorage.removeItem("isLoggedIn")
        // toast({
        //   title: "Logged out successfully",
        //   description: "You have been logged out of your account.",
        // })
        // router.push("/sign-in")
      }, 1000)
    }
  
    // Handle save profile
    const handleSaveProfile = (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
  
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        // toast({
        //   title: "Profile updated",
        //   description: "Your profile information has been updated successfully.",
        // })
      }, 1000)
    }
    const [orders, setOrders] = useState<OrderDto[]>([])

    useEffect(() => {
          const getOrdersFromApi = async () => {
            const response = await getOrders()
            if (typeof response !== "string") {
              setOrders(response)
            } else {
              console.error("Hiba a rendelések lekérése során:", response)
            }
          }
          getOrdersFromApi()
          console.log(orders)
        },[])
  
    return (
      <div className="dark min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
        <div className="container px-4 py-12 mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <ProfileSideBar/>
  
            {/* Main content */}
            <main className="flex-1">
              <h1 className="text-3xl font-bold mb-8">Fiók Beállítások</h1>
  
              <Router base="/account">
                <Route path="/settings" component={() => <SettingsTab/>} />
                <Route path="/orders" component={() => <OrdersTab orders={orders}/>} />

              </Router>
            </main>
          </div>
        </div>
      </div>)
}