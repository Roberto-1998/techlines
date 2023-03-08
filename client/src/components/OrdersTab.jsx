import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  useDisclosure,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, deleteOrder, setDelivered, resetErrorAndRemoval } from '../redux/actions/adminActions';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const OrdersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [orderToDelete, setOrderToDelete] = useState('');
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading, orderList, deliveredFlag, orderRemoval } = admin;
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(resetErrorAndRemoval());

    if (orderRemoval) {
      toast({
        description: 'Order has been removed. ',
        status: 'success',
        isClosable: true,
      });
    }

    if (deliveredFlag) {
      toast({
        description: 'Order has been set to delivered. ',
        status: 'success',
        isClosable: true,
      });
    }
  }, [dispatch, toast, orderRemoval, deliveredFlag]);

  const openDeleteConfirmBox = (order) => {
    setOrderToDelete(order);
    onOpen();
  };

  const onSetToDelivered = (order) => {
    dispatch(resetErrorAndRemoval());
    dispatch(setDelivered(order._id));
  };

  return (
    <Box>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <Wrap justify={'center'}>
          <Stack direction={'row'} spacing={'4'}>
            <Spinner mt={'20px'} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size={'xl'} />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <TableContainer maxW={'90vw'}>
            <Table variant={'simple'} size={'sm'}>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Shipping</Th>
                  <Th>Items Ordered</Th>
                  <Th>Payment method</Th>
                  <Th>Shipping Price</Th>
                  <Th>Total</Th>
                  <Th>Delivered</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orderList &&
                  orderList.map((order) => (
                    <Tr key={order._id}>
                      <Td>{new Date(order.createdAt).toDateString()}</Td>
                      <Td>{order.username}</Td>
                      <Td>{order.email}</Td>
                      <Td>
                        <Text>
                          <i>Address:</i> {order.shippingAddress.address}
                        </Text>
                        <Text>
                          <i>City:</i> {order.shippingAddress.postalCode} {order.shippingAddress.city}
                        </Text>
                        <Text>
                          <i>Country:</i> {order.shippingAddress.country}{' '}
                        </Text>
                      </Td>
                      <Td>
                        {order.orderItems.map((item) => (
                          <Text key={item._id}>
                            {item.qty} x {item.name}
                          </Text>
                        ))}
                      </Td>
                      <Td>{order.paymentMethod}</Td>
                      <Td>{order.shippingPrice}</Td>
                      <Td>{order.totalPrice}</Td>
                      <Td>
                        <Flex justifyContent={'center'}>
                          {order.isDelivered ? <BsFillCheckCircleFill /> : 'Pending'}
                        </Flex>
                      </Td>
                      <Td>
                        <Flex direction={'column'}>
                          <Button variant={'outline'} onClick={() => openDeleteConfirmBox(order)} gap={'5px'}>
                            <RiDeleteBin5Fill /> Remove Order
                          </Button>
                          {!order.isDelivered && (
                            <Button mt={'4px'} variant={'outline'} onClick={() => onSetToDelivered(order)}>
                              <TbTruckDelivery />
                              <Text ml='5px'>Delivered</Text>
                            </Button>
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ConfirmRemovalAlert
            cancelRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            itemToDelete={orderToDelete}
            deleteAction={deleteOrder}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersTab;
