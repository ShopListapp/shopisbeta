import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { ArrowLeft, CreditCard, User, Mail, Phone, MapPin, CreditCard as Edit3, Save, X } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS, LAYOUT } from '@/constants/theme';
import ScreenLayout from '@/components/layouts/ScreenLayout';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001'
  });
  const [editData, setEditData] = useState(profileData);
  const [cardBalance, setCardBalance] = useState(250.00);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleAddMoney = () => {
    Alert.alert(
      'Add Money',
      'How much would you like to add to your card?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: '$25', onPress: () => setCardBalance(prev => prev + 25) },
        { text: '$50', onPress: () => setCardBalance(prev => prev + 50) },
        { text: '$100', onPress: () => setCardBalance(prev => prev + 100) },
      ]
    );
  };

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={COLORS.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
        
        <Text style={styles.title}>Profile</Text>
        
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => isEditing ? handleSave() : setIsEditing(true)}
          activeOpacity={0.7}
        >
          {isEditing ? (
            <Save size={18} color={COLORS.primary} strokeWidth={2} />
          ) : (
            <Edit3 size={18} color={COLORS.primary} strokeWidth={2} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Card Section */}
        <View style={styles.cardSection}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <View style={styles.cardLogo}>
                <CreditCard size={24} color={COLORS.card} strokeWidth={2} />
              </View>
              <Text style={styles.cardType}>Shopping Card</Text>
            </View>
            
            <View style={styles.cardBalance}>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Text style={styles.balanceAmount}>${cardBalance.toFixed(2)}</Text>
            </View>
            
            <View style={styles.cardFooter}>
              <Text style={styles.cardNumber}>•••• •••• •••• 1234</Text>
              <Text style={styles.cardExpiry}>12/27</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.addMoneyButton}
            onPress={handleAddMoney}
            activeOpacity={0.7}
          >
            <Text style={styles.addMoneyText}>Add Money</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.profileCard}>
            <View style={styles.avatarSection}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>
                  {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                </Text>
              </View>
              {isEditing && (
                <TouchableOpacity style={styles.changePhotoButton} activeOpacity={0.7}>
                  <Text style={styles.changePhotoText}>Change Photo</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.formSection}>
              <View style={styles.inputRow}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={editData.firstName}
                      onChangeText={(text) => setEditData({...editData, firstName: text})}
                      placeholder="First Name"
                    />
                  ) : (
                    <View style={styles.inputDisplay}>
                      <User size={16} color={COLORS.textSecondary} strokeWidth={2} />
                      <Text style={styles.inputText}>{profileData.firstName}</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={editData.lastName}
                      onChangeText={(text) => setEditData({...editData, lastName: text})}
                      placeholder="Last Name"
                    />
                  ) : (
                    <View style={styles.inputDisplay}>
                      <User size={16} color={COLORS.textSecondary} strokeWidth={2} />
                      <Text style={styles.inputText}>{profileData.lastName}</Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={editData.email}
                    onChangeText={(text) => setEditData({...editData, email: text})}
                    placeholder="Email"
                    keyboardType="email-address"
                  />
                ) : (
                  <View style={styles.inputDisplay}>
                    <Mail size={16} color={COLORS.textSecondary} strokeWidth={2} />
                    <Text style={styles.inputText}>{profileData.email}</Text>
                  </View>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={editData.phone}
                    onChangeText={(text) => setEditData({...editData, phone: text})}
                    placeholder="Phone"
                    keyboardType="phone-pad"
                  />
                ) : (
                  <View style={styles.inputDisplay}>
                    <Phone size={16} color={COLORS.textSecondary} strokeWidth={2} />
                    <Text style={styles.inputText}>{profileData.phone}</Text>
                  </View>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Address</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={editData.address}
                    onChangeText={(text) => setEditData({...editData, address: text})}
                    placeholder="Address"
                    multiline
                  />
                ) : (
                  <View style={styles.inputDisplay}>
                    <MapPin size={16} color={COLORS.textSecondary} strokeWidth={2} />
                    <Text style={styles.inputText}>{profileData.address}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {isEditing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <X size={16} color={COLORS.textSecondary} strokeWidth={2} />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <Save size={16} color={COLORS.card} strokeWidth={2} />
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  title: {
    flex: 1,
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textPrimary,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  cardSection: {
    marginBottom: SPACING.xl,
  },
  cardContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  cardLogo: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  cardType: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.card,
  },
  cardBalance: {
    marginBottom: SPACING.lg,
  },
  balanceLabel: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  balanceAmount: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xxxl,
    color: COLORS.card,
    letterSpacing: -1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.card,
    letterSpacing: 2,
  },
  cardExpiry: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  addMoneyButton: {
    backgroundColor: COLORS.success,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  addMoneyText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.card,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  avatarText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xxl,
    color: COLORS.card,
  },
  changePhotoButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  changePhotoText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  formSection: {
    gap: SPACING.md,
  },
  inputRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.medium,
  },
  saveButtonText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.card,
    marginLeft: SPACING.xs,
  },
  bottomSpacing: {
    height: LAYOUT.tabBarHeight + SPACING.lg,
  },
});