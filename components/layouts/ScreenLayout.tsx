import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { COLORS } from '@/constants/theme';

interface ScreenLayoutProps {
  children: React.ReactNode;
  style?: object;
}

export default function ScreenLayout({ children, style }: ScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
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
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});