import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery("DE");

  // Get by country doesnt work for Slovenia --> "msg":"value is not a valid enumeration member; permitted: 'DE', 'PT', 'DK', 'HR', 'UA', 'HU', 'MA', 'ID', 'IE', 'US', 'EG', 'IL', 'UY', 'IN', 'ZA', 'IT', 'MX', 'MY', 'ES', 'VE', 'AR', 'AT', 'AU', 'RO', 'NL', 'NO', 'RU', 'BE', 'FI', 'BG', 'JP', 'FR', 'NZ', 'SA', 'BR', 'SE', 'SG', 'BY', 'GB', 'CA', 'CH', 'KR', 'CL', 'GR', 'CN', 'CO', 'KZ', 'CR', 'TH', 'PE', 'CZ', 'PL', 'TR'","type":"type_error.enum","ctx":{"enum_values":["DE","PT","DK","HR","UA","HU","MA","ID","IE","US","EG","IL","UY","IN","ZA","IT","MX","MY","ES","VE","AR","AT","AU","RO","NL","NO","RU","BE","FI","BG","JP","FR","NZ","SA","BR","SE","SG","BY","GB","CA","CH","KR","CL","GR","CN","CO","KZ","CR","TH","PE","CZ","PL","TR"

  console.log(country);

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_XMRIy6LT0GTg1KnuniujHFLfdK6Tk`
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;

  if (error && country !== "") return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You:
        <span className="font-black"> {country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
