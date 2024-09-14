export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 -0.04 20.088 20.088"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="rain" transform="translate(-1.912 -1.986)">
        <path
          id="secondary"
          fill="#2ca9bc"
          d="M21,9a4,4,0,0,1-4,4H6A3,3,0,1,1,7.08,7.21a5,5,0,0,1,9-2.09A4.08,4.08,0,0,1,17,5a4,4,0,0,1,4,4Z"
        />
        <path
          id="primary"
          d="M6,17v2m4-2v4m4-4v2m4-2v4M17,5a4.08,4.08,0,0,0-.93.12,5,5,0,0,0-9,2.09A3,3,0,1,0,6,13H17a4,4,0,0,0,0-8Z"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
