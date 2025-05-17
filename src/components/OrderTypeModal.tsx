import React from 'react';
import '../App.css';

interface OrderTypeModalProps {
  onSelect: (orderType: 'Takeout' | 'Dine In') => void;
  onClose: () => void;
}

export default function OrderTypeModal({ onSelect, onClose }: OrderTypeModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2 className="modal-header">Sipariş Türü Seçin</h2>
          <div className="modal-button-group">
            <button
              onClick={() => onSelect('Takeout')}
              className="modal-button primary" 
            >
              Paket Servis
            </button>
            <button
              onClick={() => onSelect('Dine In')}
              className="modal-button primary"
            >
              Restorantta
            </button>
            <button
              onClick={onClose}
              className="modal-button secondary"
            >
              İptal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}