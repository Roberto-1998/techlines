import { Flex, Heading, Stack, Text, useColorModeValue as mode, Badge, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';

const CartOrderSummary = () => {
  const [buttonLoading, setButtonLoading] = useState();
  const standardShipping = Number(4.99).toFixed(2);
  const cartItems = useSelector((state) => state.cart);
  const { subtotal } = cartItems;
  const navigate = useNavigate();

  const checkoutHandle = () => {
    setButtonLoading(true);
    navigate('/checkout');
  };

  return (
    <Stack spacing={'8'} borderWidth={'1px'} rounded={'lg'} padding={'8'} w={'full'}>
      <Heading size={'md'}>Order Sumary</Heading>
      <Stack spacing={'6'}>
        <Flex justify={'space-between'}>
          <Text fontWeight={'medium'} color={mode('gray.600', 'gray.400')}>
            Subtotal
          </Text>
          <Text fontWeight={'md'}>{Number(subtotal).toFixed(2)} &euro;</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Text fontWeight={'medium'} color={mode('gray.600', 'gray.400')}>
            Shipping
          </Text>
          <Text fontWeight={'medium'}>
            {subtotal <= 100 ? (
              <span>{standardShipping} &euro;</span>
            ) : (
              <Badge rounded={'full'} px={'2'} fontSize={'0.8em'} colorScheme='green'>
                Free
              </Badge>
            )}
          </Text>
        </Flex>
        <Flex fontSize={'lg'} fontWeight={'semibold'} justifyContent={'space-between'} align={'center'}>
          <Text fontSize={'xl'} fontWeight={'extrabold'}>
            Total
          </Text>
          <Text fontSize={'xl'} fontWeight={'extrabold'}>
            {subtotal <= 100
              ? Number(subtotal).toFixed(2) + Number(standardShipping).toFixed(2)
              : Number(subtotal).toFixed(2)}{' '}
            &euro;
          </Text>
        </Flex>
      </Stack>
      <Button
        as={ReactLink}
        to={'/checkout'}
        colorScheme='orange'
        size={'lg'}
        fontSize={'md'}
        rightIcon={<FaArrowRight />}
        isLoading={buttonLoading}
        onClick={() => checkoutHandle()}
      >
        Checkout
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
