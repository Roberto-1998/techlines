import { CloseButton, Flex, Select, useColorMode as mode, Stack, Image, Box, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addCartItem, removeCartItem } from '../redux/actions/cartActions';

const CartItem = ({ cartItem }) => {
  const { image, name, price, stock, qty, id } = cartItem;
  const dispatch = useDispatch();

  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify={'space-between'} align={'center'}>
      <Stack direction={'row'} spacing={'4'} width={'full'}>
        <Image
          rounded={'lg'}
          w={'120px'}
          h={'120px'}
          fit={'cover'}
          src={image}
          alt={name}
          draggable='false'
          loading='lazy'
        />
        <Box pt={'4'}>
          <Stack spacing={'0.5'} mr={'15px'}>
            <Text fontWeight={'medium'}>{name}</Text>
          </Stack>
        </Box>
      </Stack>
      <Flex
        w={'full'}
        mt={{ base: '4', md: '0' }}
        align={{ base: 'center', md: 'baseline' }}
        justify={'space-between'}
        display={'flex'}
      >
        <Select
          maxW={'64px'}
          focusBorderColor={mode('orange.500', 'orage.200')}
          value={qty}
          onChange={(e) => {
            dispatch(addCartItem(id, e.target.value));
          }}
        >
          {[...Array(stock).keys()].map((x) => (
            <option key={x} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </Select>
        <Text fontWeight={'bold'}>{price} &euro; </Text>
        <CloseButton onClick={() => dispatch(removeCartItem(id))} />
      </Flex>
    </Flex>
  );
};

export default CartItem;
