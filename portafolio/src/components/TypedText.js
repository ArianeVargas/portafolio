import { useEffect, useRef, useState } from 'preact/hooks';

const TypingEffect = () => {
  const elementRef = useRef(null);
  const [currentString, setCurrentString] = useState('');
  const strings = [
    'Desarrolladora web!',
    'Backend!',
    'Frontend!',
  ];

  let i = 0;
  let j = 0;
  let typingSpeed = 100;
  let erasingSpeed = 50;
  let delay = 2000;

  useEffect(() => {
    const type = () => {
      if (j < strings[i].length) {
        setCurrentString((prev) => prev + strings[i].charAt(j));
        j++;
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(erase, delay);
      }
    };

    const erase = () => {
      if (j > 0) {
        setCurrentString((prev) => prev.substring(0, j - 1));
        j--;
        setTimeout(erase, erasingSpeed);
      } else {
        i = (i + 1) % strings.length;
        setTimeout(type, typingSpeed);
      }
    };

    type();
  }, []); 

  return (
    <div className="typed min-h-[40px] max-h-[40px] overflow-hidden leading-[40px]" ref={elementRef}>
      <i className="h3">{currentString}</i>
    </div>
  );
};

export default TypingEffect;
