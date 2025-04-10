import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentProps, JSX } from "preact";

interface NameInputProps extends ComponentProps<typeof Input> {
    id: string;
    placeholder?: string;
    icon?: JSX.Element;
    handleFirstNameChange?: (e: any) => void;
    handleLastNameChange?: (e: any) => void;
    };


export function NameInput({ id, icon, handleFirstNameChange, handleLastNameChange, ...props }: NameInputProps) {
    return (
        <div className={"grid grid-cols-2 gap-4 text-white"}>
                    <div className="space-y-2">
                        <Label htmlFor={id}>Vezetéknév</Label>
                        <div className="relative">
                            {icon && (
                                <div className="absolute left-3 top-3 text-neutral-400">
                                    {icon}
                                </div>
                            )}
                            <Input
                                id={"last" +id}
                                className={`${icon ? 'pl-10' : ''} bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400  py-5`}
                                placeholder={"Doe"}
                                {...props}
                                onChange={handleLastNameChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={id}>Keresztnév</Label>
                        <div className="relative">
                            
                            <Input
                                id={"first"+id}
                                className={`bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 py-5`}
                                placeholder={"John"}
                                onChange={handleFirstNameChange}
                                {...props}
                            />
                        </div>
                    </div>

                </div>
    )
}