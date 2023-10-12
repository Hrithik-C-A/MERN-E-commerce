import { apiSlice } from '../slices/apiSlice';
import { ORDERS_URL, RAZORPAY_ORDER_URL, RAZORPAY_VERIFY_URL, RAZORPAY_URL } from '../constants';

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
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
              url: `${ORDERS_URL}/${orderId}/pay`,
              method: 'PUT',
              credentials:'include',
              body: details,
            }),
        }),
        getRazorpayClientId : builder.query({
            query: () => ({
                url: RAZORPAY_URL,
                credentials: 'include'
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myorders`,
                credentials: 'include'
            }),
            keepUnusedDataFor: 5
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
                credentials: 'include'
            }),
            keepUnusedDataFor: 5,
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
                credentials: 'include',
            }),
        }),
    })
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePlaceOrderInRazorpayMutation, useVerifyOrderInRazorpayMutation, useGetRazorpayClientIdQuery, usePayOrderMutation, useGetMyOrdersQuery, useGetOrdersQuery, useDeliverOrderMutation } = ordersApiSlice;