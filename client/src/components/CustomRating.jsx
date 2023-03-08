import { HStack } from '@chakra-ui/react';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';

const CustomRating = ({ value }) => {
  return (
    <HStack spacing={'2px'}>
      <AiFillStar w={'14px'} color='#E19E73' />
      <AiFillStar w={'14px'} color={value >= 2 ? '#E19E73' : '#EBEFF3'} />
      <AiFillStar w={'14px'} color={value >= 3 ? '#E19E73' : '#EBEFF3'} />
      <AiFillStar w={'14px'} color={value >= 4 ? '#E19E73' : '#EBEFF3'} />
      <AiFillStar w={'14px'} color={value >= 5 ? '#E19E73' : '#EBEFF3'} />
    </HStack>
  );
};

export default CustomRating;
