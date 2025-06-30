import { Tabs } from 'expo-router';
import { StyleSheet, View, Platform } from 'react-native';
import { ShoppingBag, Wallet, ScanLine, Bell, Settings } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, LAYOUT, BORDER_RADIUS } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textTertiary,
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarShowLabel: false, // Hide labels to make icons larger
        tabBarItemStyle: styles.tabBarItem,
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lists',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <ShoppingBag 
                size={24} 
                color={focused ? COLORS.listsActive : COLORS.listsInactive} 
                strokeWidth={focused ? 2.5 : 2}
                fill={focused ? COLORS.listsActiveFill : 'none'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: 'Budget',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActiveBudget]}>
              <Wallet 
                size={24} 
                color={focused ? COLORS.budgetActive : COLORS.budgetInactive} 
                strokeWidth={focused ? 2.5 : 2}
                fill={focused ? COLORS.budgetActiveFill : 'none'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActiveScan, styles.scanIconContainer]}>
              <ScanLine 
                size={26} 
                color={focused ? COLORS.scanActive : COLORS.scanInactive} 
                strokeWidth={focused ? 2.5 : 2} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActiveAlerts]}>
              <Bell 
                size={24} 
                color={focused ? COLORS.alertsActive : COLORS.alertsInactive} 
                strokeWidth={focused ? 2.5 : 2}
                fill={focused ? COLORS.alertsActiveFill : 'none'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActiveSettings]}>
              <Settings 
                size={24} 
                color={focused ? COLORS.settingsActive : COLORS.settingsInactive} 
                strokeWidth={focused ? 2.5 : 2}
                fill={focused ? COLORS.settingsActiveFill : 'none'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="list-detail"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="shopping-mode"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: LAYOUT.tabBarHeight,
    paddingBottom: Platform.OS === 'ios' ? SPACING.lg : SPACING.md,
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.xs,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabBarItem: {
    paddingVertical: SPACING.sm,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.lg,
    transition: 'all 0.2s ease',
  },
  iconContainerActive: {
    backgroundColor: COLORS.listsActiveBackground,
    shadowColor: COLORS.listsActive,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainerActiveBudget: {
    backgroundColor: COLORS.budgetActiveBackground,
    shadowColor: COLORS.budgetActive,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainerActiveScan: {
    backgroundColor: COLORS.scanActiveBackground,
    shadowColor: COLORS.scanActive,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  iconContainerActiveAlerts: {
    backgroundColor: COLORS.alertsActiveBackground,
    shadowColor: COLORS.alertsActive,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainerActiveSettings: {
    backgroundColor: COLORS.settingsActiveBackground,
    shadowColor: COLORS.settingsActive,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  scanIconContainer: {
    backgroundColor: COLORS.scanBackground,
    width: 42,
    height: 42,
    borderRadius: BORDER_RADIUS.xl,
    shadowColor: COLORS.scanShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});