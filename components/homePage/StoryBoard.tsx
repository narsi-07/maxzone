/* eslint-disable react/no-array-index-key */



import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import AddStory from './AddStory';
import StoryBoardTag from './StoryBoardTag';
import atoms from '../../util/atoms';

const playMouseClickSound = () => {
  const mouseclick = new Audio('https://uploads.sitepoint.com/wp-content/uploads/2023/06/1687569402mixkit-fast-double-click-on-mouse-275.wav');
  mouseclick.play();
};

function StoryBoard() {
  const [darkMode] = useAtom(atoms.darkMode);
  const [storiesArray] = useAtom(atoms.storiesArray);
  const [storiesLoading, setStoriesLoading] = useAtom(atoms.storiesLoading);
  useEffect(() => {

    // This code will be executed when the component has mounted
    setStoriesLoading(false);
  }, []);
  const circles = [1, 2, 3, 4, 5];

  return (
    <div
    onMouseDown={playMouseClickSound}
    role="presentation" // Add role="presentation" to indicate a presentational element
    className={`${
      darkMode ? 'scrollbarDark' : 'scrollbarLight'
    }  scrollbar mt-1 flex overflow-x-auto rounded-lg border border-stone-300 bg-white py-4 pl-4 dark:border-stone-700 dark:bg-[#1c1c1c]`}
  >
      <AddStory />
      <div
        className={`${storiesLoading ? 'fixed opacity-0' : ''} flex`}
       
      >
        {storiesArray.map((username, index) => (
          <StoryBoardTag username={username} key={username + index} />
        ))}
      </div>
      {storiesLoading ? (
        <div className="flex w-full justify-between gap-2">
          {circles.map((index) => (
            <div
              key={index}
              className="h-16 w-16 min-w-[64px] animate-pulse rounded-full bg-[#ebebeb] dark:bg-[#313131]"
            />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default StoryBoard;
