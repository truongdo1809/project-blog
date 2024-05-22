import { Modal } from "antd";

interface ChangeStatusConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  selectedRowKeys: React.Key[];
  selectedAction: string | null;
}

const ChangeStatusConfirmationModal: React.FC<ChangeStatusConfirmationModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  selectedRowKeys,    
  selectedAction,
}) => {
  return (
    <Modal
      title="Confirm Status Change"
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
    >
      <p>
        Bạn muốn đổi trạng thái của {selectedRowKeys.length} bài đăng sang
        &ldquo;{selectedAction}&ldquo;?
      </p>
    </Modal>
  );
};

export default ChangeStatusConfirmationModal;
