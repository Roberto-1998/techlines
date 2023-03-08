import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import React from 'react';

const CustomAlert = ({ error, status, title }) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
