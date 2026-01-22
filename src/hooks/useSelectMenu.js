import { useState } from "react";

export function useSelectMenu() {
    const [activeMenu, setActiveMenu] = useState("profile");
    
    const selectProfile = () => setActiveMenu("profile")

    const selectResetPass = () => setActiveMenu("resetpass")

    return {activeMenu,selectProfile,selectResetPass}
}