/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function GurudevSVGIcon({ page }: { page: string }) {
  const [darkMode] = useAtom(atoms.darkMode);
  const [showPopUp, setShowPopUp] = useState(false);

  let interval: any;  // Declare the interval variable outside the useEffect

  useEffect(() => {
    if (page !== 'Gurudev') {
      // Start the interval when on a different page
      interval = setInterval(() => {
        setShowPopUp(true);

        // Hide the pop-up after 2 seconds
        setTimeout(() => {
          setShowPopUp(false);
        }, 2000);
      }, 10000);
    } else {
      // Clear the interval when on the 'Gurudev' page
      clearInterval(interval);
    }

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [page]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)' }}>
        {showPopUp && (
          <div className="pop-up jgkhkjhkh" style={{ padding: '2px', borderRadius: '50%', backgroundColor: darkMode ? '#262626' : 'white', color: darkMode ? '#f1f5f9' : '#262626', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 24 24" width="10">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M4 18l-1.41-1.41L9.17 12 2.59 5.41 4 4l7 7-7 7z" />
            </svg>
            <span className='ijjjsslj'  style={{ marginLeft: '2px', fontSize: '10px' }}> Live</span>
          </div>
        )}
      </div>

   <svg height="40px" width="40px" fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" ><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M21.227,17.688l-2.109-0.062c-0.584-1.824-2.293-3.145-4.311-3.145c-2.313,0-4.218,1.737-4.49,3.976 c-0.001,0-0.001,0.003-0.001,0.003c-1.096-0.158-2.125-1.873-3.178-4.864c-2.351,2.795-2.208,5.894-1.5,7.055 C4.138,20.815,1.257,19.939,0,19.254c2.191,4.898,5.326,7.291,8.394,7.947c1.04,0.553,2.224,0.872,3.484,0.872 c0.134,0,0.264-0.013,0.396-0.021l-0.624,1.061l-1.319,0.432l0.107,0.326l1.278-0.418l0.603,0.618l0.245-0.239l-0.585-0.601 l0.709-1.203c0.488-0.053,0.961-0.151,1.416-0.293l1.353,1.729l-1.147,0.424l0.119,0.322l1.301-0.482l1.197,0.535l0.14-0.312 l-1.221-0.548l-1.403-1.792c2.791-1.023,4.803-3.661,4.889-6.785c0.001-0.051,1.938-0.126,1.938-0.126l-1.957-1.381L21.227,17.688 z M16.574,19.274c-0.686,0-1.243-0.558-1.243-1.244s0.557-1.242,1.243-1.242c0.688,0,1.242,0.556,1.242,1.242 S17.262,19.274,16.574,19.274z"/> <path d="M16.66,17.409L16.66,17.409c0.025,0.05,0.044,0.103,0.044,0.161c0,0.189-0.154,0.346-0.345,0.346 c-0.109,0-0.203-0.057-0.267-0.137c-0.034,0.078-0.054,0.162-0.054,0.251c0,0.345,0.277,0.622,0.621,0.622 c0.343,0,0.621-0.277,0.621-0.622C17.281,17.688,17.003,17.409,16.66,17.409z"/> <path d="M23.975,13.765l0.004,0.351v3.175c-0.168-0.158-0.395-0.255-0.643-0.255c-0.52,0-0.941,0.421-0.941,0.941 c0,0.519,0.422,0.938,0.941,0.938c0.473,0,0.862-0.35,0.93-0.803h0.012v-3.289l2.611-0.479v2.336 c-0.168-0.157-0.394-0.254-0.643-0.254c-0.52,0-0.939,0.422-0.939,0.94c0,0.52,0.42,0.941,0.939,0.941 c0.473,0,0.863-0.35,0.929-0.805h0.011v-3.699l0.018-0.003l-0.005-0.635L23.975,13.765z M26.887,14.171l-2.611,0.479v-0.307 l2.611-0.483V14.171z"/> <path d="M31.996,5.771l-2.834,0.525l0.003,0.308v2.792c-0.147-0.138-0.347-0.223-0.565-0.223c-0.457,0-0.826,0.37-0.826,0.827 c0,0.456,0.371,0.826,0.826,0.826c0.416,0,0.758-0.307,0.818-0.706h0.009V7.228l2.296-0.421v2.055 c-0.148-0.14-0.347-0.225-0.564-0.225c-0.456,0-0.827,0.371-0.827,0.827c0,0.457,0.371,0.827,0.827,0.827 c0.416,0,0.759-0.307,0.816-0.707h0.01V6.331L32,6.328L31.996,5.771z M31.723,6.653l-2.297,0.421V6.805l2.297-0.425V6.653z"/> <path d="M22.966,6.085h0.011V3.193l2.295-0.422v2.055c-0.147-0.139-0.346-0.224-0.563-0.224c-0.456,0-0.827,0.371-0.827,0.827 c0,0.457,0.371,0.828,0.827,0.828c0.416,0,0.759-0.307,0.817-0.707h0.01V2.297l0.015-0.003l-0.005-0.558l-2.834,0.525l0.002,0.308 v2.792c-0.148-0.138-0.347-0.223-0.564-0.223c-0.457,0-0.826,0.37-0.826,0.827s0.369,0.826,0.826,0.826 C22.564,6.792,22.907,6.484,22.966,6.085z M22.977,2.771l2.295-0.425v0.273l-2.295,0.421V2.771z"/></g> </g> </g></svg>
    </div>
  );
}

export default GurudevSVGIcon;