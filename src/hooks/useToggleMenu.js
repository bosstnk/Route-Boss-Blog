import { useState } from "react";

export function useToggleMenu() {
    const [isShow,setIsShow] = useState(false)
    const switchToggle = () => setIsShow((prev) => !prev)

    return {isShow,switchToggle}
}