import { Notyf } from "notyf";

class Notify {
	
    private notyf = new Notyf({
        duration: 3000,
        position: { x: "center", y: "top" },
        dismissible: true
    });

    public success(message: string): void {
        this.notyf.success(message);
    }

    public error(message: string): void {
        this.notyf.error(message);
    }

}

export const notify = new Notify();
