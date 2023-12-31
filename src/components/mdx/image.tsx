import NextImage, { ImageProps } from "next/image";

const Image = ({ ...rest }: ImageProps) => <NextImage {...rest} className={"my-4 rounded-lg"} />;

export default Image;
