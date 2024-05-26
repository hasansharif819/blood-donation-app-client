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
  }),
});

export const { useRequestForBloodMutation } = requestAPi;
