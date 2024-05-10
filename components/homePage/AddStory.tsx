import { useAtom } from 'jotai';
import React from 'react';
import Image from 'next/future/image';
import AddStorySVG from '../svgComps/AddStorySVG';
import handleUpdateUserStory from '../../util/handleUpdateUserStory';
import handleUploadImage from '../../util/handleUploadImage';
import useCheckNameLength from '../../hooks/useCheckNameLength';
import atoms from '../../util/atoms';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';
import handleRemoveStory from '../../util/handleRemoveStory';

const playMouseClickSound = () => {
  const mouseclick = new Audio('https://uploads.sitepoint.com/wp-content/uploads/2023/06/1687569402mixkit-fast-double-click-on-mouse-275.wav');
  mouseclick.play();
};

function AddStory() {
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);

  const [loading, setLoading] = React.useState(false);
  const [addPhoto, setAddPhoto] = React.useState(false);

  const widthRef = React.useRef<HTMLDivElement>(null);

  const checkLength = useCheckNameLength({ widthRef });

  return (
    <>
      <button type="button" onMouseDown={playMouseClickSound} className="flex cursor-pointer flex-col items-start">
        <div className="relative">
          <button  
            className="w-[74px]"
            type="button"
            onClick={() => setAddPhoto(true)}
          >
            {userDetails.photoURL ? (
              <Image
                className="relative z-10 h-14 w-14 select-none rounded-full  bg-[#ebebeb] object-cover p-[2px] dark:bg-[#1c1c1c]"
                src={userDetails.photoURL}
                alt="avatar"
                width="56"
                height="56"
              />
            ) : (
              <div className="relative z-10 h-14 w-14 rounded-full bg-white dark:bg-[#1c1c1c]">
                <ProfilePicSVG strokeWidth="1" />
              </div>
            )}
          </button>
          <div
            className={`${
              userNotifications?.story?.length === 0
                ? 'bg-[#e4e4e4] dark:bg-[#000000]'
                : 'bg-gradient-to-tr from-[#10f4e4] to-[#000]'
            } absolute top-[-2px] left-[-2px]  z-0 h-[60px] w-[60px] rounded-[50px] `}
          />
          <div className="absolute bottom-0 right-[15px] z-10">
            <AddStorySVG />
          </div>
        </div>
        <div className="relative mt-0 max-w-[74px] overflow-hidden text-xs">
          <p ref={widthRef}>{userDetails.displayName}</p>
          {checkLength.nameWidth === 74 ? (
            <div className="absolute top-0 right-0 bg-white pr-[5px] dark:bg-[#1c1c1c]">
              <p>...</p>
            </div>
          ) : (
            ''
          )}
        </div>
      </button>
      {addPhoto ? (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full  items-center justify-center bg-[#0000008f] dark:bg-[#0eede6]">
          <div
            className={
              loading
                ? ' rounded-full  p-2 '
                : 'hidden'
            }
          >
            <picture>
              <img
                className="h-10 w-11"
                src="loading.gif"
                alt="instagram loading"
              />
            </picture>
          </div>
          <div
            className={`${
              loading ? 'hidden' : ''
            } hjjhkjkjjj w-[400px] flex-col rounded-xl bg-white dark:border dark:border-stone-300 dark:bg-[#000000]`}
          >
            <h1 className=" addstory3 py-7 text-center text-lg font-semibold">
              <svg height="200px" width="200px" fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.7 33.7" ><g id="SVGRepo_bgCarrier" /><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M33.667,18.051c-2.646-6.921-9.404-11.57-16.816-11.57c-7.411,0-14.169,4.649-16.817,11.569 c-0.099,0.258,0.03,0.547,0.288,0.646c0.257,0.1,0.547-0.029,0.646-0.287c0.263-0.688,0.578-1.348,0.924-1.984l3.884,2.238 l0.499-0.867L2.396,15.56c0.609-0.982,1.312-1.896,2.099-2.727l3.164,3.162l0.707-0.707L5.2,12.125 c0.838-0.786,1.758-1.48,2.735-2.084l2.231,3.864l0.866-0.5L8.802,9.541c1.008-0.544,2.067-0.993,3.171-1.328l1.16,4.324 l0.492-0.133c-4.331,1.154-7.738,4.573-8.871,8.914c-0.099,0.382-0.606,0.769-1.201,1.163h4.276 c-0.631-0.954-0.723-2.215-0.112-3.273c0.858-1.488,2.765-2,4.255-1.141c1.489,0.86,2,2.768,1.14,4.256 c-0.033,0.059-0.078,0.104-0.114,0.158h7.709c-0.037-0.055-0.081-0.102-0.114-0.158c-0.861-1.488-0.353-3.396,1.139-4.256 c1.489-0.857,3.396-0.349,4.255,1.141c0.61,1.06,0.519,2.319-0.113,3.273h4.203c-0.555-0.365-1.018-0.725-1.106-1.078 c-0.856-3.384-3.094-6.218-6.076-7.867l0.64,0.369l2.23-3.866c0.977,0.604,1.896,1.296,2.734,2.083l-3.164,3.166l0.707,0.707 l3.163-3.165c0.788,0.829,1.489,1.744,2.101,2.727l-3.879,2.241l0.5,0.864l3.883-2.244c0.347,0.64,0.663,1.3,0.927,1.99 c0.076,0.199,0.266,0.321,0.467,0.321c0.061,0,0.12-0.011,0.179-0.032C33.638,18.598,33.767,18.309,33.667,18.051z M12.937,7.947 c1.107-0.266,2.252-0.411,3.414-0.446v4.48h0.5h0.5v-4.48c1.16,0.035,2.303,0.18,3.41,0.445l-1.159,4.332l0.352,0.094 c-0.993-0.253-2.031-0.391-3.103-0.391c-1.072,0-2.112,0.137-3.105,0.391l0.354-0.095L12.937,7.947z M16.851,20.163 c-1.721,0-3.115-1.395-3.115-3.114c0-1.72,1.395-3.114,3.115-3.114c1.72,0,3.115,1.395,3.115,3.114 C19.964,18.769,18.57,20.163,16.851,20.163z M22.665,13.405l0.224,0.129c-0.869-0.48-1.804-0.857-2.783-1.121l0.461,0.123 l1.157-4.324c1.104,0.334,2.165,0.782,3.173,1.327L22.665,13.405z"/> <path d="M16.851,25.543c3.5-1,7.188-2.625,7.188-2.625H8.601c0,0,5.963,0.375,8.213,1.25c1.125,0.438-2.416,1.207-3.463,2.125 c-1.047,0.916,4.75,1.375,8.024,0.312C16.013,26.606,15.54,25.917,16.851,25.543z"/> </g> </g> </g></svg>
            </h1>
            {/* <h1 className='AdStory'>Add Story</h1> */}
            <div className="flex justify-center border-y border-stone-300  text-sm font-semibold text-[#0095f6] dark:border-stone-700">
              <label
                className="flex-grow cursor-pointer py-3 text-center"
                htmlFor="photoFile"
              >


<button
  type="button" // Add the type attribute with value "button"
  className="editprofileimage"
  onMouseDown={playMouseClickSound}
>
  <div className="profileremoveedit4">Upload Photo</div>
</button>




                <input
                  type="file"
                  id="photoFile"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={(e) =>
                    handleUploadImage({
                      e,
                      location: 'stories',
                      username: userDetails.displayName!,
                      maxWidthOrHeight: 1000,
                      chatRoomIDs: null,
                      setLoading,
                      setAddPhoto,
                      handleImgURLFunction: handleUpdateUserStory,
                    })
                  }
                />
              </label>
            </div>
            <button
  className="w-full border-b border-stone-300 py-3 text-sm font-semibold text-[#ED4956] dark:border-stone-700"
  type="button"
  onClick={() =>
    handleRemoveStory({
      username: userDetails.displayName!,
      setLoading,
      setAddPhoto,
    })
  }
  onMouseDown={playMouseClickSound} // Move the onMouseDown event to the button element
>
  Remove current Story
</button>

            <button
              className="w-full py-3 text-sm"
              onClick={() => setAddPhoto(false)}
              type="button"
            >
              <div className='profileremoveedit'>
              <button
  type="button" // Add the type attribute with value "button"
  className="profileremoveedit3"
  onMouseDown={playMouseClickSound}
>
  Back
</button>


              </div>
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default AddStory;
