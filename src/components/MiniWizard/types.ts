export interface Props {
  show: boolean;
  className?: string;
  commland?: boolean;
  type?: 'Initial' | 'Edit';
  children: any;
  title: string;
  confirmationStepTitle?: string;
  confirmationContentTitle?: string;
  confirmationContentDescription?: string;
  confirmButton?: string;
  nextButton?: string;
  previousButton?: string;
  cancelButton?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}
