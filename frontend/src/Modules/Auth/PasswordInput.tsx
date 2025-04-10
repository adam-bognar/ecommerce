import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import { useState } from "preact/hooks";
import { Link } from "wouter";

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder?: string;
  forgotPasswordLink?: boolean;
  onChange?: (e: any) => void;
}

export function PasswordInput({ 
  id, 
  label, 
  placeholder = "••••••••", 
  forgotPasswordLink = false ,
  onChange
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {forgotPasswordLink && (
          <Link href="/forgot-password" className="text-sm text-amber-300 hover:text-amber-200">
            Elfelejtett jelszó?
          </Link>
        )}
      </div>
      <div className="relative">
        <LockIcon className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="pl-10 bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 py-5"
          onChange={onChange}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1 h-8 w-8 text-neutral-400 hover:text-white"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </Button>
      </div>
    </div>
  );
}