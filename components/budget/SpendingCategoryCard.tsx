import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShoppingCart, Coffee, Chrome as Home, Heart } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

interface SpendingCategoryCardProps {
  category: string;
  spent: number;
  budget: number;
  icon?: React.ReactNode;
  color?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'groceries':
      return <ShoppingCart size={18} color="#FFFFFF" strokeWidth={2} />;
    case 'dining out':
      return <Coffee size={18} color="#FFFFFF" strokeWidth={2} />;
    case 'household':
      return <Home size={18} color="#FFFFFF" strokeWidth={2} />;
    case 'health':
      return <Heart size={18} color="#FFFFFF" strokeWidth={2} />;
    default:
      return <ShoppingCart size={18} color="#FFFFFF" strokeWidth={2} />;
  }
};

export default function SpendingCategoryCard({ 
  category, 
  spent, 
  budget,
  icon,
  color = COLORS.primary
}: SpendingCategoryCardProps) {
  const percentage = (spent / budget) * 100;
  const formattedPercentage = percentage.toFixed(0);
  const isOverBudget = spent > budget;
  
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        {icon || getCategoryIcon(category)}
      </View>
      
      <Text style={styles.category} numberOfLines={1}>{category}</Text>
      
      <View style={styles.amountContainer}>
        <Text style={[styles.spentAmount, isOverBudget && { color: COLORS.error }]}>
          ${spent.toFixed(0)}
        </Text>
        <Text style={styles.budgetAmount}>of ${budget.toFixed(0)}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${Math.min(percentage, 100)}%`, 
                backgroundColor: isOverBudget ? COLORS.error : color
              }
            ]} 
          />
        </View>
        <Text style={[
          styles.progressText,
          { color: isOverBudget ? COLORS.error : COLORS.textSecondary }
        ]}>
          {formattedPercentage}%
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  category: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  amountContainer: {
    marginBottom: SPACING.sm,
  },
  spentAmount: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  budgetAmount: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    marginRight: SPACING.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
  },
  progressText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xs,
    minWidth: 28,
    textAlign: 'right',
  },
});