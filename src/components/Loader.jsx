import Lottie from 'lottie-react';
import spinner from '../assets/lotties/lottie-spinner.json';

export default function Loader({ size = 120, loop = true }) {
  return (
    <div className="flex items-center justify-center">
      <Lottie
        animationData={spinner}
        loop={loop}
        autoplay
        style={{ width: size, height: size }}
        rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
      />
    </div>
  );
} 