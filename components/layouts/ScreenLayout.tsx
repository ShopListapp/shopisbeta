import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { COLORS } from '@/constants/theme';

interface ScreenLayoutProps {
  children: React.ReactNode;
  style?: object;
}

export default function ScreenLayout({ children, style }: ScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={COLORS.background}
        translucent={false}
      />
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});