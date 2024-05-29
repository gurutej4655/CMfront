import React from "react";

function Hero() {
  return (
    <>
      <section
        className={`relative bg-[url(https://cdn.britannica.com/50/202950-050-DFF457E3/Farm-tractor-pesticides-crops.jpg)] bg-cover bg-center bg-no-repeat`}
      >
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/85 sm:to-white/1"></div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center sm:text-left">
            <h1 className="text-3xl font-bold md:text-5xl">
              Crop
              <strong className="font-bold text-lime-700">Market</strong>
            </h1>

            <p className="mt-4 max-w-lg font-semibold sm:text-xl sm:leading-relaxed">
              Connecting Farmers and Consumers directly - Bringing Freshly Produced crops to Your
              Doorstep!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
