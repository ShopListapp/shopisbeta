import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle2, Clock, Users } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

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
}

export default function GroceryListCard({ list }: GroceryListCardProps) {
  const completedItems = list.items.filter(item => item.checked).length;
  const totalItems = list.items.length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.title}>{list.name}</Text>
        {list.shared && (
          <View style={styles.sharedBadge}>
            <Users size={14} color={COLORS.primary} />
            <Text style={styles.sharedText}>Shared</Text>
          </View>
        )}
      </View>
      
      <View style={styles.itemsContainer}>
        {list.items.slice(0, 3).map(item => (
          <View key={item.id} style={styles.itemRow}>
            <CheckCircle2 
              size={16} 
              color={item.checked ? COLORS.accent : COLORS.textSecondary} 
              fill={item.checked ? COLORS.accent : 'transparent'}
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
      </View>
      
      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {completedItems}/{totalItems} items
          </Text>
        </View>
        
        <View style={styles.dateContainer}>
          <Clock size={14} color={COLORS.textSecondary} />
          <Text style={styles.dateText}>{list.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  title: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
  },
  sharedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingVertical: SPACING.xs / 2,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  sharedText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    marginLeft: 4,
  },
  itemsContainer: {
    marginBottom: SPACING.md,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  itemText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
    flex: 1,
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  moreItems: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    marginRight: SPACING.md,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.full,
  },
  progressText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
});