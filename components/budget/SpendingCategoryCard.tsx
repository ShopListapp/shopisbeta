import { View, Text, StyleSheet } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

interface SpendingCategoryCardProps {
  category: string;
  spent: number;
  budget: number;
  icon?: React.ReactNode;
  color?: string;
}

export default function SpendingCategoryCard({ 
  category, 
  spent, 
  budget,
  icon,
  color = COLORS.primary
}: SpendingCategoryCardProps) {
  // Calculate percentage spent
  const percentage = (spent / budget) * 100;
  const formattedPercentage = percentage.toFixed(0);
  
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        {icon || <ShoppingCart size={20} color="#FFFFFF" />}
      </View>
      
      <Text style={styles.category}>{category}</Text>
      
      <View style={styles.amountContainer}>
        <Text style={styles.spentAmount}>${spent.toFixed(0)}</Text>
        <Text style={styles.budgetAmount}>/${budget.toFixed(0)}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${Math.min(percentage, 100)}%`, backgroundColor: color }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{formattedPercentage}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginRight: SPACING.md,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  category: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SPACING.sm,
  },
  spentAmount: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
  },
  budgetAmount: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    marginRight: SPACING.xs,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
  },
  progressText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
});