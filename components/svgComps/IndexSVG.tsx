/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function IndexSVG({ page }: { page: string }) {
  const [darkMode] = useAtom(atoms.darkMode);
  
  // Define the fill color based on darkMode
  const fillColor = darkMode ? '#ffffff' : '#000000';

  return (
    <svg className='inboxsvg' fill={fillColor} height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  
	 viewBox="0 0 60 60">
      <path d="M30.5,0C14.233,0,1,13.233,1,29.5c0,5.146,1.346,10.202,3.896,14.65L0.051,58.684c-0.116,0.349-0.032,0.732,0.219,1
      C0.462,59.889,0.728,60,1,60c0.085,0,0.17-0.011,0.254-0.033l15.867-4.175C21.243,57.892,25.86,59,30.5,59
      C46.767,59,60,45.767,60,29.5S46.767,0,30.5,0z M17,34c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S19.206,34,17,34z M30,34
      c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S32.206,34,30,34z M43,34c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4
      S45.206,34,43,34z"/>
    </svg>
  );
}

export default IndexSVG;
