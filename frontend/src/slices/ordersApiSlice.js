import { apiSlice } from '../slices/apiSlice';
import { ORDERS_URL, RAZORPAY_ORDER_URL, RAZORPAY_VERIFY_URL } from '../constants';

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
        }),
        placeOrderInRazorpay: builder.mutation({
            query: (data) => ({
                url: RAZORPAY_ORDER_URL,
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
        verifyOrderInRazorpay: builder.mutation({
            query: (data) => ({
                url: RAZORPAY_VERIFY_URL,
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-razorpay-signature': data.razorpay_signature,
                 },
                body: data,
                credentials: 'include'
            })
        })
    })
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePlaceOrderInRazorpayMutation, useVerifyOrderInRazorpayMutation } = ordersApiSlice;