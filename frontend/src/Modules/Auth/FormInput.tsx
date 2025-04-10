import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ComponentProps, JSX } from "preact";

interface FormInputProps extends ComponentProps<typeof Input> {
  id: string;
  label: string;
  icon?: JSX.Element;
  rightElement?: JSX.Element;
}

export function FormInput({ id, label, icon, rightElement, ...props }: FormInputProps) {
  return (
    <div className="flex flex-col space-y-2 text-white">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3.5 h-4 w-4 text-neutral-400">
            {icon}
          </div>
        )}
        <Input
          id={id}
          className={`${icon ? 'pl-10' : ''} bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 py-5`}
          {...props}
        />
        {rightElement && rightElement}
      </div>
    </div>
  );
}