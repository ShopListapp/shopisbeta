import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, TrendingUp, TrendingDown, ArrowRight, DollarSign, ChartPie as PieChart, Target, CreditCard } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS, LAYOUT } from '@/constants/theme';
import ScreenLayout from '@/components/layouts/ScreenLayout';
import BudgetSummaryCard from '@/components/budget/BudgetSummaryCard';
import SpendingCategoryCard from '@/components/budget/SpendingCategoryCard';
import { mockCategories, mockRecentTransactions } from '@/data/mockData';

export default function BudgetScreen() {
  const totalBudget = 500;
  const spent = 320;
  const remaining = 180;
  const lastMonthSpent = 280;
  const spendingTrend = spent - lastMonthSpent;
  const isSpendingUp = spendingTrend > 0;

  const weeklySpending = [
    { week: 'Sem 1', amount: 75 },
    { week: 'Sem 2', amount: 85 },
    { week: 'Sem 3', amount: 90 },
    { week: 'Sem 4', amount: 70 },
  ];

  const savingsGoal = 150;
  const currentSavings = 95;
  const savingsProgress = (currentSavings / savingsGoal) * 100;

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleSection}>
              <Text style={styles.greeting}>Vos dépenses</Text>
              <Text style={styles.title}>Aperçu Budget</Text>
            </View>
            <TouchableOpacity style={styles.calendarButton} activeOpacity={0.7}>
              <Calendar size={14} color={COLORS.primary} strokeWidth={2} />
              <Text style={styles.calendarText}>Juin 2025</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <BudgetSummaryCard 
          totalBudget={totalBudget}
          spent={spent}
          remaining={remaining}
        />
        
        <View style={styles.trendCard}>
          <View style={styles.trendHeader}>
            <View style={styles.trendIconContainer}>
              {isSpendingUp ? (
                <TrendingUp size={16} color={COLORS.error} strokeWidth={2} />
              ) : (
                <TrendingDown size={16} color={COLORS.success} strokeWidth={2} />
              )}
            </View>
            <View style={styles.trendInfo}>
              <Text style={styles.trendLabel}>vs mois dernier</Text>
              <Text style={[
                styles.trendValue, 
                { color: isSpendingUp ? COLORS.error : COLORS.success }
              ]}>
                {isSpendingUp ? '+' : ''}€{Math.abs(spendingTrend).toFixed(0)}
              </Text>
            </View>
            <View style={styles.trendAnalysis}>
              <Text style={styles.trendAnalysisText}>
                {isSpendingUp ? 'Dépenses en hausse' : 'Économies réalisées'}
              </Text>
              <Text style={styles.trendTip}>
                {isSpendingUp ? 'Surveillez vos achats impulsifs' : 'Continuez sur cette lancée!'}
              </Text>
            </View>
          </View>
        </View>

        {/* Objectif d'épargne */}
        <View style={styles.savingsCard}>
          <View style={styles.savingsHeader}>
            <View style={styles.savingsIconContainer}>
              <Target size={16} color={COLORS.success} strokeWidth={2} />
            </View>
            <View style={styles.savingsInfo}>
              <Text style={styles.savingsTitle}>Objectif d'Épargne</Text>
              <Text style={styles.savingsAmount}>€{currentSavings} / €{savingsGoal}</Text>
            </View>
            <Text style={styles.savingsPercentage}>{Math.round(savingsProgress)}%</Text>
          </View>
          <View style={styles.savingsProgressBar}>
            <View 
              style={[
                styles.savingsProgressFill, 
                { width: `${savingsProgress}%` }
              ]} 
            />
          </View>
          <Text style={styles.savingsRemaining}>
            Plus que €{(savingsGoal - currentSavings).toFixed(0)} pour atteindre votre objectif
          </Text>
        </View>

        {/* Dépenses hebdomadaires */}
        <View style={styles.weeklyCard}>
          <Text style={styles.weeklyTitle}>Dépenses Hebdomadaires</Text>
          <View style={styles.weeklyChart}>
            {weeklySpending.map((week, index) => (
              <View key={index} style={styles.weeklyBar}>
                <View style={styles.weeklyBarContainer}>
                  <View 
                    style={[
                      styles.weeklyBarFill, 
                      { height: `${(week.amount / 100) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.weeklyAmount}>€{week.amount}</Text>
                <Text style={styles.weeklyLabel}>{week.week}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dépenses par Catégorie</Text>
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
        </View>
        
        <View style={styles.section}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>Transactions Récentes</Text>
            <TouchableOpacity style={styles.viewAllButton} activeOpacity={0.7}>
              <Text style={styles.viewAllText}>Voir Tout</Text>
              <ArrowRight size={14} color={COLORS.primary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.transactionsList}>
            {mockRecentTransactions.slice(0, 5).map((item) => (
              <TouchableOpacity key={item.id} style={styles.transactionItem} activeOpacity={0.7}>
                <View style={styles.transactionIconContainer}>
                  <CreditCard size={16} color={COLORS.card} strokeWidth={2} />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>{item.store}</Text>
                  <Text style={styles.transactionDate}>{item.date}</Text>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={styles.transactionAmount}>-€{item.amount.toFixed(2)}</Text>
                  <Text style={styles.transactionCategory}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Conseils d'économie */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Conseils d'Économie</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Planifiez vos repas pour éviter le gaspillage</Text>
            <Text style={styles.tipItem}>• Comparez les prix entre magasins</Text>
            <Text style={styles.tipItem}>• Profitez des promotions saisonnières</Text>
            <Text style={styles.tipItem}>• Utilisez des listes de courses pour éviter les achats impulsifs</Text>
          </View>
        </View>
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 60,
  },
  titleSection: {
    flex: 1,
    marginRight: SPACING.md,
  },
  greeting: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  title: {
    fontSize: FONT_SIZE.display,
    fontFamily: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primary,
    minWidth: 80,
    justifyContent: 'center',
    height: 36,
  },
  calendarText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    marginLeft: 4,
  },
  trendCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIconContainer: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  trendInfo: {
    marginRight: SPACING.md,
  },
  trendLabel: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  trendValue: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    marginTop: 2,
  },
  trendAnalysis: {
    flex: 1,
  },
  trendAnalysisText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
  },
  trendTip: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  savingsCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  savingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  savingsIconContainer: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  savingsInfo: {
    flex: 1,
  },
  savingsTitle: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  savingsAmount: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
  },
  savingsPercentage: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.success,
  },
  savingsProgressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    marginBottom: SPACING.xs,
    overflow: 'hidden',
  },
  savingsProgressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: BORDER_RADIUS.full,
  },
  savingsRemaining: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  weeklyCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  weeklyTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  weeklyChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
  },
  weeklyBar: {
    alignItems: 'center',
    flex: 1,
  },
  weeklyBarContainer: {
    width: 24,
    height: 80,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'flex-end',
    marginBottom: SPACING.xs,
  },
  weeklyBarFill: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    width: '100%',
  },
  weeklyAmount: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  weeklyLabel: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontFamily: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  categoriesContainer: {
    paddingHorizontal: SPACING.lg,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  viewAllText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    marginRight: SPACING.xs,
  },
  transactionsList: {
    paddingHorizontal: SPACING.lg,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
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
    marginBottom: 2,
  },
  transactionDate: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  transactionCategory: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  tipsCard: {
    backgroundColor: COLORS.primaryLight,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  tipsTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  tipsList: {
    gap: SPACING.xs,
  },
  tipItem: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: LAYOUT.tabBarHeight + SPACING.lg,
  },
});