import React from 'react';
import { useAtom } from 'jotai';
import handleUploadImage from '../../util/handleUploadImage';
import handleUpdateProfilePhoto from '../../util/handleUpdateProfilePhoto';
import handleRemoveProfilePhoto from '../../util/handleRemoveProfilePhoto';
import atoms from '../../util/atoms';

function AddProfilePhoto({
  setAddPhoto,
}: {
  setAddPhoto: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = React.useState(false);
  const [userDetails] = useAtom(atoms.userDetails);
  
  const [userNotifications] = useAtom(atoms.userNotifications);

  return (
    <div className="fixed top-0 z-50 flex h-full w-full  items-center justify-center bg-[#0000008f] dark:bg-[#000000d7]">
      <div
        className={
          loading ? 'animate-spin rounded-full bg-[#000000de] p-2 ' : 'hidden'
        }
      >                            


                      {/* Loding image */}
        <picture>
          <img
            className="h-10 w-10"
            src="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png"
            alt="instagram loading"
          />
        </picture>
      </div>
      <div
        className={`${
          loading ? 'hidden' : ''
        } w-[400px] flex-col rounded-xl bg-white dark:border dark:border-stone-300 dark:bg-[#000000]`}
      >
        <h1 className="py-7 profilechangeedit text-center text-lg font-semibold">
        <svg
    height="100px"
    width="100px"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
    <g id="SVGRepo_iconCarrier">
      <path
        style={{ fill: '#9BAAAB' }}
        d="M446.638,153.6c-13.515,0-24.511,10.996-24.511,24.511v254.366H279.421v-80.068 c0-13.515-10.996-24.511-24.511-24.511c-13.515,0-24.511,10.996-24.511,24.511v80.068H83.336V285.413h62.638 c13.515,0,24.511-10.996,24.511-24.511c0-13.515-10.996-24.511-24.511-24.511H83.336V98.043h236.936 c13.515,0,24.511-10.996,24.511-24.511s-10.996-24.511-24.511-24.511H58.825c-13.515,0-24.511,10.996-24.511,24.511v383.455 c0,13.515,10.996,24.511,24.511,24.511h387.813c13.515,0,24.511-10.996,24.511-24.511V178.111 C471.149,164.596,460.153,153.6,446.638,153.6z"
      />
      <path
        style={{ fill: '#687F82' }}
        d="M446.638,153.6c-13.515,0-24.511,10.996-24.511,24.511v254.366H279.421v-80.068 c0-13.515-10.996-24.511-24.511-24.511c-13.515,0-24.511,10.996-24.511,24.511v80.068H83.336v-8.715l-45.634,45.634 c4.266,7.234,12.135,12.102,21.124,12.102h387.813c13.515,0,24.511-10.996,24.511-24.511V178.111 C471.149,164.596,460.153,153.6,446.638,153.6z"
      />
      <g>
        <path
          style={{ fill: '#FD6A33' }}
          d="M450.995,401.974c-30.334,0-55.013,24.678-55.013,55.013S420.661,512,450.995,512 s55.013-24.678,55.013-55.013S481.33,401.974,450.995,401.974z"
        />
        <path
          style={{ fill: '#FD6A33' }}
          d="M93.576,413.522l-77.127,77.127C26.521,503.625,42.254,512,59.915,512 c30.334,0,55.013-24.678,55.013-55.013C114.927,439.326,106.552,423.594,93.576,413.522z"
        />
      </g>
      <g>
        <path
          style={{ fill: '#FF8C29' }}
          d="M59.915,401.974c-30.334,0-55.013,24.678-55.013,55.013S29.58,512,59.915,512 s55.013-24.678,55.013-55.013S90.249,401.974,59.915,401.974z"
        />
        <path
          style={{ fill: '#FF8C29' }}
          d="M59.915,17.43c-30.334,0-55.013,24.678-55.013,55.013s24.678,55.013,55.013,55.013 s55.013-24.678,55.013-55.013S90.249,17.43,59.915,17.43z"
        />
      </g>
      <path
        style={{ fill: '#4ACFD9' }}
        d="M504.705,45.529L461.569,2.392C460.036,0.861,457.958,0,455.79,0c-2.167,0-4.245,0.862-5.778,2.394 L253.664,198.84l-43.189,43.189c-0.897,0.898-1.572,1.99-1.974,3.194l-21.568,64.706c-0.978,2.936-0.215,6.173,1.974,8.362 c1.558,1.557,3.646,2.392,5.779,2.392c0.864,0,1.736-0.137,2.583-0.419l64.704-21.568c1.204-0.401,2.295-1.076,3.194-1.974 L373.008,188.88c0.146-0.146,0.284-0.295,0.416-0.449l131.282-131.35C507.895,53.892,507.894,48.72,504.705,45.529z"
      />
      <path
        style={{ fill: '#0295AA' }}
        d="M482.592,23.416L188.354,317.655c0.176,0.217,0.352,0.436,0.552,0.636 c1.558,1.557,3.646,2.392,5.779,2.392c0.864,0,1.736-0.137,2.583-0.419l64.704-21.568c1.204-0.401,2.295-1.076,3.194-1.974 L373.007,188.88c0.146-0.146,0.284-0.295,0.416-0.449l131.283-131.35c3.19-3.191,3.189-8.363-0.001-11.553L482.592,23.416z"
      />
      <path
        style={{ fill: '#FFD1A9' }}
        d="M208.501,245.223l-21.568,64.706c-0.978,2.936-0.215,6.173,1.974,8.362 c1.558,1.557,3.646,2.392,5.779,2.392c0.864,0,1.736-0.137,2.583-0.419l64.704-21.568c2.686-0.895,4.717-3.118,5.368-5.874 l-52.965-52.967C211.619,240.506,209.397,242.538,208.501,245.223z"
      />
      <path
        style={{ fill: '#365558' }}
        d="M181.272,333.996c-2.09,0-4.182-0.797-5.778-2.392c-3.191-3.192-3.191-8.364,0-11.555l13.072-13.072 c3.192-3.19,8.364-3.19,11.555,0c3.191,3.192,3.191,8.364,0,11.555l-13.072,13.072C185.454,333.198,183.362,333.996,181.272,333.996 z"
      />
    </g>
  </svg> 
  
        </h1>
        <div className="flex justify-center border-y border-stone-300  text-sm font-semibold text-[#0095f6] dark:border-stone-700">
          <label
            className="flex-grow cursor-pointer py-3 text-center"
            htmlFor="photoFile"
          >

            <div className='editprofileimage'>
          <h1>Svg logo here</h1>
            <div className='profileremoveedit4'>Add new picture</div>
            </div>
          
            <input
              type="file"
              id="photoFile"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={(e) =>
                handleUploadImage({
                  e,
                  location: 'profilePhotos',
                  username: userDetails.displayName!,
                  maxWidthOrHeight: 400,
                  chatRoomIDs: userNotifications?.chatRoomIds!,
                  setLoading,
                  setAddPhoto,
                  handleImgURLFunction: handleUpdateProfilePhoto,
                })
              }
            />
          </label>
        </div>
        <button
          className="w-full border-b border-stone-300 py-3 text-sm font-semibold text-[#ED4956] dark:border-stone-700"
          type="button"
          onClick={() =>
            handleRemoveProfilePhoto({
              username: userDetails.displayName!,
              chatRoomIds: userNotifications?.chatRoomIds!,
              setLoading,
              setAddPhoto,
            })
          }
        >
          <div className='profileremoveedit'>
       <h1>Svg logo here</h1>
           <div className='profileremoveedit2'>Remove current photo</div>  

          </div>
        
        </button>
        <button
          className="w-full py-3 text-sm"
          onClick={() => setAddPhoto(false)}
          type="button"
        >
<div className='profileremoveedit'>

<h1>svg logo here</h1>
     <div className='profileremoveedit3' >Back</div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default AddProfilePhoto;
