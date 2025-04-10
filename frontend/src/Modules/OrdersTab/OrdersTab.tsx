import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeftIcon, ChevronRightIcon, FilterIcon, PackageIcon, SearchIcon } from "lucide-react"
import { useEffect, useState } from "preact/hooks"
import { OrderFilters } from "./OrderFilters"
import { OrderDto } from "@/Models"
import { getOrders } from "@/api"

  
  // Állapotjelző komponens
  export const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "Processing":
        return (
          <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-amber-500/10">Feldolgozás alatt</Badge>
        )
      case "Shipped":
        return <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-blue-500/10">Kiszállítva</Badge>
      case "Delivered":
        return (
          <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/10">Kézbesítve</Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }
  
  // Dátum formázása
  export const formatDate = (dateInput: string | Date) => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        year: "numeric", 
        month: "long", 
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      };
      
      const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        return "Érvénytelen dátum";
      }
      
      return date.toLocaleDateString("hu-HU", options);
    } catch (error) {
      console.error("Hiba a dátum formázása során:", error);
      return "Érvénytelen dátumformátum";
    }
  }

  export function OrdersTab(){
    const [orders, setOrders] = useState<OrderDto[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [sortField, setSortField] = useState("date")
    const [statusFilter, setStatusFilter] = useState("all")
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    useEffect(() => {
      const getOrdersFromApi = async () => {
        const response = await getOrders(
          {status: statusFilter, sort: sortField, take: itemsPerPage},
        )
        if (typeof response !== "string") {
          setOrders(response)
        } else {
          console.error("Hiba a rendelések lekérése során:", response)
        }
      }
      getOrdersFromApi()
      console.log(orders)
    },[statusFilter, sortField, itemsPerPage])

    // Lapozás számítása
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(orders.length / itemsPerPage)

    // Lapozás vezérlés
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

    return (
      <>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Rendeléseim</h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              className="border-neutral-700 bg-neutral-800 hover:bg-neutral-700"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FilterIcon className="h-4 w-4 mr-2" />
              Szűrők
            </Button>
          </div>
        </div>

        {/* Szűrők */}
        <OrderFilters
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortField={sortField}
          setSortField={setSortField}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
        />
        
        {/* Rendelések táblázata (asztali nézet) */}
        <div className="hidden lg:block mb-6">
          <Card className="bg-neutral-800 border-neutral-700 overflow-hidden p-4">
            <CardContent className="p-0">
              <Table className="p-6">
                <TableHeader>
                  <TableRow className="hover:bg-neutral-700/50 border-neutral-700">
                    <TableHead className="text-neutral-400">
                      <span className="font-medium">Rendelés azonosító</span>
                    </TableHead>
                    <TableHead className="text-neutral-400">
                      <span className="font-medium">Dátum</span>
                    </TableHead>
                    <TableHead className="text-neutral-400">Termékek</TableHead>
                    <TableHead className="text-neutral-400">
                      <span className="font-medium">Összesen</span>
                    </TableHead>
                    <TableHead className="text-neutral-400">Állapot</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders ? (
                    orders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-neutral-700/50 border-neutral-700">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {order.items.slice(0, 2).map((item, index) => (
                              <div key={index} className="text-sm">
                                {item.productName} × {item.quantity}
                              </div>
                            ))}
                            {order.items.length > 2 && (
                              <div className="text-xs text-neutral-400">+{order.items.length - 2} további termék</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{order.totalPrice} Ft</TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-neutral-400">
                        Nem található a keresési feltételeknek megfelelő rendelés
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Rendelés kártyák (mobil nézet) */}
        <div className="lg:hidden space-y-4 mb-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <Card key={order.id} className="bg-neutral-800 border-neutral-700">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <p className="text-sm text-neutral-400">{formatDate(order.createdAt)}</p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.productName} × {item.quantity}
                          </span>
                          <span>{item.price * item.quantity} Ft</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-neutral-700">
                      <span>Összesen</span>
                      <span>{order.totalPrice} Ft</span>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full border-neutral-700 hover:bg-neutral-700">
                        Részletek megtekintése
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-neutral-800 border-neutral-700">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <PackageIcon className="h-12 w-12 text-neutral-600 mb-4" />
                <p className="text-neutral-400 text-center">Nem található a keresési feltételeknek megfelelő rendelés</p>
              </CardContent>
            </Card>
          )}
        </div>

       
      </>
    )
  }