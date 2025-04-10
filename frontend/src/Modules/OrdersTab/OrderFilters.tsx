import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { GenericFilter } from "./GenericFilter";

type Props = {
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortField: string;
  setSortField: (field: string) => void;
 
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  setCurrentPage: (page: number) => void;
};

export function OrderFilters({
  isFilterOpen,
  setIsFilterOpen,
  statusFilter,
  setStatusFilter,
  sortField,
  setSortField,
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
}: Props) {
  
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" }
  ];

  const sortFieldOptions = [
    { value: "date", label: "Date" },
    { value: "total", label: "Total" },
    { value: "id", label: "Order ID" }
  ];


  const pageOptions = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "20", label: "20" }
  ];

  return (
    <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="mb-6">
      <CollapsibleContent>
        <Card className="bg-neutral-800 border-neutral-700 py-0">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-end">
              <GenericFilter 
                label="Status"
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusOptions}
              />

              <GenericFilter
                label="Rendezés"
                value={sortField}
                onChange={setSortField}
                options={sortFieldOptions}
                placeholder="Rendezés alapja"
              />



              <Button
                variant="outline"
                className="border-neutral-700 bg-neutral-800 hover:bg-neutral-700 ml-auto mb-1.5"
                onClick={() => {
                  setStatusFilter("all");
                  setSortField("date");
                  setCurrentPage(1);
                }}
              >
                Szűrők visszaállítása
              </Button>
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}