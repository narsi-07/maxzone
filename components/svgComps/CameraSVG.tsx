import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function CameraSVG() {
  const [darkMode] = useAtom(atoms.darkMode);

  return (
    <div className="h-5 w-5 sm:h-7 sm:w-7">
      <svg viewBox="0 -0.05 20.109 20.109" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="edit-user-2" transform="translate(-2 -2)"> <circle id="secondary" fill="#2ca9bc" cx="5" cy="5" r="5" transform="translate(6 3)"></circle> <path id="primary" d="M9,21H4a1,1,0,0,1-1-1,7,7,0,0,1,7-7h1" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <path id="primary-2" data-name="primary" d="M20.71,16.09,15.8,21H13V18.2l4.91-4.91a1,1,0,0,1,1.4,0l1.4,1.4A1,1,0,0,1,20.71,16.09ZM11,3a5,5,0,1,0,5,5A5,5,0,0,0,11,3Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> </g> </g></svg>
    </div>
  );
}
export default CameraSVG;
