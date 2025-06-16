import { useRouter, Slot } from 'expo-router';
import { useZayma, ZaymaProvider } from './(tabs)/ZaymaContext';
import { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

function RootLayoutInner() {
  const { user } = useZayma();
  const router = useRouter();

  //const [loading, setLoading] = useState(true);
  //useEffect(() => {
    //const timeout = setTimeout(() => {
      //if (!user) {
        //router.replace('/AuthScreen'); // go to Auth
      //} else {
        //router.replace('/(tabs)/HomeScreen'); // go to home
      //}
      //setLoading(false);
    //}, 1000);

    //return () => clearTimeout(timeout);
  //}, [user]);

  //if (loading) {
    //return (
      //<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //<ActivityIndicator size="large" color="#27ae60" />
     //</View>
   // );
  //}

  return <Slot />;
}

export default function RootLayout() {
  return (
    <ZaymaProvider>
      <RootLayoutInner />
    </ZaymaProvider>
  );
}

