import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Alert,
  AlertTitle,
  AlertIcon,
  Wrap,
  useToast,
  Stack,
} from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';

const PaymentSuccessModal = ({ isOpen, onClose, onOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const logoutHandle = () => {
    dispatch(logout());
    toast({
      description: 'You have been loggd out. ',
      status: 'sucess',
      isClosable: true,
    });
    navigate('/products');
  };

  return (
    <>
      <Modal size={'full'} isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <ModalOverlay>
          <ModalContent>
            <ModalBody>
              <Wrap justify={'center'} direction={'column'} align={'center'} mt={'20px'}>
                <Alert
                  status='success'
                  variant={'subtle'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  textAlign={'center'}
                  height={'auto'}
                >
                  <AlertIcon boxSize={'55px'} />

                  <AlertTitle pt={'8px'} fontSize={'xl'}>
                    Payment Successful
                  </AlertTitle>

                  <Stack mt={'20px'} minW={'200px'}>
                    <Button colorScheme='teal' variant={'outline'} as={ReactLink} to={'/your-orders'}>
                      Your Orders
                    </Button>
                    <Button colorScheme='teal' variant={'outline'} as={ReactLink} to={'/products'}>
                      Products
                    </Button>
                    <Button colorScheme='teal' variant={'outline'} onClick={logoutHandle}>
                      Logout
                    </Button>
                  </Stack>
                </Alert>
              </Wrap>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default PaymentSuccessModal;
