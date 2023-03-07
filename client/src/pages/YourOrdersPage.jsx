import {
  TableContainer,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Th,
  Tbody,
  Thead,
  Button,
  ListItem,
  UnorderedList,
  Wrap,
  AlertTitle,
  Table,
  Tr,
  Td,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserOrders } from '../redux/actions/userActions';
import { useEffect } from 'react';

const YourOrdersPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, orders, userInfo } = user;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  }, [userInfo, dispatch]);

  return userInfo ? (
    <>
      {loading ? (
        <Wrap justify={'center'} direction={'column'} align={'center'} mt={'20px'} minH={'100vh'}>
          <Stack direction={'row'} spacing={4}>
            <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size={'xl'} />
          </Stack>
        </Wrap>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        orders && (
          <TableContainer minHeight={'100vh'}>
            <Table variant={'striped'}>
              <Thead>
                <Tr>
                  <Th>Order Id</Th>
                  <Th>Order Date</Th>
                  <Th>Paid Total</Th>
                  <Th>Items</Th>
                  <Th>Print Receipt</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td>{new Date(order.createdAt).toDateString()}</Td>
                    <Td>
                      {order.totalPrice} &euro; via {order.paymentMethod}
                    </Td>
                    <Td>
                      {order.orderItems.map((item) => (
                        <UnorderedList key={item._id}>
                          <ListItem>
                            {item.qty} x {item.name} (${item.price} ech)
                          </ListItem>
                        </UnorderedList>
                      ))}
                    </Td>
                    <Td>
                      <Button variant='outline'>Receipt</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )
      )}
    </>
  ) : (
    <Navigate to={'/login'} replace={true} />
  );
};

export default YourOrdersPage;
