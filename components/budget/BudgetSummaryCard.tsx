import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

interface BudgetSummaryCardProps {
  totalBudget: number;
  spent: number;
  remaining: number;
}

export default function BudgetSummaryCard({ totalBudget, spent, remaining }: BudgetSummaryCardProps) {
  // Calculate the percentage of budget spent
  const spentPercentage = (spent / totalBudget) * 100;
  const formattedPercentage = spentPercentage.toFixed(0);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Monthly Budget</Text>
        <Text style={styles.budgetAmount}>${totalBudget.toFixed(2)}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[styles.progressFill, { width: `${spentPercentage}%` }]} 
          />
        </View>
        <Text style={styles.progressText}>
          {formattedPercentage}% spent
        </Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: COLORS.primary }]} />
          <Text style={styles.statLabel}>Spent</Text>
          <Text style={styles.statValue}>${spent.toFixed(2)}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: COLORS.accent }]} />
          <Text style={styles.statLabel}>Remaining</Text>
          <Text style={styles.statValue}>${remaining.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
    ...SHADOWS.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
  },
  budgetAmount: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textPrimary,
  },
  progressContainer: {
    marginBottom: SPACING.md,
  },
  progressBar: {
    height: 12,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    marginBottom: SPACING.xs,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
  },
  progressText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: 'right',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDot: {
    width: 10,
    height: 10,
    borderRadius: BORDER_RADIUS.full,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs / 2,
  },
  statValue: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: COLORS.border,
  },
});