type Position = 'Bottom-Left' | 'Bottom-Right' | 'Top-Left' | 'Top-Right';

export interface Props {
  children?: any;
  className?: string;
  label?: string;
  info?: string;
  name?: string;
  id: string;
  defaultText?: string;
  selectedValue?: string;
  search?: boolean;
  menuMaxHeight?: string;
  menuWidth?: string;
  helptext?: string;
  errorMessage?: string;
  error?: boolean;
  disabled?: boolean;
  menuPosition?: Position;
  onChange?: (e: any) => void;
}
