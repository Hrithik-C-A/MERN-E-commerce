import { apiSlice } from '../slices/apiSlice';
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                credentials: 'include',
                body: {...order},
            })
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                credentials: 'include'
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = ordersApiSlice;