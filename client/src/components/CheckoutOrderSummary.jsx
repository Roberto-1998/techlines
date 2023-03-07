import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
  Box,
  Link,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { createOrder, resetOrder } from '../redux/actions/orderActions';
import CheckoutItem from './CheckoutItem';
import { BsChatRight, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import PayPalButton from './PaypalButton';
import { resetCart } from '../redux/actions/cartActions';
import PaymentErrorModal from './PaymentErrorModal';
import PaymentSuccessModal from './PaymentSuccessModal';

const CheckoutOrderSummary = () => {
  const { onClose: onErrorClose, onOpen: onErrorOpen, isOpen: isErrorOpen } = useDisclosure();
  const { onClose: onSuccessClose, onOpen: onSuccessOpen, isOpen: isSuccessOpen } = useDisclosure();

  const colorMode = mode('gray.600', 'gray.400');
  const cartItems = useSelector((state) => state.cart);
  const { cart, subtotal, expressShipping } = cartItems;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const shippingInfo = useSelector((state) => state.order);
  const { error, shippingAddress } = shippingInfo;

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const shipping = useCallback(
    () => (expressShipping === 'true' ? 14.99 : subtotal <= 1000 ? 4.99 : 0),
    [expressShipping, subtotal]
  );

  const total = useCallback(() => {
    console.log(Number(shipping() === 0 ? Number(subtotal) : Number(subtotal) + shipping()).toFixed(2));
    return Number(shipping() === 0 ? Number(subtotal) : Number(subtotal) + shipping()).toFixed(2);
  }, [shipping, subtotal]);

  useEffect(() => {
    if (!error) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [error, shippingAddress, total, expressShipping, shipping, dispatch]);

  const onPaymentSuccess = async (data) => {
    onSuccessOpen();

    dispatch(
      createOrder({
        orderItems: cart,
        shippingAddress,
        paymentMethod: data.paymentSource,
        paymentDetails: data,
        shippingPrice: shipping(),
        totalPrice: total(),
        userInfo,
      })
    );

    dispatch(resetOrder());
    dispatch(resetCart());
  };

  const onPaymentError = () => {
    onErrorOpen();
  };

  return (
    <Stack spacing={'8'} rounded={'xl'} padding={'8'} width={'full'}>
      <Heading size={'md'}>Order Summary</Heading>
      {cart.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}

      <Stack spacing={'6'}>
        <Flex justify={'space-between'}>
          <Text fontWeight={'medium'} color={colorMode}>
            Subtotal
          </Text>
          <Text fontWeight={'medium'} color={colorMode}>
            {subtotal} &euro;
          </Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Text fontWeight={'medium'} color={colorMode}>
            Shipping
          </Text>
          <Text fontWeight={'medium'} color={colorMode}>
            {shipping() === 0 ? (
              <Badge rounded={'full'} px={'2'} fontSize={'0.8em'} colorScheme='green'>
                Free
              </Badge>
            ) : (
              <span>{shipping()} &euro;</span>
            )}
          </Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Text fontSize={'lg'} fontWeight={'semibold'}>
            Total
          </Text>
          <Text fontSize={'xl'} fontWeight={'extrabold'}>
            {Number(total())} &euro;
          </Text>
        </Flex>
      </Stack>
      <PayPalButton
        total={total}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        disabled={buttonDisabled}
      />
      <Box align={'center'}>
        <Text fontSize={'sm'}>Have questions? or need to complete your order?</Text>
        <Flex justifyContent={'center'} color={mode('orange.500', 'orange.100')}>
          <Flex align={'center'}>
            <BsChatRight />
            <Text m={'2'}>Live Chat</Text>
          </Flex>
          <Flex align={'center'}>
            <BsFillTelephoneFill />
            <Text m={'2'}>Phone</Text>
          </Flex>
          <Flex align={'center'}>
            <MdEmail />
            <Text m={'2'}>Email</Text>
          </Flex>
        </Flex>
      </Box>
      <Divider bg={mode('gray.400', 'gray.800')} />
      <Flex justifyContent={'center'} my={'6'} fontWeight={'semibold'}>
        <p>or </p>

        <Link ml={'5px'} as={ReactLink} to={'/products'}>
          Continue Shopping
        </Link>
      </Flex>
      <PaymentErrorModal isOpen={isErrorOpen} onOpen={onErrorOpen} onClose={onErrorClose} />
      <PaymentSuccessModal isOpen={isSuccessOpen} onOpen={onSuccessOpen} onClose={onSuccessClose} />
    </Stack>
  );
};

export default CheckoutOrderSummary;
