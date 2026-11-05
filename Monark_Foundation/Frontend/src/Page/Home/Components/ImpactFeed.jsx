import React, { useRef } from "react";
import Logo from "../../../../Public/Image/Logo.png";

import {
  FaHeart,
  FaRegComment,
  FaPaperPlane,
  FaBookmark,
  FaArrowLeft,
  FaArrowRight,
  FaInstagram
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const impactPosts = [
  {
    location: "Community Center, Nairobi",
    caption:
      "Education is the most powerful tool which you can use to change the world. Today we opened our 5th learning center! 📚🧡",
    time: "2 hours ago",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvaLA3OqX7A6Hm_Z97fBRtF8cDyHqsjJw480WoCf6GmciRhKpx19KASDNCjyLcQ-WV99Lkdlyq1GgV5voc-sh0P1XfvPH6ZDfVbJJQi7_v0G8HjLQ6NSntqu-qs9neyroQLwrtyru5TMDdcNR9LVfvBnpXsoplfUk0spXmAb4jbiDKbyC7_4-lJbpzwJp2Z5WMnpVus3mzhWplB9eQQ-DqX_y3MQkn_fifNt_S29kBJIevEUYGNmkwBZa0eKTkTnSNFodDRamMZ9DP",
    alt: "Group of smiling children at a community center",
  },
  {
    location: "Organic Farms",
    caption:
      "Sustainable agriculture training in progress! Empowering local farmers with modern techniques. 🌱 #Sustainability",
    time: "1 day ago",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAeeF6MAAjtsO98c1WgT88_Dt4PqQd7kT-4GKXd7RtDZUmEG-IOk9eUwpU9xMbPLQGc3WVmTanQcYazabmajUhluTiGJakM0vEQI1ksNFsgTSn_8OokI79EO4ClL56tN2q4B86ukTNM0icQwU09ehjUdb-rukeyFijqI2GCcfMKC9vaF53Gr7nQB94ImLNrRDwjZPcEQSdsD472E3kfa9lNE4fFupzisIEbpNOwRUFxM5FszOTy-xw0UpWkHrzg0DZGHsAv3uJio2o",
    alt: "Lush green sustainable farming field with hands holding soil",
  },
  {
    location: "Medical Outreach",
    caption:
      "Health is wealth. Our mobile clinics reached over 500 families this week. Providing care where it's needed most. ❤️",
    time: "3 days ago",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCy8ARtyBvJ4YlDEMlOffpVUdLv6KL8OZ1FS3HOJ1lxBPcVqZQhQgZl0BCjOD6AWZYa0L1bDxvr9vkJvPe_6NwWmOHl7MKvB31un71CYojmKN4jdlFZBP7g3UpHaVBWRw7Qzr01NDL3htj4acuSZyo1XVfp6LB4In8eNU7Fvaikq4HxR82ghaY6vvmALeuxyZRmey5qdUZh2MZOa7c7VhUn7cmn1ndkPvHD7CjpKdCx-uzUw8hwtS4vlw8RCzKu_YdjmXeumDprvYII",
    alt: "Doctor interacting with a child in a clinic",
  },
  {
    location: "Community Workshop",
    caption:
      "Creativity knows no bounds. Our latest vocational training session for women entrepreneurs. 🎨💪",
    time: "5 days ago",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDc5AzMN8z2rAnr6xZTYgJyrtSfmd-glzcLOW2dMGu0Llb7xFCswkZWMSzyd9ovisIuQoDVbZ47FukW15xiNVnaBZXHHFoBrmbrJFCTXc6Rc7Zs1k4IKqhl7RYj5u_xva0mOz3Dc9tF072VYzPy020ptGMJUBSO1hxEBKc-tPzakgtPlOXmDCbC8coR0A1_4IQ5wS3hnlw1D8_ewzX5BxWNOkpv5ZPVDra5vcEoJqxKyPXJqLp65VQCujqegxnmo14XPJRk2zd80tu8",
    alt: "Group of women working together on a craft project",
  },
];

const ImpactFeed = () => {

  const swiperRef = useRef(null);

  return (
    <section className="w-full bg-white py-16">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">

        <div className="flex justify-center items-center gap-2 text-[#ff6a00] font-semibold text-sm uppercase tracking-widest mb-2">
          <FaInstagram size={14}/>
          Social Impact
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Follow Our Journey
        </h2>

        <p className="text-gray-500 mt-2">
          See how your contributions are changing lives in real-time.
        </p>

        {/* ARROWS */}
        <div className="flex justify-end -mt-16 ">

             {/* CTA */}
      <div className="text-center mt-12">
        <button className="inline-flex items-center gap-2 px-8 py-3 bg-[#ff6a00] text-white font-semibold rounded-lg hover:bg-orange-600 transition shadow-lg">
          <FaInstagram />
          View More on Instagram
        </button>
      </div>

        </div>

      </div>

      {/* POSTS */}
      <div className="max-w-7xl mx-auto px-6">

        <Swiper
          spaceBetween={30}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >

          {impactPosts.map((post, index) => (
            <SwiperSlide key={index}>

              <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition">

                {/* HEADER */}
                <div className="flex items-center gap-3 p-4">
                  <img
                    src={Logo}
                    alt="Monark Foundation"
                    className="w-10 h-10 rounded-full border border-orange-200"
                  />

                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      monarkfoundation
                    </p>
                    <p className="text-xs text-gray-400">
                      {post.location}
                    </p>
                  </div>
                </div>

                {/* IMAGE */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>

                {/* FOOTER */}
                <div className="p-4">

                  <div className="flex justify-between mb-3">

                    <div className="flex gap-4 text-gray-600 text-lg">
                      <FaHeart className="cursor-pointer hover:text-[#ff6a00]" />
                      <FaRegComment className="cursor-pointer hover:text-[#ff6a00]" />
                      <FaPaperPlane className="cursor-pointer hover:text-[#ff6a00]" />
                    </div>

                    <FaBookmark className="cursor-pointer text-gray-600 hover:text-[#ff6a00]" />

                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold mr-2">
                      monarkfoundation
                    </span>
                    {post.caption}
                  </p>

                  <p className="text-xs text-gray-400 mt-3 font-medium">
                    {post.time}
                  </p>

                </div>

              </div>

            </SwiperSlide>
          ))}

        </Swiper>

        

      </div>

      

     {/* ARROWS */}
        <div className="flex justify-center gap-4 mt-6">

          

          <button
            onClick={() => swiperRef.current.slidePrev()}
            className="w-12 h-12 rounded-full border border-orange-200 text-[#ff6a00] flex items-center justify-center hover:bg-[#ff6a00] hover:text-white transition"
          >
            <FaArrowLeft />
          </button>

          <button
            onClick={() => swiperRef.current.slideNext()}
            className="w-12 h-12 rounded-full border border-[#ff6a00] text-[#ff6a00] flex items-center justify-center hover:bg-[#ff6a00] hover:text-white transition"
          >
            <FaArrowRight />
          </button>

        </div>

    </section>
  );
};

export default ImpactFeed;