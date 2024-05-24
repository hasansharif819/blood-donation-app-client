import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const profileAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMYProfile: build.query({
      query: () => {
        return {
          url: "/my-profile",
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    updateMYProfile: build.mutation({
      query: (data) => {
        return {
          url: "/my-profile",
          method: "PUT",
          data,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetMYProfileQuery, useUpdateMYProfileMutation } = profileAPi;
