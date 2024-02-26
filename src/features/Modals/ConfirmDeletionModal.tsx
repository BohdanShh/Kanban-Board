import { FC } from 'react';
import { Button } from 'src/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';

type ConfirmDeletionModalProps = {
  title: string;
  description: string;
  onCancel?: () => void;
  onDelete?: () => void;
};

const ConfirmDeletionModal: FC<ConfirmDeletionModalProps> = ({
  title,
  description,
  onCancel,
  onDelete,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-[red]">{title}</DialogTitle>
      </DialogHeader>
      <DialogDescription className="flex flex-col gap-5">{description}</DialogDescription>
      <DialogFooter>
        <DialogClose
          className="flex items-center gap-3"
          tabIndex={-1}
        >
          <Button
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
          >
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

export default ConfirmDeletionModal;
