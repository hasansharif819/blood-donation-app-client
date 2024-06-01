import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";
import { IDonor } from "@/types/donor";

export const donorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDonor: build.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        // contentType: 'multipart/form-data',
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getAllDonors: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/donor-list",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDonor[], meta: IMeta) => {
        return {
          donors: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),

    deleteDonor: build.mutation({
      query: (id) => ({
        url: `/donors/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    //get single donor
    getDonor: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/donor-list/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    // update a donor
    updateDonor: build.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: `/donor/${data.id}`,
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    // update donor By Admin
    updateDonorByAdmin: build.mutation({
      query: (data) => {
        return {
          url: "/update-user",
          method: "PUT",
          data,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useCreateDonorMutation,
  useGetAllDonorsQuery,
  useDeleteDonorMutation,
  useGetDonorQuery,
  useUpdateDonorMutation,
  useUpdateDonorByAdminMutation,
} = donorApi;
