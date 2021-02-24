export const DefaultActive = {
    outline: 'none',
    userSelect: 'none',
    border: 'none'
}

export const DefaultHover = (backgroundColor: string) => {
    return {
        backgroundColor,
        outline: 'none',
        userSelect: 'none',
    }
}

export const DefaultFocus = {
    boxShadow: 'none'
}

export interface DefaultDialogProps {
    isOpen: boolean;
    setIsOpen: (status: boolean) => void;    
}

export enum DIALOG_OPTON {
    CANCEL = 'CANCEL',
    CONFIRM = 'CONFIRM'
}
