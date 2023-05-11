import { Popover } from '@nextui-org/react';
interface Props {
  handleColor: (color: string) => void;
  popIsOpen: boolean;
}
const PopOver: React.FC<Props> = ({ handleColor, popIsOpen }) => {
  const colors = [
    'red',
    'yellow',
    'cyan',
    'blue',
    'green',
    'purple',
    'rgba(200,200,80,1)',
  ];
  return (
    <Popover>
      <Popover.Trigger>Open Popover</Popover.Trigger>
      <Popover.Content>
        <div className='flex '>
          {colors.map((color, i) => (
            <button
              key={i}
              onClick={() => {
                handleColor(color);
              }}
              className='w-[20px] h-[20px]'
              style={{ backgroundColor: color }}
            ></button>
          ))}
        </div>
      </Popover.Content>
    </Popover>
  );
};

export default PopOver;
