import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FilterOption = {
  value: string;
  label: string;
};

type GenericFilterProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  minWidth?: string;
};

export function GenericFilter({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
  minWidth = "150px"
}: GenericFilterProps) {
  return (
    <div className="flex flex-col gap-2" style={{ minWidth }}>
      <label className="text-sm font-medium">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          className="bg-neutral-700 border-neutral-600 py-2.5 hover:bg-neutral-600 transition-colors w-full text-md" 
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-neutral-800 border-neutral-700">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}