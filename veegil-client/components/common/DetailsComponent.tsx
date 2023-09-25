import { detailsProps } from "../../interface";

const DetailsComponent = ({ Icon, title, content, color }: detailsProps) => {
  return (
    <div className="flex flex-col max-w-[300px] max-h-[300px] items-center bg-white border rounded-md  p-3 md:p-10">
      <span
        className={` p-2   ${
          color !== undefined ? color : "bg-primary"
        } rounded-full`}
      >
        <Icon className="text-white" />
      </span>
      <p className="font-bold mb-2 text-title">{title}</p>
      <p className="text-xs text-textcolor  text-center">{content}</p>
    </div>
  );
};

export default DetailsComponent;
