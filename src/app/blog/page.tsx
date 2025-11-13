function Intro() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
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

    <linearGradient
      id="shineGradient"
      gradientUnits="userSpaceOnUse"
      x1="0"
      y1="0"
      x2="240"
      y2="0"
    >
      <stop offset="0%" stop-color="#008aff" />
      <stop offset="40%" stop-color="#ff8a00" />
      <stop offset="50%" stop-color="#fff6d4" />
      <stop offset="60%" stop-color="#008aff" />
      <stop offset="80%" stop-color="#00ff8a" />
      <stop offset="100%" stop-color="#ff8a00" />
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

  <circle cx="120" cy="120" r="104" stroke="#996" stroke-width="0" fill="none" />

  <text font-size="24" fontWeight="semibold" fill="url(#shineGradient)" font-family="sans-serif">
    <textPath href="#circlePath" startOffset="0%">
      Hello! I'm Marvin, a developer who is passionate about web.
    </textPath>
  </text>
</svg>

}

export default async function BlogPage() {
  return <div className="h-screen flex items-center justify-center"><Intro /></div>;
}
