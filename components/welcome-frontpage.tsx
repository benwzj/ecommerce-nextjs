import FrontpageImage from 'frontpage.jpeg';
import Image from 'next/image';

export default function WelcomeFrontpage() {
  const imageStyle = {
    height: `90vh`
  };
  return (
    <div className="relative mb-2 w-full" style={imageStyle}>
      <Image
        src={FrontpageImage}
        alt="Welcome image"
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover'
        }}
      />
      <div className="absolute top-1/4 w-full text-center text-3xl font-extrabold text-amber-600">
        Meet the high quality, lowest price evaporative cooling pads!
      </div>
    </div>
  );
}
