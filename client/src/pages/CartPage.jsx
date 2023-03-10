import {
  useColorModeValue as mode,
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Wrap,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { Link as ReactLink } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartOrderSummary from '../components/CartOrderSummary';
import CustomSpinner from '../components/CustomSpinner';
import CustomAlert from '../components/CustomAlert';

const CartPage = () => {
  const cartInfo = useSelector((state) => state.cart);
  const { cart, loading, error } = cartInfo;

  return (
    <Wrap spacing={'30px'} justify={'center'} minHeight={'100vh'}>
      {loading ? (
        <CustomSpinner />
      ) : error ? (
        <CustomAlert error={error} status={'error'} title={'We are sorry!.'} />
      ) : cart.length <= 0 ? (
        <Alert status='warning'>
          <AlertIcon />
          <AlertTitle>Your cart is empty.</AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to={'/products'}>
              Click here to see our products.
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          maxW={{ base: '3xl', lg: '7xl' }}
          mx={'auto'}
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '4', md: '8', lg: '12' }}
        >
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'flex-start' }}
            spacing={{ base: '8', md: '16' }}
          >
            <Stack spacing={{ base: '8', md: '10' }} flex={'2'}>
              <Heading fontSize={'2xl'} fontWeight={'extrabold'}>
                Shopping Cart
              </Heading>
              <Stack spacing={'6'}>
                {cart.map((cartItem) => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </Stack>
            </Stack>
            <Flex direction={'column'} align={'center'} flex={'1'}>
              <CartOrderSummary />
              <HStack mt={'6'} fontWeight={'semibold'}>
                <p>or</p>
                <Link as={ReactLink} to={'/products'} color={mode('orange.500', 'orange.200')}>
                  Continue Shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default CartPage;
