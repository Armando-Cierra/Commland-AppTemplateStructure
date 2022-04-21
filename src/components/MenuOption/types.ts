import type { AvailableTelicon } from '@2600hz/sds-react-components';

interface Avatar {
  username: string;
  profilePic?: string;
}

export interface Props {
  className?: string;
  children: string;
  description?: string;
  icon?: AvailableTelicon;
  avatar?: Avatar;
  disabled?: boolean;
  value: string;
  onClick?: (e: any) => void;
}
