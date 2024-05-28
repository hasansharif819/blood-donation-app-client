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
    getMyDonationRequestsMadeByUser: build.query({
      query: () => {
        return {
          url: "/donation-request",
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    donationRequestsMadeByMe: build.query({
      query: () => {
        return {
          url: "/donation-request-made-by-me",
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    updateMYProfile: build.mutation({
      query: (values) => {
        return {
          url: "/update-my-profile",
          method: "PUT",
          data: values,
          // contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    updateProfilePicture: build.mutation({
      query: (values) => {
        return {
          url: "/update-profile-picture",
          method: "POST",
          data: values,
          // contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
  useUpdateProfilePictureMutation,
  useGetMyDonationRequestsMadeByUserQuery,
  useDonationRequestsMadeByMeQuery,
} = profileAPi;
