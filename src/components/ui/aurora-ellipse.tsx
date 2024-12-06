interface EllipseProps {
  color?: string;
}

export default function AuroraEllipse({ color }: EllipseProps) {
  return (
    <span
      className={`h-[12rem] w-[12rem] ${
        color ? `bg-[${color}]` : "bg-pink-500"
      } absolute rounded-full top-0 left-[50%] -translate-x-[50%] -z-0 filter blur-[200px]`}
    ></span>
  );
}
