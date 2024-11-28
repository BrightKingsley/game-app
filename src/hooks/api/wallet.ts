import {useCallback} from 'react';
import {Alert} from 'react-native';

import {ApiError} from '#/lib/utils/api/axios';
import apiRoutes from '#/lib/utils/api/routes';

import {useAppSelector} from '../store';
import useRequest from './useRequest';
import {
  addTransaction,
  setWalletDetails,
  updateBalance,
} from '$/src/store/slices/wallet';

export default function useWalletApi() {
  const {fetchData} = useRequest();

  // Function to fetch wallet details, including balance and transactions
  const getWalletDetails = useCallback(async () => {
    try {
      const data = await fetchData<{balance: number; transactions: any[]}>(
        'get',
        apiRoutes.wallet.details.route,
      );
      setWalletDetails(data); // Update context with wallet details
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(
          `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
        );
      } else {
        console.error('Unexpected Error:', error);
      }
      return null;
    }
  }, [fetchData, setWalletDetails]);

  // Function to handle top-up
  const topUp = useCallback(
    async (amount: string) => {
      try {
        if (!amount || isNaN(parseFloat(amount))) {
          return Alert.alert(
            'Invalid Amount',
            'Please enter a valid top-up amount.',
          );
        }

        const data = await fetchData<{transactionId: string}>(
          'post',
          apiRoutes.wallet['top-up'].route,
          {
            amount: parseFloat(amount),
          },
        );

        // Update balance and add transaction
        updateBalance(parseFloat(amount));
        addTransaction({
          id: data.transactionId,
          amount: parseFloat(amount),
          type: 'top-up',
        });
        return data;
      } catch (error) {
        if (error instanceof ApiError) {
          console.error(
            `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
          );
        } else {
          console.error('Unexpected Error:', error);
        }
        return null;
      }
    },
    [fetchData, updateBalance, addTransaction],
  );

  // Optional: Function to fetch recent transactions if needed
  const getTransactions = useCallback(async () => {
    try {
      const data = await fetchData<{transactions: any[]}>(
        'get',
        apiRoutes.wallet.transactions.route,
      );
      return data.transactions; // Return the list of transactions
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(
          `API Error: ${error.message} (Status: ${error.status}, ${error.statusText})`,
        );
      } else {
        console.error('Unexpected Error:', error);
      }
      return null;
    }
  }, [fetchData]);

  return {
    topUp,
    getWalletDetails,
    getTransactions,
  };
}
