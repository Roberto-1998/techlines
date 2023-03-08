import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';

const CustomButtonRating = ({ value, setRating }) => {
  return (
    <HStack spacing={'2px'}>
      <Button variant={'outline'} onClick={() => setRating(1)}>
        <AiFillStar w={'14px'} color='#E19E73' />
      </Button>
      <Button variant={'outline'} onClick={() => setRating(2)}>
        <AiFillStar w={'14px'} color={value >= 2 ? '#E19E73' : '#EBEFF3'} />
      </Button>
      <Button variant={'outline'} onClick={() => setRating(3)}>
        <AiFillStar w={'14px'} color={value >= 3 ? '#E19E73' : '#EBEFF3'} />
      </Button>
      <Button variant={'outline'} onClick={() => setRating(4)}>
        <AiFillStar w={'14px'} color={value >= 4 ? '#E19E73' : '#EBEFF3'} />
      </Button>
      <Button variant={'outline'} onClick={() => setRating(5)}>
        <AiFillStar w={'14px'} color={value >= 5 ? '#E19E73' : '#EBEFF3'} />
      </Button>
    </HStack>
  );
};

export default CustomButtonRating;
