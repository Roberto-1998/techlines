import { Spinner, Stack } from '@chakra-ui/react';
import React from 'react';

const CustomSpinner = () => {
  return (
    <Stack direction={'row'} spacing={4} justifyContent={'center'}>
      <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size={'xl'} />
    </Stack>
  );
};

export default CustomSpinner;
