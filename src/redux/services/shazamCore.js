import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "21a7532524msh4a7f3356a889f53p1955b1jsn57eea86519e6"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "/charts/world" }),
    getSongDetails: builder.query({
      query: (songid) => `/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: (songid) => `/tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/details?artist_id=${artistId}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `charts/country?country_code=${countryCode}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
} = shazamCoreApi;
