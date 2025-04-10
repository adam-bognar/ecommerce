import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotisTab } from "../NotisTab/NotisTab";
import { PasswordTab } from "../PasswordTab/PasswordTab";
import { ProfileTab } from "../ProfileTab/ProfileTab";

export function SettingsTab() {
    return (
        <Tabs defaultValue="profile" className="w-full">
            <TabsList className="bg-neutral-800 border-neutral-700 mb-8">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="password">Jelszó</TabsTrigger>
                <TabsTrigger value="notifications">Értesítések</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <ProfileTab />

            {/* Password Tab */}
            <PasswordTab />

            {/* Notifications Tab */}
            <NotisTab />
        </Tabs>
    )
}