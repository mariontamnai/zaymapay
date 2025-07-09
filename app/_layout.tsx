import { Slot, useRouter } from 'expo-router';
import { useZayma, ZaymaProvider } from './ZaymaContext';

function RootLayoutInner() {
  const { user } = useZayma();
  const router = useRouter();
  return <Slot />;
}

export default function RootLayout() {
  return (
    <ZaymaProvider>
      <RootLayoutInner />
    </ZaymaProvider>
  );
}

