import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHeads,
  searchHeads,
  fetchSuggestions,
} from "../../../Redux/slice/RegionalHeads.slice.js";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RegionalCard = ({
  name,
  region,
  phone,
  email,
  address,
  city,
  imgSrc,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      {/* IMAGE */}
    <div className='relative w-full h-64 bg-[url("https://static.vecteezy.com/system/resources/previews/014/525/101/original/simple-background-design-suitable-for-pc-ppt-and-other-backgrounds-vector.jpg")] bg-cover bg-center flex items-center justify-center overflow-hidden'>
    <img
    src={imgSrc}
    alt={name}
    className="max-w-full max-h-full object-contain"
  />

  {/* REGION TAG */}
  <div className="absolute top-3 left-3 bg-[#ee8c2b] text-white text-xs px-3 py-1 rounded-full shadow">
    {region}
  </div>
</div>
      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

        <p className="text-sm text-gray-500 flex items-center gap-1">
          📍 {city}
        </p>

        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {address}
        </p>

        <div className="pt-2 space-y-1 text-sm">
          <p className="text-gray-700">
            📞 <span className="font-medium">{phone}</span>
          </p>

          <p className="text-blue-600 break-all">📧 {email}</p>
        </div>
      </div>
    </div>
  );
};

const RegionalHeads = () => {
  const dispatch = useDispatch();

  const heads = useSelector((state) => state.regionalHeads.heads) || [];
  const suggestions =
    useSelector((state) => state.regionalHeads.suggestions) || [];

  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchHeads());
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      dispatch(searchHeads(value));
      dispatch(fetchSuggestions(value));
    }

    if (value.length === 0) {
      dispatch(fetchHeads());
    }
  };

  const handleSuggestionClick = (text) => {
    setQuery(text);
    dispatch(searchHeads(text));
  };

  return (
    <section className="py-16 bg-gray-50">
      {/* TITLE */}
      <div className="container mx-auto px-6 text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Our Regional Heads</h2>

        <p className="text-gray-600 mt-2">
          Leading on-the-ground impact across the globe.
        </p>

        <div className="h-1 w-16 bg-[#ee8c2b] mx-auto mt-4"></div>
      </div>

      {/* SEARCH BAR */}
      <div className="flex justify-center mb-10 text-black">
        <div className="relative w-full max-w-md">
          <input
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder="Search by area, city, landmark..."
            className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ee8c2b]"
          />

          {Array.isArray(suggestions) &&
            suggestions.length > 0 &&
            query.length > 2 && (
              <div className="absolute top-12 left-0 w-full bg-white border rounded-lg shadow-lg z-50 max-h-52 overflow-y-auto">
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(item.suggestion)}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {item.suggestion}
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* SLIDER */}
      <div className="container mx-auto px-6">
        {heads.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {heads.map((leader) => (
              <SwiperSlide key={leader._id}>
                <RegionalCard
                  name={leader.name}
                  region={leader.region}
                  phone={leader.phone}
                  email={leader.email}
                  address={leader.address}
                  city={leader.city}
                  imgSrc={leader.photoUrl}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">No regional heads found.</p>
        )}
      </div>
    </section>
  );
};

export default RegionalHeads;
