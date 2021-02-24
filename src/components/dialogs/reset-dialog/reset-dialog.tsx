import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogFooter, Button, AlertDialogHeader } from '@chakra-ui/react';
import React from 'react';
import { ACTION_TYPE } from '../../../state-management/reducer';
import { useWishDispatch } from '../../../state-management/store';
import '../../../styles/dialog.css';
import { DefaultActive, DefaultDialogProps, DefaultFocus, DefaultHover, DIALOG_OPTON } from '../dialog-options';

const ResetAlert = (props: DefaultDialogProps) => {
    const { isOpen, setIsOpen } = props;
    const wishDispatch = useWishDispatch();
    const cancelRef = React.useRef<any>();

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
                    <AlertDialogHeader textAlign='center' fontSize='24px' fontWeight='bold'>
                        Do you want to reset?
                    </AlertDialogHeader>

                    <AlertDialogFooter className='dialog-footer'>
                        <Button
                            className='dialog-button'
                            ref={cancelRef} 
                            onClick={() => onClose(DIALOG_OPTON.CANCEL)} 
                            backgroundColor='#e2ded4'
                            _active={DefaultActive}
                            _focus={DefaultFocus}
                            _hover={DefaultHover('#e2ded4')}>
                            Cancel
                        </Button>
                        <Button
                            className='dialog-button'
                            color='white'
                            backgroundColor='#232323'
                            onClick={() => onClose(DIALOG_OPTON.CONFIRM)}
                            ml={3}
                            _active={DefaultActive}
                            _focus={DefaultFocus}
                            _hover={DefaultHover('#232323')}>
                            Reset
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default ResetAlert;
