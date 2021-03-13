import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogFooter, Button, AlertDialogHeader, AlertDialogBody } from '@chakra-ui/react';
import React from 'react';
import '../../../styles/dialog.css';
import { DefaultActive, DefaultDialogProps, DefaultFocus, DefaultHover } from '../dialog-options';

const AppInformaiton = (props: DefaultDialogProps) => {
    const { isOpen, setIsOpen } = props;
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
                        Thanks for Visting!
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <p>
                            Welcome to the my fanmade Genshin Wishing Simulator. I am an active player and just wanted to create a simulation of the dopamine we all get from 
                            wishing without breaking the bank. I tried to get the experience as close as I could while allowing for anyone to wish on previous banners.
                        </p>
                        <hr style={{margin: '10px'}}/>
                        Public Repo: <a href='https://github.com/Jon-Ly/GenshinWishSimulator' style={{color: '#4a7fd4'}}>Github</a>
                        <hr style={{margin: '10px'}}/>
                        <p>※Disclaimer※ Most images were taken from 3rd-party sites or taken straight from the game through screenshots and the Kamera.</p>
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
