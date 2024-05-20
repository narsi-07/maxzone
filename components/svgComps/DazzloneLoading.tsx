import React from 'react';

const DazzloneLoading = () => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    width="30"
    height="30"
    style={{ shapeRendering: 'auto', display: 'block', background: 'transparent' }}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g>
      <circle r="25" fill="#00ffe3" cy="50" cx="25">
        <animate
          begin="-0.5s"
          values="25;75;25"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
          attributeName="cx"
        />
      </circle>
      <circle r="25" fill="#0099e5" cy="50" cx="75">
        <animate
          begin="0s"
          values="25;75;25"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
          attributeName="cx"
        />
      </circle>
      <circle r="25" fill="#00ffe3" cy="50" cx="25">
        <animate
          begin="-0.5s"
          values="25;75;25"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
          attributeName="cx"
        />
        <animate
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.499;0.5;1"
          calcMode="discrete"
          values="0;0;1;1"
          attributeName="fill-opacity"
        />
      </circle>
    </g>
  </svg>
);

export default DazzloneLoading;
