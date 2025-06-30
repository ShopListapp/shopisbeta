import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, Target } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

interface BudgetSummaryCardProps {
  totalBudget: number;
  spent: number;
  remaining: number;
}

export default function BudgetSummaryCard({ totalBudget, spent, remaining }: BudgetSummaryCardProps) {
  const spentPercentage = (spent / totalBudget) * 100;
  const formattedPercentage = spentPercentage.toFixed(0);
  const isOverBudget = spent > totalBudget;
  
  return (
    <View style={[styles.container, isOverBudget && styles.containerOverBudget]}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <View style={styles.iconContainer}>
            <Target size={18} color={COLORS.primary} strokeWidth={2} />
          </View>
          <View>
            <Text style={styles.title}>Monthly Budget</Text>
            <Text style={styles.budgetAmount}>${totalBudget.toFixed(0)}</Text>
          </View>
        </View>
        
        <View style={styles.percentageContainer}>
          <Text style={[
            styles.percentageText,
            { color: isOverBudget ? COLORS.error : COLORS.primary }
          ]}>
            {formattedPercentage}%
          </Text>
          <Text style={styles.percentageLabel}>spent</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${Math.min(spentPercentage, 100)}%`,
                backgroundColor: isOverBudget ? COLORS.error : COLORS.primary
              }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: COLORS.primary }]} />
          <Text style={styles.statLabel}>Spent</Text>
          <Text style={[styles.statValue, isOverBudget && { color: COLORS.error }]}>
            ${spent.toFixed(0)}
          </Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: COLORS.success }]} />
          <Text style={styles.statLabel}>Remaining</Text>
          <Text style={[
            styles.statValue,
            { color: remaining < 0 ? COLORS.error : COLORS.success }
          ]}>
            ${Math.abs(remaining).toFixed(0)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.medium,
  },
  containerOverBudget: {
    backgroundColor: '#FEF2F2',
    borderColor: COLORS.error,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  title: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  budgetAmount: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xxl,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  percentageContainer: {
    alignItems: 'flex-end',
  },
  percentageText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    letterSpacing: -0.5,
  },
  percentageLabel: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  progressContainer: {
    marginBottom: SPACING.lg,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
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
    width: 8,
    height: 8,
    borderRadius: BORDER_RADIUS.full,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
});