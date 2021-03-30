import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogFooter, Button, AlertDialogHeader, AlertDialogBody } from '@chakra-ui/react';
import React from 'react';
import '../../../styles/dialog.css';
import { DefaultActive, DefaultDialogProps, DefaultFocus, DefaultHover } from '../dialog-options';

interface AppInformationProps extends DefaultDialogProps {
    children?: React.ReactNode,
    title?: string
}

const AppInformaiton = (props: AppInformationProps) => {
    const { isOpen, setIsOpen, children, title } = props;
    const cancelRef = React.useRef<any>();

    const onClose = (): void => setIsOpen(false);

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered={true}
        >
            <AlertDialogOverlay>
                <AlertDialogContent width='700px' padding='25px'>
                    <AlertDialogHeader textAlign='center' fontSize='24px' fontWeight='bold'>
                        {title}
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        {children}
                    </AlertDialogBody>
                    <AlertDialogFooter className='dialog-footer'>
                        <Button
                            className='dialog-button'
                            color='white'
                            backgroundColor='#232323'
                            onClick={onClose}
                            ml={3}
                            _active={DefaultActive}
                            _focus={DefaultFocus}
                            _hover={DefaultHover('#232323')}>
                            Ok
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default AppInformaiton;
