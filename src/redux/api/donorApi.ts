import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";
import { IDonor } from "@/types/doctor";

export const donorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // createDonor: build.mutation({
    //    query: (data) => ({
    //       url: '/register',
    //       method: 'POST',
    //       contentType: 'multipart/form-data',
    //       data,
    //    }),
    //    invalidatesTags: [tagTypes.user],
    // }),

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
        url: `/door-list/${id}`,
        method: "DELETE",
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
    // update a doctor
    updateDonor: build.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: `/donor/${data.id}`,
          method: "PATCH",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  // useCreateDonorMutation,
  useGetAllDonorsQuery,
  useDeleteDonorMutation,
  useGetDonorQuery,
  useUpdateDonorMutation,
} = donorApi;
