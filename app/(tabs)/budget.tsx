import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BarChart2, Calendar, DollarSign, ArrowRight } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS } from '@/constants/theme';
import ScreenLayout from '@/components/layouts/ScreenLayout';
import BudgetSummaryCard from '@/components/budget/BudgetSummaryCard';
import SpendingCategoryCard from '@/components/budget/SpendingCategoryCard';
import { mockCategories, mockRecentTransactions } from '@/data/mockData';

export default function BudgetScreen() {
  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Text style={styles.title}>Budget</Text>
        <TouchableOpacity style={styles.calendarButton}>
          <Calendar size={18} color={COLORS.textPrimary} />
          <Text style={styles.calendarText}>June 2025</Text>
        </TouchableOpacity>
      </View>
      
      <BudgetSummaryCard 
        totalBudget={500}
        spent={320}
        remaining={180}
      />
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Spending by Category</Text>
      </View>
      
      <FlatList
        data={mockCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SpendingCategoryCard
            category={item.name}
            spent={item.spent}
            budget={item.budget}
            icon={item.icon}
            color={item.color}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />
      
      <View style={styles.transactionsHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <ArrowRight size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={mockRecentTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={styles.transactionIconContainer}>
              <DollarSign size={18} color={COLORS.background} />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>{item.store}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
            <Text style={styles.transactionAmount}>-${item.amount.toFixed(2)}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.transactionsContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recent transactions</Text>
          </View>
        }
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZE.xxxl,
    fontFamily: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
  },
  calendarText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
  sectionHeader: {
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontFamily: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
  },
  categoriesContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    marginRight: SPACING.xs,
  },
  transactionsContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
  },
  transactionDate: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  transactionAmount: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
});