import * as React from "react";
import Svg, { Defs, G, Circle, Path, Rect, Text} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */
import {Image, Dimensions, View} from 'react-native';
import LOGO from '../images/parking-logo.png';

const width = Dimensions.get("window")

function SelectLocation(props) {
  return (
    <Svg viewBox="0 0 900 1000" {...props} width={350} height={350}>
      <Defs></Defs>
      <G id="prefix__Layer_2" data-name="Layer 2">
        <G id="prefix___1" data-name={1}>
        {/*   <Circle
            className="prefix__cls-1"
            cx={130.25}
            cy={413.25}
            r={130.25}
            fill="#e0dede"
          /> */}
         {/*  <Path
            d="M130.26 517l58.07-101.34s8.58-15.2 8.58-31.57-14.42-67-66.65-67-66.65 50.67-66.65 65.48 2 21.18 8.22 33.59z"
            fill="#e74c3c"
          /> */}
         {/*  <Circle cx={130.26} cy={385.69} r={38.85} fill="#c0392b" /> */}
         {/*  <Circle cx={130.26} cy={385.69} r={20.74} fill="#e0dede" /> */}
          <Image source={LOGO} style={{width: 120, height: 120, alignSelf:'center', position:'relative', bottom: 60}}/>
          <Rect
            className="prefix__cls-1"
            x={126.78}
            y={235}
            width={663}
            height={763}
            rx={38.01}
            fill="#e0dede"
          />
          <Path
            className="prefix__cls-1"
            transform="rotate(45 618.995 805.902)"
            d="M60.28 486.18h69.44v69.44h-69.44z"
            fill="#e0dede"
          />
          <Rect
            className="prefix__cls-5"
            x={156.8}
            y={363.9}
            width={603}
            height={605.8}
            rx={25.5}
            fill="#fff"
          />
          <Text
            className="prefix__cls-7"
            transform="matrix(1.07 0 0 1 330.09 325.02)"
            fontSize="55"
            fontWeight="bold"
            x={120}
            textAnchor="middle"
            fill="#e74c3c"
            stroke="#c0392b"
          >
            Vpark Application
          </Text>
          <G>
          <Text
            className="prefix__cls-7"
            transform="matrix(1.07 0 0 1 323.09 435.02)"
            fontSize="45"
            fontWeight="bold"
            x={120}
            textAnchor="middle"
            fill="#000"
          >
            เพื่ออำนวยความสะดวกใน
          </Text>
          <Text
            className="prefix__cls-7"
            transform="matrix(1.07 0 0 1 330.09 515.02)"
            fontSize="45"
            fontWeight="bold"
            x={120}
            textAnchor="middle"
          >
            การจอดรถยนต์ให้บุคลากร
          </Text>
          <Text
            className="prefix__cls-7"
            transform="matrix(1.07 0 0 1 280.09 595.02)"
            fontSize="45"
            fontWeight="bold"
            x={120}
            textAnchor="middle"
          >
            และนักศึกษาตลอดจน
          </Text>
          <Text
            className="prefix__cls-7"
            transform="matrix(1.07 0 0 1 296.09 676.02)"
            fontSize="45"
            fontWeight="bold"
            x={120}
            textAnchor="middle"
          >
            บุคคลทั่วไปที่เข้าใช้งาน
          </Text>
          <Text
            className="prefix__cls-7"
            transform="matrix(1.07 0 0 1 293.09 755.02)"
            fontSize="45"
            fontWeight="bold"
            x={120}
            textAnchor="middle"
          >
            ลานจอดรถยนต์ภายใน
          </Text>
          <Text
            className="prefix__cls-7"
            transform="matrix(1.07 0 0 1 301.09 835.02)"
            fontSize="45"
            fontWeight="bold"
            x={120}
            textAnchor="middle"
          >
            มหาวิทยาลัยเทคโนโลยี
          </Text>
          <Text
            className="prefix__cls-7"
            transform="matrix(1.07 0 0 1 253.09 913.02)"
            fontSize="45"
            fontWeight="bold"
            x={120}
            textAnchor="middle"
          >
            พระจอมเกล้าธนบุรี
          </Text>
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default SelectLocation;
