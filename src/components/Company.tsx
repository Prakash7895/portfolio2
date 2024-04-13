import { CSSProperties, FC, useEffect, useState } from 'react';

interface ICompany {
  id: string;
  style?: CSSProperties;
  bgColor?: string;
  boxWidth?: number;
  boxHeight?: number;
  verticalCount?: number;
  horizontalCount?: number;
  animateCounter?: number;
  onClosed?: () => void;
}

const Company: FC<ICompany> = ({
  id,
  style,
  boxWidth = 40,
  boxHeight = 40,
  verticalCount = 12,
  bgColor = '#f1a421',
  horizontalCount = 8,
  animateCounter = 0,
  onClosed,
}) => {
  const zPos = 300;
  const time = 500;

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullyOpen, setIsFullyOpen] = useState(false);

  const animateToFinalPos = () => {
    const boxes = document.getElementsByClassName('boxes');
    for (const el of boxes) {
      if (el.nodeType === Node.ELEMENT_NODE) {
        const box = el as HTMLDivElement;
        const dataset = box.dataset;
        const i = Number(dataset.i);
        const j = Number(dataset.j);

        const keyFrames = [
          { transform: box.style.transform },
          {
            transform: `translateZ(${
              zPos + (verticalCount - i) * boxHeight
            }px) rotateX(-90deg) translateX(${
              (j - horizontalCount / 2) * boxWidth
            }px) rotateX(${Math.random() < 0.5 ? 180 : 0}deg) rotateY(${
              Math.random() < 0.5 ? 180 : 0
            }deg) rotateZ(${Math.random() < 0.5 ? 180 : 0}deg)`,
          },
        ];

        const boxAnim = box.animate(keyFrames, {
          duration: time + Math.ceil(Math.random() * time),
          fill: 'forwards',
          easing: 'ease-in',
        });

        if (i === verticalCount - 1 && j === horizontalCount - 1) {
          boxAnim.onfinish = () => {
            setIsOpen(true);
            setIsAnimating(false);

            animateCrossIcon();

            setTimeout(() => {
              setIsFullyOpen(true);
            }, 150);
          };
        }
      }
    }
  };

  const animate = () => {
    const boxes = document.getElementsByClassName('boxes');

    for (const el of boxes) {
      if (el.nodeType === Node.ELEMENT_NODE) {
        const box = el as HTMLDivElement;
        const dataset = box.dataset;
        const i = Number(dataset.i);
        const j = Number(dataset.j);

        const keyFrameFromStart = [
          { transform: 'translateZ(0px) rotateX(0deg) translateX(0px)' },
          {
            transform: `translateZ(${
              (zPos * 2) / 3 +
              Math.ceil(Math.random() * (boxHeight * verticalCount))
            }px) rotateX(-90deg) translateX(${
              Math.ceil(
                Math.random() * boxWidth * ((horizontalCount * 2) / 3)
              ) * (Math.random() < 0.5 ? -1 : 1)
            }px) translateZ(${
              Math.ceil(Math.random() * boxHeight * ((verticalCount * 2) / 3)) *
              (Math.random() < 0.5 ? -1 : 1)
            }px) rotateX(${Math.random() < 0.5 ? 180 : 0}deg) rotateY(${
              Math.random() < 0.5 ? 180 : 0
            }deg) rotateZ(${Math.random() < 0.5 ? 180 : 0}deg)`,
          },
        ];

        const keyFrameFromEnd = [
          { transform: box.style.transform },
          { transform: 'translateZ(0px) rotateX(0deg) translateX(0px)' },
        ];

        const boxAnim = box.animate(
          isOpen ? keyFrameFromEnd : keyFrameFromStart,
          {
            duration: time + Math.ceil(Math.random() * time),
            fill: 'forwards',
            easing: isOpen ? 'ease-out' : 'ease',
          }
        );

        if (i === verticalCount - 1 && j === horizontalCount - 1) {
          boxAnim.onfinish = () => {
            if (isOpen) {
              setIsOpen(false);
              setIsAnimating(false);
              onClosed && onClosed();
            } else {
              setTimeout(() => {
                animateToFinalPos();
              }, 150);
            }
          };
        }
      }
    }
  };

  const animateCrossIcon = (callback?: Function) => {
    const crossIcon = document.getElementsByClassName('cross-icon');

    const icon1 = crossIcon[0] as HTMLDivElement;
    const icon2 = crossIcon[1] as HTMLDivElement;

    const keyFrames = [
      { transform: 'rotateZ(45deg)' },
      { transform: 'rotateZ(0deg)' },
    ];

    icon1.animate(!isOpen ? keyFrames.reverse() : keyFrames, {
      duration: time / 2,
      fill: 'forwards',
      easing: 'ease-out',
    });

    const keyFrames1 = [
      { transform: 'rotateZ(-45deg)' },
      { transform: 'rotateZ(0deg)' },
    ];
    const iconAnim = icon2.animate(
      !isOpen ? keyFrames1.reverse() : keyFrames1,
      {
        duration: time / 2,
        fill: 'forwards',
        easing: 'ease-out',
      }
    );

    iconAnim.onfinish = () => {
      if (callback) {
        callback();
      }
      icon1.style.opacity = !isOpen ? '1' : '0';
      icon2.style.opacity = !isOpen ? '1' : '0';
    };
  };

  const startAnimation = () => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    if (isOpen) {
      setIsFullyOpen(false);
      animateCrossIcon(() => {
        animate();
      });
    } else {
      animate();
    }
  };

  useEffect(() => {
    if (animateCounter > 0) {
      startAnimation();
    }
  }, [animateCounter]);

  return (
    <div style={style}>
      <div id={`company-${id}`} className='border-2 border-blue-600'>
        {Array.from(Array(verticalCount)).map((_, i) => {
          return Array.from(Array(horizontalCount)).map((_, j) => (
            <div
              className={`boxes box-${i}-${j}`}
              key={i + j}
              data-i={i}
              data-j={j}
              style={{
                width: `${boxWidth}px`,
                height: `${boxHeight}px`,
                backgroundColor: bgColor,
                opacity: 0.7,
                boxShadow: `0px 0px 10px 3px ${bgColor}`,
                transitionProperty: 'all',
                transitionDuration: '0.5s',
              }}
            ></div>
          ));
        })}
      </div>
      <div
        style={{
          width: `${horizontalCount * boxWidth}px`,
          height: `${verticalCount * boxHeight}px`,
          backgroundColor: bgColor,
          opacity: isFullyOpen ? 1 : 0,
          transformOrigin: 'top center',
          transform: `translateZ(${
            zPos + (verticalCount + 0.5) * boxHeight
          }px) rotateX(-90deg) translateZ(22px) translateX(-${
            (horizontalCount / 2) * boxWidth
          }px)`,
          transitionProperty: 'all',
          transitionDuration: '0.5s',
        }}
      >
        Hello
      </div>
      <div
        style={{
          width: '40px',
          height: '40px',
          transformOrigin: 'top center',
          transform: `translateZ(${
            zPos + (verticalCount + 1) * boxHeight
          }px) rotateX(-90deg) translateZ(22px) translateX(${
            (horizontalCount / 2) * boxWidth - 20
          }px)`,
          display: 'flex',
          justifyContent: 'center',
        }}
        onClick={() => {
          isOpen && startAnimation();
        }}
        className={`${isOpen ? 'cursor-pointer' : ''}`}
      >
        <div
          className={`cross-icon`}
          style={{
            width: '50px',
            height: '2px',
            top: 'calc(50% - 1px)',
            backgroundColor: '#faddff',
            opacity: isOpen ? 1 : 0,
            transitionProperty: 'all',
            transitionDuration: '0.25s',
          }}
        ></div>
        <div
          className={`cross-icon`}
          style={{
            width: '50px',
            height: '2px',
            top: 'calc(50% - 1px)',
            backgroundColor: '#faddff',
            opacity: isOpen ? 1 : 0,
            transitionProperty: 'all',
            transitionDuration: '0.25s',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Company;
