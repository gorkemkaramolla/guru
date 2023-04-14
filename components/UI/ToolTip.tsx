import React from 'react';
import { Tooltip, Button } from '@nextui-org/react';
interface Props {
  message: string;
}

const ToolTip: React.FC<Props> = ({ message }) => {
  return (
    <Tooltip placement='bottom' css={{ width: 180 }} content={message}>
      <img src='/guru-icons/information.svg' alt='' />
    </Tooltip>
  );
};

export default ToolTip;
