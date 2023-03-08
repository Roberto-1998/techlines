import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomSpinner from './CustomSpinner';

const PayPalButton = ({ total, onPaymentSuccess, onPaymentError, disabled }) => {
  const [paypalClient, setPayPalCLient] = useState(null);

  useEffect(() => {
    const paypalKey = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      setPayPalCLient(clientId);
    };
    paypalKey();
  }, [paypalClient]);

  return !paypalClient ? (
    <CustomSpinner />
  ) : (
    <PayPalScriptProvider options={{ 'client-id': paypalClient }}>
      <PayPalButtons
        disabled={disabled}
        forceReRender={[total(), paypalClient]}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onPaymentSuccess(data);
          });
        }}
        onError={(err) => {
          onPaymentError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
