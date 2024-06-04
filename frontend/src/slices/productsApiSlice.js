import { apiSlice } from "./apiSlice";
import { PRODCUTS_URL } from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
       
        getProducts: builder.query({
            query: () => ({
                url: PRODCUTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),

        getPoductsDetails:builder.query({
            query:(productId)=>({
                url: `${PRODCUTS_URL}/${productId}`,
            }),
            keepUnusedDataFor:5,     
        })
   
    }),
});

export const { useGetProductsQuery ,useGetPoductsDetailsQuery } = productsApiSlice;