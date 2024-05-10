/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function DifferentMovementHomeIcon() {
  const [darkMode] = useAtom(atoms.darkMode);
  const fillColor = darkMode ? '#00000' : '#FFFFFF';


  return (
    <svg
    height="26px"
    width="26px"
    fill={fillColor}
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 183.21 183.21"
    xmlSpace="preserve"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
    <g id="SVGRepo_iconCarrier">
      <g>
        <g>
          <path
            d="M100.546,5.818c-2.648-2.645-6.261-4.134-9.993-4.1c-3.744,0.024-7.325,1.542-9.939,4.223L53.902,33.285v-14.84h4.02 c1.934,0,3.504-1.566,3.504-3.504c0,0,0-1.956,0-4.363c0-2.411-3.137-4.365-7.009-4.365H38.575c-3.869,0-7.009,1.954-7.009,4.365 v4.363c0,1.938,1.569,3.504,3.504,3.504h4.02v30.003L3.99,84.381c-5.41,5.537-5.306,14.411,0.234,19.821 c2.726,2.662,6.263,3.99,9.791,3.99c3.641,0,7.282-1.406,10.03-4.22l1.884-1.93v37.397c0,19.353,9.144,30.689,24.162,35.043 c15.02,4.356,24.163,7.009,24.163,7.009v-43.424c0-9.679,7.77-17.521,17.354-17.521c9.585,0,17.354,7.843,17.354,17.521v43.424 c0,0,10.096,0,23.65-7.009c11.608-5.999,23.651-15.69,23.651-35.043v-38.369l3.028,3.021c5.469,5.476,14.349,5.465,19.821-0.014 c5.469-5.472,5.465-14.353-0.018-19.819L100.546,5.818z M88.1,102.286h-6.925c-3.822,0-6.925-3.101-6.925-6.927 c0-3.829,0-6.93,0-6.93H88.1V102.286z M88.1,81.421H74.25v-6.928c0-3.824,3.103-6.924,6.925-6.924c3.824,0,6.925,0,6.925,0V81.421 z M108.958,95.359c0,3.829-3.101,6.927-6.92,6.927c-3.829,0-6.93,0-6.93,0V88.43h13.85V95.359z M108.958,81.421h-13.85v-13.85 h6.93c3.822,0,6.92,3.101,6.92,6.925C108.958,78.319,108.958,81.421,108.958,81.421z"
          />
        </g>
      </g>
    </g>
  </svg>  );
}

export default DifferentMovementHomeIcon;
