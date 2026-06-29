import { useLocation } from "react-router-dom";

function useActivePath() {
    const location = useLocation()

    const isActive = (path) => {
        return location.pathname.startsWith(path)
    }

    return {isActive}
}

export default useActivePath;
