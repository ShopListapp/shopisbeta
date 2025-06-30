import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Dimensions } from 'react-native';
import { User, Globe, Moon, CircleHelp as HelpCircle, LogOut, ChevronRight, CreditCard as Edit3, Bell } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS, LAYOUT } from '@/constants/theme';
import ScreenLayout from '@/components/layouts/ScreenLayout';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SettingsScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [sharedEnabled, setSharedEnabled] = useState(true);
  const [suggestionsEnabled, setSuggestionsEnabled] = useState(true);
  
  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <TouchableOpacity 
          style={styles.profileSection} 
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/profile')}
        >
          <View style={styles.profileAvatarContainer}>
            <Text style={styles.profileAvatarText}>JD</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
            <ChevronRight size={16} color={COLORS.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
        </TouchableOpacity>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View style={[styles.settingIconContainer, { backgroundColor: COLORS.warning }]}>
                <Moon size={16} color={COLORS.card} strokeWidth={2} fill="none" />
              </View>
              <Text style={styles.settingText}>Dark Mode</Text>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.card}
                ios_backgroundColor={COLORS.border}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Push Notifications</Text>
          
          <View style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View style={[styles.settingIconContainer, { backgroundColor: COLORS.primary }]}>
                <Bell size={16} color={COLORS.card} strokeWidth={2} fill="none" />
              </View>
              <Text style={styles.settingText}>Enable Notifications</Text>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.card}
                ios_backgroundColor={COLORS.border}
              />
            </View>
            
            <View style={styles.settingDivider} />
            
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Shopping Reminders</Text>
              <Switch
                value={reminderEnabled}
                onValueChange={setReminderEnabled}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.card}
                ios_backgroundColor={COLORS.border}
              />
            </View>
            
            <View style={styles.settingDivider} />
            
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Shared List Updates</Text>
              <Switch
                value={sharedEnabled}
                onValueChange={setSharedEnabled}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.card}
                ios_backgroundColor={COLORS.border}
              />
            </View>
            
            <View style={styles.settingDivider} />
            
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Smart Suggestions</Text>
              <Switch
                value={suggestionsEnabled}
                onValueChange={setSuggestionsEnabled}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.card}
                ios_backgroundColor={COLORS.border}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
              <View style={[styles.settingIconContainer, { backgroundColor: '#5856D6' }]}>
                <User size={16} color={COLORS.card} strokeWidth={2} fill="none" />
              </View>
              <Text style={styles.settingText}>Account Details</Text>
              <ChevronRight size={18} color={COLORS.textSecondary} strokeWidth={2} />
            </TouchableOpacity>
            
            <View style={styles.settingDivider} />
            
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
              <View style={[styles.settingIconContainer, { backgroundColor: '#5AC8FA' }]}>
                <Globe size={16} color={COLORS.card} strokeWidth={2} fill="none" />
              </View>
              <Text style={styles.settingText}>Language & Region</Text>
              <View style={styles.settingValue}>
                <Text style={styles.settingValueText}>English (US)</Text>
                <ChevronRight size={18} color={COLORS.textSecondary} strokeWidth={2} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <View style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
              <View style={[styles.settingIconContainer, { backgroundColor: '#34C759' }]}>
                <HelpCircle size={16} color={COLORS.card} strokeWidth={2} fill="none" />
              </View>
              <Text style={styles.settingText}>Help & Support</Text>
              <ChevronRight size={18} color={COLORS.textSecondary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
          <LogOut size={18} color={COLORS.error} strokeWidth={2} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT_SIZE.display,
    fontFamily: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  profileAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  profileAvatarText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.card,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  profileEmail: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  settingCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  settingDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: SPACING.md,
  },
  settingIconContainer: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  settingText: {
    flex: 1,
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginRight: SPACING.xs,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  logoutText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.error,
    marginLeft: SPACING.sm,
  },
  versionText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  bottomSpacing: {
    height: LAYOUT.tabBarHeight,
  },
});