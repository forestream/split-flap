export default function SplitFlapStyle() {
  return (
    <style>
      {`
        @keyframes flap-current {
          0% {
            transform: rotateX(0deg);
          }
          100% {
            transform: rotateX(180deg);
          }
        }
        @keyframes flap-next {
          0% {
            transform: rotateX(-180deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
      `}
    </style>
  );
}
