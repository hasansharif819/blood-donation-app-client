import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const requestAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    requestForBlood: build.mutation({
      query: (values) => {
        return {
          url: "/donation-request",
          method: "POST",
          data: values,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    updateRequestStatus: build.mutation({
      query: (values) => {
        return {
          url: `/donation-request/${values.id}`,
          method: "PUT",
          data: values,
        };
      },
      invalidatesTags: [tagTypes.user, tagTypes.request],
    }),

    //Delete my Request
    deleteMyRequest: build.mutation({
      query: (id) => {
        return {
          url: `/delete-my-donation-request/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    //Update Request made by me
    updateRequestMadeByMe: build.mutation({
      query: (values) => {
        return {
          url: `/update-my-donation-request/${values.id}`,
          method: "PATCH",
          data: values,
        };
      },
      invalidatesTags: [tagTypes.user, tagTypes.request],
    }),
  }),
});

export const {
  useRequestForBloodMutation,
  useUpdateRequestStatusMutation,
  useDeleteMyRequestMutation,
  useUpdateRequestMadeByMeMutation,
} = requestAPi;
