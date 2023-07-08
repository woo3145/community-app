import Image from 'next/image';
import Link from 'next/link';

interface Props {
  src: string;
  alt: string;
}

const PostThumbnail = ({ src, alt }: Props) => {
  return (
    <Image
      src={src}
      width={200}
      height={150}
      loading="lazy"
      alt={alt}
      placeholder="blur"
      blurDataURL={
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8Uw8AAh0BTZud3BwAAAAASUVORK5CYII='
      }
      style={{ objectFit: 'cover' }}
      className="rounded-md mt-4 w-full xl:w-[200px] h-[150px] bg-center"
    />
  );
};

export default PostThumbnail;
