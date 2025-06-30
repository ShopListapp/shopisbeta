import { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Switch, KeyboardAvoidingView, Platform } from 'react-native';
import { X, Users, User } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

interface CreateListModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateList: (name: string, isShared: boolean) => void;
}

export default function CreateListModal({ visible, onClose, onCreateList }: CreateListModalProps) {
  const [listName, setListName] = useState('');
  const [isShared, setIsShared] = useState(false);

  const handleCreate = () => {
    if (listName.trim()) {
      onCreateList(listName.trim(), isShared);
      setListName('');
      setIsShared(false);
    }
  };

  const handleClose = () => {
    setListName('');
    setIsShared(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1}
          onPress={handleClose}
        >
          <View style={styles.modal}>
            <TouchableOpacity 
              style={styles.dragHandle}
              onPress={handleClose}
            >
              <View style={styles.dragBar} />
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title}>Create New List</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <X size={20} color={COLORS.textSecondary} strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>List Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter list name..."
                  placeholderTextColor={COLORS.textSecondary}
                  value={listName}
                  onChangeText={setListName}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={handleCreate}
                />
              </View>

              <View style={styles.shareContainer}>
                <View style={styles.shareOption}>
                  <View style={styles.shareIconContainer}>
                    {isShared ? (
                      <Users size={18} color={COLORS.primary} strokeWidth={2} />
                    ) : (
                      <User size={18} color={COLORS.textSecondary} strokeWidth={2} />
                    )}
                  </View>
                  <View style={styles.shareInfo}>
                    <Text style={styles.shareTitle}>
                      {isShared ? 'Shared List' : 'Personal List'}
                    </Text>
                    <Text style={styles.shareDescription}>
                      {isShared 
                        ? 'Family members can view and edit this list'
                        : 'Only you can view and edit this list'
                      }
                    </Text>
                  </View>
                  <Switch
                    value={isShared}
                    onValueChange={setIsShared}
                    trackColor={{ false: COLORS.border, true: COLORS.primary }}
                    thumbColor={COLORS.card}
                    ios_backgroundColor={COLORS.border}
                  />
                </View>
              </View>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handleClose}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.createButton,
                  !listName.trim() && styles.createButtonDisabled
                ]} 
                onPress={handleCreate}
                activeOpacity={0.8}
                disabled={!listName.trim()}
              >
                <Text style={[
                  styles.createButtonText,
                  !listName.trim() && styles.createButtonTextDisabled
                ]}>
                  Create List
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  modal: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xxl,
    paddingBottom: SPACING.xl,
    maxHeight: '80%',
    ...SHADOWS.large,
  },
  dragHandle: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  dragBar: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  title: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textPrimary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: SPACING.lg,
  },
  inputContainer: {
    marginBottom: SPACING.xl,
  },
  label: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  shareContainer: {
    marginBottom: SPACING.xl,
  },
  shareOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  shareIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  shareInfo: {
    flex: 1,
  },
  shareTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  shareDescription: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  createButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  createButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  createButtonText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.card,
  },
  createButtonTextDisabled: {
    color: COLORS.textSecondary,
  },
});