import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { ArrowLeft, Plus, Check, X, CreditCard as Edit3, Trash2, Share, Users } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS, LAYOUT } from '@/constants/theme';
import ScreenLayout from '@/components/layouts/ScreenLayout';
import SmartSuggestions from '@/components/grocery/SmartSuggestions';
import QuickActions from '@/components/grocery/QuickActions';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface ListItem {
  id: string;
  name: string;
  checked: boolean;
  category?: string;
}

interface GroceryList {
  id: string;
  name: string;
  items: ListItem[];
  shared: boolean;
  date: string;
}

export default function ListDetailScreen() {
  const router = useRouter();
  const { listId } = useLocalSearchParams();
  
  const [list, setList] = useState<GroceryList | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  useEffect(() => {
    // In a real app, fetch the list by ID
    const mockList: GroceryList = {
      id: listId as string,
      name: 'Weekly Groceries',
      shared: true,
      date: 'Jun 15, 2025',
      items: [
        { id: '1', name: 'Milk', checked: true },
        { id: '2', name: 'Eggs', checked: true },
        { id: '3', name: 'Bread', checked: false },
        { id: '4', name: 'Butter', checked: false },
        { id: '5', name: 'Cheese', checked: false },
      ]
    };
    setList(mockList);
  }, [listId]);

  const addItem = (itemName?: string) => {
    const name = itemName || newItemName.trim();
    if (name && list) {
      const newItem: ListItem = {
        id: Date.now().toString(),
        name,
        checked: false,
      };
      setList({
        ...list,
        items: [...list.items, newItem]
      });
      setNewItemName('');
    }
  };

  const toggleItem = (itemId: string) => {
    if (!list) return;
    setList({
      ...list,
      items: list.items.map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    });
  };

  const deleteItem = (itemId: string) => {
    if (!list) return;
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setList({
              ...list,
              items: list.items.filter(item => item.id !== itemId)
            });
          }
        }
      ]
    );
  };

  const startEditing = (item: ListItem) => {
    setEditingItem(item.id);
    setEditingName(item.name);
  };

  const saveEdit = () => {
    if (!list || !editingItem) return;
    setList({
      ...list,
      items: list.items.map(item =>
        item.id === editingItem ? { ...item, name: editingName.trim() } : item
      )
    });
    setEditingItem(null);
    setEditingName('');
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditingName('');
  };

  const shareList = () => {
    Alert.alert(
      'Share List',
      `Share "${list?.name}" with family members?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => console.log('Sharing list') }
      ]
    );
  };

  const dismissSuggestion = (suggestionId: string) => {
    console.log('Dismissing suggestion:', suggestionId);
  };

  if (!list) {
    return (
      <ScreenLayout>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ScreenLayout>
    );
  }

  const completedItems = list.items.filter(item => item.checked);
  const pendingItems = list.items.filter(item => !item.checked);
  const progress = list.items.length > 0 ? (completedItems.length / list.items.length) * 100 : 0;

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
        
        <View style={styles.headerInfo}>
          <Text style={styles.listName} numberOfLines={1}>{list.name}</Text>
          <View style={styles.headerMeta}>
            {list.shared && (
              <View style={styles.sharedBadge}>
                <Users size={12} color={COLORS.primary} strokeWidth={2} />
                <Text style={styles.sharedText}>Shared</Text>
              </View>
            )}
            <Text style={styles.itemCount}>
              {completedItems.length}/{list.items.length} completed
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.shareButton} 
          onPress={shareList}
          activeOpacity={0.7}
        >
          <Share size={18} color={COLORS.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {list.items.length > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${progress}%`,
                    backgroundColor: progress === 100 ? COLORS.success : COLORS.primary
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(progress)}% complete
            </Text>
          </View>
        )}

        <View style={styles.addItemContainer}>
          <TextInput
            style={styles.addItemInput}
            placeholder="Add new item..."
            placeholderTextColor={COLORS.textSecondary}
            value={newItemName}
            onChangeText={setNewItemName}
            onSubmitEditing={() => addItem()}
            returnKeyType="done"
          />
          <TouchableOpacity 
            style={[
              styles.addButton,
              !newItemName.trim() && styles.addButtonDisabled
            ]} 
            onPress={() => addItem()}
            activeOpacity={0.8}
            disabled={!newItemName.trim()}
          >
            <Plus size={20} color={COLORS.card} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <SmartSuggestions 
          suggestions={[]}
          onAddItem={addItem}
          onDismiss={dismissSuggestion}
        />

        <QuickActions listId={list.id} onShare={shareList} />

        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Items ({list.items.length})</Text>
          
          {list.items.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items in this list yet</Text>
              <Text style={styles.emptySubText}>Add your first item above to get started</Text>
            </View>
          ) : (
            <View style={styles.itemsList}>
              {[...pendingItems, ...completedItems].map((item) => (
                <View key={item.id} style={[styles.itemContainer, item.checked && styles.itemContainerChecked]}>
                  <TouchableOpacity 
                    style={styles.checkButton}
                    onPress={() => toggleItem(item.id)}
                    activeOpacity={0.7}
                  >
                    <Check 
                      size={16} 
                      color={item.checked ? COLORS.success : 'transparent'} 
                      strokeWidth={2}
                    />
                  </TouchableOpacity>

                  {editingItem === item.id ? (
                    <View style={styles.editContainer}>
                      <TextInput
                        style={styles.editInput}
                        value={editingName}
                        onChangeText={setEditingName}
                        onSubmitEditing={saveEdit}
                        autoFocus
                        returnKeyType="done"
                      />
                      <TouchableOpacity style={styles.editAction} onPress={saveEdit}>
                        <Check size={16} color={COLORS.success} strokeWidth={2} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.editAction} onPress={cancelEdit}>
                        <X size={16} color={COLORS.error} strokeWidth={2} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <>
                      <Text 
                        style={[
                          styles.itemText,
                          item.checked && styles.itemTextChecked
                        ]}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                      
                      <View style={styles.itemActions}>
                        <TouchableOpacity 
                          style={styles.actionButton}
                          onPress={() => startEditing(item)}
                          activeOpacity={0.7}
                        >
                          <Edit3 size={14} color={COLORS.textSecondary} strokeWidth={2} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.actionButton}
                          onPress={() => deleteItem(item.id)}
                          activeOpacity={0.7}
                        >
                          <Trash2 size={14} color={COLORS.error} strokeWidth={2} />
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

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
  headerInfo: {
    flex: 1,
  },
  listName: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  headerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  sharedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 2,
    paddingHorizontal: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  sharedText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    marginLeft: 4,
  },
  itemCount: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    marginBottom: SPACING.xs,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
  },
  progressText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  addItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.sm,
  },
  addItemInput: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  addButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  itemsSection: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  sectionTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  itemsList: {
    gap: SPACING.sm,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  itemContainerChecked: {
    backgroundColor: COLORS.surface,
    opacity: 0.7,
  },
  checkButton: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
    backgroundColor: COLORS.card,
  },
  itemText: {
    flex: 1,
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  itemActions: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  editInput: {
    flex: 1,
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editAction: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
  },
  emptyText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptySubText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: LAYOUT.tabBarHeight + SPACING.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textSecondary,
  },
});