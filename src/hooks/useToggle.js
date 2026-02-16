import { useState } from "react";

export function useToggle() {
    const [isShow,setIsShow] = useState(false)
    const switchToggle = () => setIsShow((prev) => !prev)

    return {isShow,switchToggle}
}