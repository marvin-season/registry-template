import { useMemo } from 'react';

export default function CircleShimmer(props: { colorSteps?: string[]; text?: string }) {
  const {
    colorSteps = ['#008aff', '#ff8a00', '#fff6d4', '#008aff', '#00ff8a', '#ff8a00'],
    text = "Hello! I'm Marvin, a developer who is passionate about web.",
  } = props;

  const stops = useMemo(() => {
    return colorSteps.map((color, index) => {
      return <stop key={index} offset={`${(index * 100) / colorSteps.length}%`} stopColor={color} />;
    });
  }, [colorSteps]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
      <defs>
        <path
          id="circlePath"
          d="
          M 120,120
          m -104,0
          a 104,104 0 1,1 208,0
          a 104,104 0 1,1 -208,0
        "
        />

        <linearGradient id="shineGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="240" y2="0">
          {stops}
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from="-240 0"
            to="240 0"
            dur="4s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>

      <circle cx="120" cy="120" r="104" stroke="#996" strokeWidth="0" fill="none" />

      <text fontSize="24" fontWeight="semibold" fill="url(#shineGradient)" fontFamily="sans-serif">
        <textPath href="#circlePath" startOffset="0%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
