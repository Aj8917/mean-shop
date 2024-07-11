import { apiSlice } from "./apiSlice";
import { PRODCUTS_URL,UPLOADS_URL } from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
       
        getProducts: builder.query({
            query: () => ({
                url: PRODCUTS_URL,
            }),
            providesTags : ['Products'],
            keepUnusedDataFor: 5,
        }),

        getPoductsDetails:builder.query({
            query:(productId)=>({
                url: `${PRODCUTS_URL}/${productId}`,
            }),
            keepUnusedDataFor:5,     
        }),

        createProduct :builder.mutation({
            query:()=>({
                url: PRODCUTS_URL,
                method : 'POST',
            }),
            invalidatesTags: ['Product'],
        }),

        updateProduct: builder.mutation({
            query :(data)=>({
                url : `${PRODCUTS_URL}/${data.productId}`,
                method:'PUT',
                body:data,

            }),
            invalidatesTags :['Products'],
        }),
        
        uploadProductImage: builder.mutation({
            query: (data) =>({
                url : `${UPLOADS_URL}`,
                method: 'POST',
                body:data,
            })
        }),

    }),
});

export const { 
               useGetProductsQuery,
               useGetPoductsDetailsQuery, 
               useCreateProductMutation,
               useUpdateProductMutation, 
               useUploadProductImageMutation,
            } = productsApiSlice;