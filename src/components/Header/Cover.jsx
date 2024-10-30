import React from "react";
import useAllMedia from "../../contexts/images";

const Cover = ({ bgChanger }) => {
  // Media context
  const {
    pinkForest,
    pinkSky,
    darkMountains,
    blueSky,
    fogInForest,
    GreenForest,
    RaininginRoad,
    SnowMountain,
    SunsetCityscape,
    WhiteAmazon,
  } = useAllMedia();

  const bgList = [
    "dark Mountains",
    "blue Sky",
    "pink Sky",
    "pink Forest",
    "Fog in Forest",
    "Green Forest",
    "Raining in Road",
    "Snow Mountain",
    "Sunset Cityscape",
    "WhiteAmazon",
  ];

  const bgGetter = (idx) => {
    switch (idx) {
      case 0:
        return darkMountains;
      case 1:
        return blueSky;
      case 2:
        return pinkSky;
      case 3:
        return pinkForest;
      case 4:
        return fogInForest;
      case 5:
        return GreenForest;
      case 6:
        return RaininginRoad;
      case 7:
        return SnowMountain;
      case 8:
        return SunsetCityscape;
      case 9:
        return WhiteAmazon;
    }
  };

  const BackgroundGiverHandler = (e) => {
    bgChanger(e.target.textContent);
  };
  return (
    <div className="columns-4  gap-2 max-[530px]:columns-3">
      {bgList.map((bg, idx) => {
        return (
          <div
            className={`h-28 w-28 max-[530px]:size-20 inline-block items-end pl-2  border-b border-gray-600   bg-no-repeat object-cover bg-cover rounded-lg mb-2`}
            key={idx}
            onClick={BackgroundGiverHandler}
            style={{
              backgroundImage: `url(${bgGetter(idx)})`,
            }}
          >
            <span className="text-center text-gray-300 whitespace-nowrap text-xs mix-blend-difference max-[530px]:hidden">
              {bg}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Cover;
