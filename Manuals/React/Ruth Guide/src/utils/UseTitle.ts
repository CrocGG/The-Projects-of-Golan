import { useEffect } from "react";

// Custom hook to dynamically set the browser tab title
// Usage: useTitle("Products") - changes browser tab to show "Products"
export default function useTitle(title: string): void {
    useEffect(() => {
        document.title = title;
    }, [title]);
}
