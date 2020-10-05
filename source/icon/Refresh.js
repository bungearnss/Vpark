import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Refresh(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      stroke="rgba(0,100,0,1)"
      strokeWidth={2}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path d="M23 4v6h-6M1 20v-6h6" />
      <Path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </Svg>
  );
}

export default Refresh;

{
  /* <Svg
      width={24}
      height={24}
      fill="none"
      stroke="black"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path d="M23 4v6h-6M1 20v-6h6" />
      <Path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </Svg> */
}

{
  /* <Svg
      width={30}
      height={30}
      fill="green"
      //stroke="black"
      viewBox="0 0 551.13 551.13"
      {...props}
    >
      <Path d="M482.239 310.011c0 113.966-92.707 206.674-206.674 206.674S68.891 423.977 68.891 310.011c0-102.208 74.639-187.086 172.228-203.562v65.78l86.114-86.114L241.119 0v71.641C124.466 88.443 34.446 188.78 34.446 310.011c0 132.955 108.164 241.119 241.119 241.119s241.119-108.164 241.119-241.119z" />
    </Svg> */
}

{
  /* <Svg
      width={25}
      height={25}
      strokeWidth={2}
      fill="black"
      viewBox="0 0 480.35 480.35"
      {...props}
    >
      <Path d="M171.821 10.011a239.995 239.995 0 00-131.806 97.671 65.273 65.273 0 00-7.84 24.96v-84.32h-32v128h128v-32h-72.32c35.828-68.925 106.646-112.572 184.32-113.6 92.115 1.071 172.856 61.854 199.36 150.08l30.72-9.12C432.489 44.627 298.876-27.755 171.821 10.011zm180.354 294.311v32h72.32c-35.828 68.925-106.646 112.572-184.32 113.6-92.115-1.071-172.856-61.854-199.36-150.08l-30.72 9.12c37.928 127.006 171.634 199.218 298.64 161.29a239.998 239.998 0 00134.32-101.93 43.998 43.998 0 005.12-20.32v84.32h32v-128h-128z" />
    </Svg> */
}
