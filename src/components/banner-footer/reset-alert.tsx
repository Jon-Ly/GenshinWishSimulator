import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import React from 'react';
import { ACTION_TYPE } from '../../state-management/reducer';
import { useWishDispatch } from '../../state-management/store';

export enum DIALOG_OPTON {
    CANCEL = 'CANCEL',
    CONFIRM = 'CONFIRM'
}

interface ResetAlertProps {
    isOpen: boolean;
    setIsOpen: (status: boolean) => void;
}

const ResetAlert = (props: ResetAlertProps) => {
    const { isOpen, setIsOpen } = props;
    const wishDispatch = useWishDispatch();
    const cancelRef = React.useRef<any>();

    const ButtonWidth = '135px';
    const ButtonHeight = '55px';

    const onClose = (option: DIALOG_OPTON): void => {
        if (option === DIALOG_OPTON.CONFIRM) {
            wishDispatch({type: ACTION_TYPE.RESET});
        }
        setIsOpen(false);
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => {}}
            isCentered={true}
        >
            <AlertDialogOverlay>
                <AlertDialogContent width='400px' padding='25px'>
                    <AlertDialogBody textAlign='center' fontSize='24px'>
                        Do you want to reset?
                    </AlertDialogBody>

                    <AlertDialogFooter width='100%' justifyContent='center'>
                        <Button ref={cancelRef} onClick={() => onClose(DIALOG_OPTON.CANCEL)} width={ButtonWidth} height={ButtonHeight} backgroundColor='#e2ded4'>
                            Cancel
                        </Button>
                        <Button color='white' backgroundColor='#232323' onClick={() => onClose(DIALOG_OPTON.CONFIRM)} ml={3} width={ButtonWidth} height={ButtonHeight}>
                            Reset
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default ResetAlert;
