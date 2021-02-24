import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Input, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IPrimoTopUp } from '../../../constants/primo-top-ups';
import { ACTION_TYPE } from '../../../state-management/reducer';
import { useWishDispatch } from '../../../state-management/store';
import { DefaultActive, DefaultDialogProps, DefaultFocus, DefaultHover, DIALOG_OPTON } from '../dialog-options';
import '../../../styles/dialog.css';
import './pay-dialog.css';

interface PayDialogProps extends DefaultDialogProps {
    topUp: IPrimoTopUp
}

const PayDialog = (props: PayDialogProps) => {
    const { topUp, isOpen, setIsOpen } = props;
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const wishDispatch = useWishDispatch();
    const cancelRef = React.useRef<any>();
    
    const onClose = (option: DIALOG_OPTON): void => {
        if (option === DIALOG_OPTON.CONFIRM) {
            setIsProcessing(true);
            setTimeout(() => {
                wishDispatch({type: ACTION_TYPE.PAY, payload: topUp});
                setIsOpen(false);
                setIsProcessing(false);
            }, 1000);
        } else {
            setIsOpen(false);
        }
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => {}}
            isCentered={true}
        >
            <AlertDialogOverlay>
                <AlertDialogContent width='550px' padding='25px'>
                    <AlertDialogHeader textAlign='center' fontSize='24px' fontWeight='bold'>
                        Pay
                    </AlertDialogHeader>
                    
                    <AlertDialogBody className='flex-column' alignItems={isProcessing ? 'center': ''}>
                        { !isProcessing ? (
                            <>
                                <div className='flex-row top-up-description'>
                                    <p className='top-up-description-primogems'>Product {topUp.primogems} Primogems</p>
                                    <p className='top-up-description-cost'>${topUp.cost}</p>
                                </div>
                                <form>
                                    <p>Card Number:</p>
                                    <Input placeholder='Type anything'/>
                                </form>
                            </>
                            ) : (
                                <Spinner/>
                            )
                        }
                    </AlertDialogBody>

                    <AlertDialogFooter className='dialog-footer'>
                        {
                            !isProcessing && (
                            <>
                                <Button
                                    className='dialog-button'
                                    color='#DCBC60'
                                    ref={cancelRef}
                                    onClick={() => onClose(DIALOG_OPTON.CANCEL)} 
                                    backgroundColor='#FFFFFF'
                                    border="1px solid #000000"
                                    _active={DefaultActive}
                                    _focus={DefaultFocus}
                                    _hover={DefaultHover('#FFFFFF')}>
                                    Cancel
                                </Button>
                                <Button
                                    className='dialog-button'
                                    color='#DCBC60'
                                    backgroundColor='#232323'
                                    onClick={() => onClose(DIALOG_OPTON.CONFIRM)}
                                    ml={3}
                                    _active={DefaultActive}
                                    _focus={DefaultFocus}
                                    _hover={DefaultHover('#232323')}>
                                    Proceed
                                </Button>
                            </>
                            )
                        }
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default PayDialog;
