import { useMemo } from 'react';
import { Notyf } from 'notyf';

export default function useNotyf() {
    const notyf = useMemo(() => new Notyf({
        duration: 3000,
        position: { x: "center", y: "top" },
        dismissible: true
    }), []);

    const success = (message: string): void => {
        notyf.success(message);
    };

    const error = (message: string): void => {
        notyf.error(message);
    };

    return { success, error };
}