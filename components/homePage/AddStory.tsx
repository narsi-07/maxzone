import { useAtom } from 'jotai';
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/future/image';
import AddStorySVG from '../svgComps/AddStorySVG';
import handleUpdateUserStory from '../../util/handleUpdateUserStory';
import handleUploadImage from '../../util/handleUploadImage';
import useCheckNameLength from '../../hooks/useCheckNameLength';
import atoms from '../../util/atoms';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';
import handleRemoveStory from '../../util/handleRemoveStory';
import DazzloneLoading from '../svgComps/DazzloneLoading';


function AddStory() {
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [loading, setLoading] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Explicitly define type
  const [showCurrentStory, setShowCurrentStory] = useState(false); // State to manage visibility of current story preview

  const widthRef = React.useRef<HTMLDivElement>(null);
  const checkLength = useCheckNameLength({ widthRef });

  const dataURLToFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : ''; // Default value if match is null

    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i+=1) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStory = () => {
    if (previewImage) {
      setLoading(true);
      handleUploadImage({
        e: { target: { files: [dataURLToFile(previewImage, 'story.jpg')] } },
        location: 'stories',
        username: userDetails.displayName!,
        maxWidthOrHeight: 1000,
        chatRoomIDs: null,
        setLoading,
        setAddPhoto,
        handleImgURLFunction: handleUpdateUserStory,
      });
      setPreviewImage(null);
    }
  };

  const handleShowCurrentStory = () => {
    // Toggle the visibility of current story preview
    setShowCurrentStory(true);
  };

  const handleCloseCurrentStory = () => {
    // Close current story preview
    setShowCurrentStory(false);
  };

  return (
    <>
      <div className="flex cursor-pointer flex-col items-start">
        <div className="relative">
          <button
            className="w-[74px]"
            type="button"
            onClick={() => setAddPhoto(true)}
          >
            {userDetails.photoURL ? (
              <Image
                className="relative z-10 h-14 w-14 select-none rounded-full bg-[#ebebeb] object-cover p-[2px] dark:bg-[#1c1c1c]"
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
                ? 'bg-[#e4e4e4] dark:bg-[#4d4d4d]'
                : 'bg-gradient-to-tr from-[black] to-[#2dccdb]'
            } absolute top-[-2px] left-[-2px]  z-0 h-[60px] w-[60px] rounded-full `}
          />
          <div className="absolute bottom-0 right-[15px] z-10">
            <AddStorySVG />
          </div>
        </div>
        <div className="relative mt-2 max-w-[74px] overflow-hidden text-xs">
          <p ref={widthRef}>{userDetails.displayName}</p>
          {checkLength.nameWidth === 74 ? (
            <div className="absolute top-0 right-0 bg-white pr-[5px] dark:bg-[#1c1c1c]">
              <p>...</p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {addPhoto ? (
        <div className="blur76 fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[#0000008f] dark:bg-[#000000d7]">
          {loading ? (
       <DazzloneLoading/>
          ) : (
            <div className="jgkhkjhkh w-[400px] flex-col rounded-xl bg-white dark:border dark:border-stone-300 dark:bg-[#000000]">
              {previewImage ? (
                <>
                  <div className="mt-4 flex justify-center">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <button
                    className="w-full py-3 text-sm font-semibold text-[#29d635]"
                    type="button"
                    onClick={handleAddStory}
                  >
                    Add Story
                  </button>
                </>
              ) : (
                <>
                  <h1 className="py-7 text-center text-lg font-semibold">
                    Change story photo
                  </h1>
                  <div className="flex justify-center border-y border-stone-300 text-sm font-semibold text-[#29d635] dark:border-stone-700">
                    <label
                      className="flex-grow cursor-pointer py-3 text-center"
                      htmlFor="photoFile"
                    >
                      Upload Photo
                      <input
                        type="file"
                        id="photoFile"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleImageChange}
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
                  >
                    Remove current story
                  </button>
                  {/* New button */}
                  <button
                    className="w-full border-b border-stone-300 py-3 text-sm font-semibold text-[#3B82F6] dark:border-stone-700"
                    type="button"
                    onClick={handleShowCurrentStory}
                  >
                    Show Current Story
                  </button>
                  {/* End of new button */}
                </>
              )}
              <button
                className="w-full py-3 text-sm"
                onClick={() => {
                  setAddPhoto(false);
                  setPreviewImage(null);
                }}
                type="button"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
      {/* Popup modal for current story preview */}
      {showCurrentStory && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[#0000008f] dark:bg-[#000000d7]">
          <div className="bg-white p-8 rounded-lg">
            {/* Display current story preview here */}
            <div className="mt-4 flex justify-center">
              {/* Example: */}
              <img
                src={userNotifications.story}
                alt="Current Story"
                className="max-w-full h-auto jhgjg object-cover rounded-md"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type='button'
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleCloseCurrentStory}
              >
                Hide
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
                onClick={() => {
                  setShowCurrentStory(false);
                  setAddPhoto(false);
                  setPreviewImage(null);
                }}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddStory;

