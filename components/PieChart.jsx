import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { Circle, G, Path, Text } from "react-native-svg";

const PieChart = ({
  data,
  pieWidth = null,
  pieHeight = null,
  valueAttrib = "value",
  labelAttrib = "label",
}) => {
  const { width, height } = Dimensions.get("window");
  const xWidth = pieWidth ?? width;
  const xHeight = pieHeight ?? height;

  const radius = Math.min(xWidth, xHeight) / 2;
  const centerX = xWidth / 2;
  const centerY = xHeight / 2;
  let startAngle = 0;

  const totalValue = data.reduce(
    (total, slice) => total + slice[valueAttrib],
    0
  );

  const colors = [
    "rgba(86,168,211,1)",
    "rgba(84,88,211,1)",
    "rgba(85,127,211,1)",
    "rgba(108,76,212,1)",
    "rgba(108,76,212,0.6)",
    "rgba(108,76,212,0.6)",
    "rgba(86,168,211,0.6)",
    "rgba(84,88,211,0.6)",
    "rgba(85,127,211,0.6)",
    "rgba(86,168,211,0.6)",
    "rgba(84,88,211,0.6)",
    "rgba(85,127,211,0.6)",
  ];
  const randomColorGenerator = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <View>
      <Svg width={xWidth} height={xHeight}>
        <G transform={`translate(${centerX},${centerY})`}>
          {data.map((slice, index) => {
            const endAngle =
              startAngle + (slice[valueAttrib] / totalValue) * 2 * Math.PI;
            const x1 = radius * Math.cos(startAngle);
            const y1 = radius * Math.sin(startAngle);
            const x2 = radius * Math.cos(endAngle);
            const y2 = radius * Math.sin(endAngle);
            const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
            const path = `M${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} L0,0 Z`;

            startAngle = endAngle;
            const colorFill =
              slice?.color ?? data.length > index
                ? colors[index]
                : randomColorGenerator();

            const labelX =
              radius *
              0.7 *
              Math.cos(
                startAngle - (slice[valueAttrib] / totalValue) * Math.PI
              );
            const labelY =
              radius *
              0.7 *
              Math.sin(
                startAngle - (slice[valueAttrib] / totalValue) * Math.PI
              );

            return (
              <G key={index}>
                <Path d={path} fill={colorFill} />
                <Text
                  x={labelX - 30}
                  y={labelY}
                  fill="#fff"
                  fontSize="12"
                //   textAnchor="middle"
                  //   rotate={`${
                  //     ((startAngle + endAngle) * (180 / Math.PI)) / 2
                  //   }, ${labelX-30}, ${labelY}`}
                >
                  {slice[labelAttrib]}: {slice[valueAttrib]}
                </Text>
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

export default PieChart;
