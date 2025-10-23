import { QRCodeSVG } from 'qrcode.react';

export default function QRImage({ value, size = 256 }) {
  return (
    <div className="flex justify-center p-4 bg-white rounded-lg shadow-md">
      <QRCodeSVG value={value} size={size} />
    </div>
  );
}
