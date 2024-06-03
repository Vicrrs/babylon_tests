import dynamic from 'next/dynamic';
import UploadForm from '../components/UploadForm';

const BabylonScene = dynamic(() => import('../components/BabylonScene'), { ssr: false });

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* <UploadForm /> */}
      <BabylonScene />
    </div>
  );
}