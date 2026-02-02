import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "@vnedyalk0v/react19-simple-maps";
import { useTheme } from "../../hooks/useTheme";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapChart = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const highlightedCountries = [
    "United States of America",
    "Canada",
    "China",
    "Australia",
  ];

  return (
    <div className="relative">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHighlighted = highlightedCountries.includes(
                geo.properties.name,
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    isHighlighted
                      ? isDark
                        ? "#64748b"
                        : "#94a3b8"
                      : isDark
                        ? "#374151"
                        : "#e2e8f0"
                  }
                  stroke={isDark ? "#1f2937" : "#ffffff"}
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: isHighlighted
                        ? isDark
                          ? "#475569"
                          : "#64748b"
                        : isDark
                          ? "#4b5563"
                          : "#cbd5e1",
                      outline: "none",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Marker for Australia with special tooltip */}
        {data
          .filter((country) => country.country === "Australia")
          .map(({ country, coordinates, people, purchase }) => (
            <Marker key={country} coordinates={coordinates}>
              <circle
                r={6}
                fill="#1f2937"
                stroke="#ffffff"
                strokeWidth={2}
                onMouseEnter={(e) => {
                  setTooltipContent(
                    `${country}\nPeople: ${people}\nPurchase: ${purchase}`,
                  );
                  setTooltipPos({ x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                style={{ cursor: "pointer" }}
              />
            </Marker>
          ))}
      </ComposableMap>

      {tooltipContent && (
        <div
          className="absolute pointer-events-none bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg text-xs whitespace-pre-line"
          style={{
            left: tooltipPos.x + 10,
            top: tooltipPos.y - 40,
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default MapChart;
