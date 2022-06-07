export interface Props {
  className?: string;
  commland?: boolean;
  type?: 'Initial' | 'Edit';
  children: any;
  title: string;
  confirmationStepTitle?: string;
  confirmationContentTitle?: string;
  confirmButton?: string;
  nextButton?: string;
  previousButton?: string;
  cancelButton?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}
