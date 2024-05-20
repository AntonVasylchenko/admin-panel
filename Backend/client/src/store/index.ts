import { create } from 'zustand';

type MessageType = {
    msg: string,
    type: "success" | "error" | ""
}

interface State {
    message: MessageType;
    changeMessage: (msg: string, type: "success" | "error" | "" ) => void;
}

export const useStore = create<State>((set) => ({
    message: {
        msg: "",
        type: "",
    },
    changeMessage: (msg: string, type: "success" | "error" | "") => set(() => ({
        message: { msg, type }
    }))
}));
