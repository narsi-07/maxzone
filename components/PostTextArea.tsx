import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useAtom } from 'jotai';
import atoms, { postCommentTypes, postType } from '../util/atoms';
import EmojiSelector from './EmojiSelector';
import useHandleEmojiPopUp from '../hooks/useHandleEmojiPopUp';
import handleSendPostMessage from '../util/handleSendPostMessage';

interface Props {
  postInformation: postType;
  postUserDetails: postCommentTypes;
}

function PostTextArea({ postInformation, postUserDetails }: Props) {
  const [darkMode] = useAtom(atoms.darkMode);
  const [userDetails] = useAtom(atoms.userDetails);

  const [commentText, setCommentText] = React.useState('');
  const [displayEmojiSelector, setDisplayEmojiSelector] = React.useState(false);

  useHandleEmojiPopUp({ setDisplayEmojiSelector });

  return (
    <div className="relative flex justify-between border-t border-stone-200 pb-1 dark:border-stone-700">
      <button
        className="px-5"
        type="button"
        onClick={() => setDisplayEmojiSelector(!displayEmojiSelector)}
      >
        <div>
          <svg
            id="emoji"
            aria-label="Emoji"
            fill={darkMode ? '#a9a9a9' : '#262626'}
            height="40"
            role="img"
            viewBox="0 0 21 19"
            width="``40"
          >
           <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path> <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"></path>
            
          </svg>
        </div>
      </button>
      <TextareaAutosize
        className="my-3 w-[80%] resize-none text-sm focus:outline-none dark:bg-[#1c1c1c]"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        maxRows={4}
        minRows={1}
        onKeyPress={(e: any) =>
          handleSendPostMessage({
            e,
            postInformation,
            postUserDetails,
            userDetails,
            commentText,
            setCommentText,
          })
        }
      />
      <button
        id="sendMessage"
        className={`${
          commentText === ''
            ? 'pointer-events-none text-[#9dd8ff]'
            : 'text-[#0095F6]'
        } pr-4 pl-2 text-sm font-semibold `}
        type="button"
        onClick={(e: any) =>
          handleSendPostMessage({
            e,
            postInformation,
            postUserDetails,
            userDetails,
            commentText,
            setCommentText,
          })
        }
      >
        Send
      </button>
      {displayEmojiSelector ? (
        <div id="emojiSelector" className="absolute left-0 top-[-340px]">
          <EmojiSelector
            setInputText={setCommentText}
            inputText={commentText}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default PostTextArea;
