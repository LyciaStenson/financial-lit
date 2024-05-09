'use client';

import { useQRCode } from 'next-qrcode';

const QRPage = () => {
    const { Canvas } = useQRCode();

  return (
    <div>
      <h1 className='text-7xl'>Hello Lewis</h1>
      <h3 className='text-4xl'>Are you ready to play!</h3>
      <Canvas
      text={'https://financial-lit.vercel.app/?id=32819709'}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 500,
        color: {
          dark: '#390176',
          light: '#ffffff',
        },
      }}
    />
    </div>
  );
};

export default QRPage;



