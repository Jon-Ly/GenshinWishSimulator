import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, Button, AlertDialogBody } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { DefaultActive, DefaultFocus, DefaultHover, DefaultDialogProps } from '../dialog-options';

const InsufficientPrimogemsDialog = (props: DefaultDialogProps) => {
    const { isOpen, setIsOpen } = props;
    const cancelRef = React.useRef<any>();

    const onClose = (): void => setIsOpen(false);

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
                        Insufficent Primogems
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Looks like you need more primogems. Go buy more!
                    </AlertDialogBody>

                    <AlertDialogFooter className='dialog-footer'>
                        <Button
                            className='dialog-button'
                            ref={cancelRef} 
                            onClick={onClose}
                            backgroundColor='#e2ded4'
                            _active={DefaultActive}
                            _focus={DefaultFocus}
                            _hover={DefaultHover('#e2ded4')}>
                            Cancel
                        </Button>
                        <Link to='/shop'>
                            <Button
                                className='dialog-button'
                                color='white'
                                backgroundColor='#232323'
                                ml={3}
                                _active={DefaultActive}
                                _focus={DefaultFocus}
                                _hover={DefaultHover('#232323')}>
                                Buy
                            </Button>
                        </Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default InsufficientPrimogemsDialog;
