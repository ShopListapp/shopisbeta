import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { CircleCheck as CheckCircle2, Clock, Users, ChevronRight, MoveHorizontal as MoreHorizontal, Share, Trash2, CreditCard as Edit3, ShoppingCart } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS } from '@/constants/theme';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface ListItemType {
  id: string;
  name: string;
  checked: boolean;
}

interface GroceryListType {
  id: string;
  name: string;
  items: ListItemType[];
  shared: boolean;
  date: string;
}

interface GroceryListCardProps {
  list: GroceryListType;
  onDelete?: (listId: string) => void;
}

export default function GroceryListCard({ list, onDelete }: GroceryListCardProps) {
  const router = useRouter();
  const [showActions, setShowActions] = useState(false);
  const completedItems = list.items.filter(item => item.checked).length;
  const totalItems = list.items.length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  const isCompleted = completedItems === totalItems && totalItems > 0;

  const handleShare = () => {
    setShowActions(false);
    Alert.alert(
      'Share List',
      `Share "${list.name}" with family members?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => console.log('Sharing list:', list.id) }
      ]
    );
  };

  const handleEdit = () => {
    setShowActions(false);
    router.push(`/(tabs)/list-detail?listId=${list.id}`);
  };

  const handleShoppingMode = () => {
    setShowActions(false);
    router.push(`/(tabs)/shopping-mode?listId=${list.id}`);
  };

  const handleDelete = () => {
    setShowActions(false);
    if (onDelete) {
      onDelete(list.id);
    }
  };

  const handleCardPress = () => {
    if (showActions) {
      setShowActions(false);
    } else {
      router.push(`/(tabs)/list-detail?listId=${list.id}`);
    }
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, isCompleted && styles.containerCompleted]} 
      activeOpacity={0.7}
      onPress={handleCardPress}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{list.name}</Text>
          <TouchableOpacity 
            style={[styles.moreButton, showActions && styles.moreButtonActive]} 
            activeOpacity={0.7}
            onPress={() => setShowActions(!showActions)}
          >
            <MoreHorizontal size={16} color={showActions ? COLORS.primary : COLORS.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.badges}>
          {list.shared && (
            <View style={styles.sharedBadge}>
              <Users size={12} color={COLORS.primary} strokeWidth={2} />
              <Text style={styles.sharedText}>Shared</Text>
            </View>
          )}
          {isCompleted && (
            <View style={styles.completedBadge}>
              <CheckCircle2 size={12} color={COLORS.success} strokeWidth={2} />
              <Text style={styles.completedText}>Complete</Text>
            </View>
          )}
        </View>

        {showActions && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShoppingMode}>
              <ShoppingCart size={14} color={COLORS.primary} strokeWidth={2} />
              <Text style={styles.actionText}>Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Share size={14} color={COLORS.primary} strokeWidth={2} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
              <Edit3 size={14} color={COLORS.warning} strokeWidth={2} />
              <Text style={[styles.actionText, { color: COLORS.warning }]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
              <Trash2 size={14} color={COLORS.error} strokeWidth={2} />
              <Text style={[styles.actionText, { color: COLORS.error }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={styles.itemsPreview}>
        {list.items.slice(0, 3).map((item, index) => (
          <View key={item.id} style={styles.itemRow}>
            <CheckCircle2 
              size={16} 
              color={item.checked ? COLORS.success : COLORS.border} 
              fill={item.checked ? COLORS.success : 'transparent'}
              strokeWidth={2}
            />
            <Text 
              style={[
                styles.itemText, 
                item.checked && styles.itemTextChecked
              ]}
              numberOfLines={1}
            >
              {item.name}
            </Text>
          </View>
        ))}
        
        {totalItems > 3 && (
          <Text style={styles.moreItems}>+{totalItems - 3} more items</Text>
        )}
        
        {totalItems === 0 && (
          <Text style={styles.emptyListText}>No items yet - tap to add items</Text>
        )}
      </View>
      
      <View style={styles.footer}>
        <View style={styles.progressSection}>
          {totalItems > 0 && (
            <>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${progress}%`,
                      backgroundColor: isCompleted ? COLORS.success : COLORS.primary
                    }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {completedItems}/{totalItems} completed
              </Text>
            </>
          )}
        </View>
        
        <View style={styles.metaInfo}>
          <View style={styles.dateContainer}>
            <Clock size={12} color={COLORS.textSecondary} strokeWidth={2} />
            <Text style={styles.dateText}>{list.date}</Text>
          </View>
          <ChevronRight size={16} color={COLORS.textTertiary} strokeWidth={2} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  containerCompleted: {
    backgroundColor: COLORS.accentLight,
    borderColor: COLORS.success,
  },
  header: {
    marginBottom: SPACING.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  title: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SPACING.sm,
  },
  moreButton: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonActive: {
    backgroundColor: COLORS.primaryLight,
  },
  badges: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  sharedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  sharedText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    marginLeft: 4,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accentLight,
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  completedText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.success,
    marginLeft: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xs,
    marginTop: SPACING.sm,
    gap: SPACING.xs,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.card,
    gap: 4,
  },
  actionText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
  },
  itemsPreview: {
    marginBottom: SPACING.lg,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    paddingVertical: 2,
  },
  itemText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
    flex: 1,
    lineHeight: 20,
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  moreItems: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    fontStyle: 'italic',
  },
  emptyListText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  progressSection: {
    flex: 1,
    marginRight: SPACING.md,
  },
  progressBar: {
    height: 6,
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
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
});