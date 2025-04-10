import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Table, ArrowUpIcon, ArrowDownIcon, SlidersHorizontalIcon } from "lucide-react";
import { formatDate, ORDERS, StatusBadge } from "./OrdersTab";

export interface OrdersTableProps {
    currentItems: {
        id: string;
        date: string;
        total: number;
        status: string;
        items: {
            id: number;
            name: string;
            price: number;
            quantity: number;
        }[];
    }[],
    sortField: string;
    sortDirection: string;
    toggleSort: (field: string) => void;
}

export function OrdersTable({
    currentItems,
    sortField,
    sortDirection,
    toggleSort
}: OrdersTableProps) {
    return (
        <div className="hidden md:block mb-6">
            <Card className="bg-neutral-800 border-neutral-700 overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-neutral-700/50 border-neutral-700">
                                <TableHead className="text-neutral-400">
                                    <Button
                                        variant="ghost"
                                        className="p-0 font-medium hover:bg-transparent hover:text-white"
                                        onClick={() => toggleSort("id")}
                                    >
                                        Order ID
                                        {sortField === "id" &&
                                            (sortDirection === "asc" ? (
                                                <ArrowUpIcon className="ml-1 h-3 w-3 inline" />
                                            ) : (
                                                <ArrowDownIcon className="ml-1 h-3 w-3 inline" />
                                            ))}
                                    </Button>
                                </TableHead>
                                <TableHead className="text-neutral-400">
                                    <Button
                                        variant="ghost"
                                        className="p-0 font-medium hover:bg-transparent hover:text-white"
                                        onClick={() => toggleSort("date")}
                                    >
                                        Date
                                        {sortField === "date" &&
                                            (sortDirection === "asc" ? (
                                                <ArrowUpIcon className="ml-1 h-3 w-3 inline" />
                                            ) : (
                                                <ArrowDownIcon className="ml-1 h-3 w-3 inline" />
                                            ))}
                                    </Button>
                                </TableHead>
                                <TableHead className="text-neutral-400">Items</TableHead>
                                <TableHead className="text-neutral-400">
                                    <Button
                                        variant="ghost"
                                        className="p-0 font-medium hover:bg-transparent hover:text-white"
                                        onClick={() => toggleSort("total")}
                                    >
                                        Total
                                        {sortField === "total" &&
                                            (sortDirection === "asc" ? (
                                                <ArrowUpIcon className="ml-1 h-3 w-3 inline" />
                                            ) : (
                                                <ArrowDownIcon className="ml-1 h-3 w-3 inline" />
                                            ))}
                                    </Button>
                                </TableHead>
                                <TableHead className="text-neutral-400">Status</TableHead>
                                <TableHead className="text-neutral-400 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentItems.length > 0 ? (
                                currentItems.map((order) => (
                                    <TableRow key={order.id} className="hover:bg-neutral-700/50 border-neutral-700">
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{formatDate(order.date)}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                {order.items.slice(0, 2).map((item, index) => (
                                                    <div key={index} className="text-sm">
                                                        {item.name} × {item.quantity}
                                                    </div>
                                                ))}
                                                {order.items.length > 2 && (
                                                    <div className="text-xs text-neutral-400">+{order.items.length - 2} more items</div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>${order.total.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={order.status} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <SlidersHorizontalIcon className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-neutral-800 border-neutral-700">
                                                    <DropdownMenuLabel className="text-neutral-400">Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator className="bg-neutral-700" />
                                                    <DropdownMenuItem className="hover:bg-neutral-700 cursor-pointer">
                                                        View details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-neutral-700 cursor-pointer">
                                                        Track shipment
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-neutral-700 cursor-pointer">
                                                        Download invoice
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-neutral-400">
                                        No orders found matching your criteria
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}