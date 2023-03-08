import {
  TableContainer,
  Th,
  Tbody,
  Thead,
  Button,
  ListItem,
  UnorderedList,
  Wrap,
  Table,
  Tr,
  Td,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../redux/actions/userActions';
import { useEffect } from 'react';
import CustomSpinner from '../components/CustomSpinner';
import CustomAlert from '../components/CustomAlert';

const YourOrdersPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, orders, userInfo } = user;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  }, [userInfo, dispatch]);

  return (
    <>
      {loading ? (
        <Wrap justify={'center'} direction={'column'} align={'center'} mt={'20px'} minH={'100vh'}>
          <CustomSpinner />
        </Wrap>
      ) : error ? (
        <CustomAlert error={error} status={'error'} title={'We are sorry!. '} />
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
  );
};

export default YourOrdersPage;
