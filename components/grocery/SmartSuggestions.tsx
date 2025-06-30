import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Plus, TrendingUp, Clock, Lightbulb, X, Sparkles } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

interface Suggestion {
  id: string;
  item: string;
  reason: 'frequent' | 'seasonal' | 'recipe' | 'running_low' | 'trending';
  confidence: number;
  details: string;
  price?: number;
  discount?: number;
}

interface SmartSuggestionsProps {
  suggestions: Suggestion[];
  onAddItem: (item: string) => void;
  onDismiss: (suggestionId: string) => void;
}

const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    item: 'Lait Bio',
    reason: 'frequent',
    confidence: 95,
    details: 'Vous en achetez chaque semaine',
    price: 1.45,
  },
  {
    id: '2',
    item: 'Fraises',
    reason: 'seasonal',
    confidence: 80,
    details: 'De saison et en promotion',
    price: 3.20,
    discount: 20,
  },
  {
    id: '3',
    item: 'Pâtes Complètes',
    reason: 'recipe',
    confidence: 85,
    details: 'Pour votre recette sauvegardée',
    price: 2.10,
  },
  {
    id: '4',
    item: 'Papier Toilette',
    reason: 'running_low',
    confidence: 90,
    details: 'Basé sur votre historique',
    price: 8.50,
  },
  {
    id: '5',
    item: 'Avocat',
    reason: 'trending',
    confidence: 75,
    details: 'Populaire cette semaine',
    price: 1.80,
    discount: 15,
  },
];

export default function SmartSuggestions({ 
  suggestions = mockSuggestions, 
  onAddItem, 
  onDismiss 
}: SmartSuggestionsProps) {
  const getSuggestionIcon = (reason: string) => {
    switch (reason) {
      case 'frequent':
        return <TrendingUp size={14} color={COLORS.primary} strokeWidth={2} />;
      case 'seasonal':
        return <Clock size={14} color={COLORS.warning} strokeWidth={2} />;
      case 'recipe':
        return <Lightbulb size={14} color={COLORS.success} strokeWidth={2} />;
      case 'running_low':
        return <TrendingUp size={14} color={COLORS.error} strokeWidth={2} />;
      case 'trending':
        return <Sparkles size={14} color={COLORS.accent} strokeWidth={2} />;
      default:
        return <Lightbulb size={14} color={COLORS.textSecondary} strokeWidth={2} />;
    }
  };

  const getSuggestionColor = (reason: string) => {
    switch (reason) {
      case 'frequent': return COLORS.primary;
      case 'seasonal': return COLORS.warning;
      case 'recipe': return COLORS.success;
      case 'running_low': return COLORS.error;
      case 'trending': return COLORS.accent;
      default: return COLORS.textSecondary;
    }
  };

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case 'frequent': return 'Fréquent';
      case 'seasonal': return 'Saisonnier';
      case 'recipe': return 'Recette';
      case 'running_low': return 'Stock bas';
      case 'trending': return 'Tendance';
      default: return 'Suggestion';
    }
  };

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Sparkles size={18} color={COLORS.primary} strokeWidth={2} />
          <Text style={styles.title}>Suggestions Intelligentes</Text>
        </View>
        <Text style={styles.subtitle}>Basées sur vos habitudes d'achat</Text>
      </View>
      
      <FlatList
        data={suggestions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.suggestionCard}>
            <TouchableOpacity 
              style={styles.dismissButton}
              onPress={() => onDismiss(item.id)}
              activeOpacity={0.7}
            >
              <X size={12} color={COLORS.textTertiary} strokeWidth={2} />
            </TouchableOpacity>

            <View style={styles.suggestionHeader}>
              <View style={[styles.suggestionIcon, { backgroundColor: getSuggestionColor(item.reason) + '20' }]}>
                {getSuggestionIcon(item.reason)}
              </View>
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceText}>{item.confidence}%</Text>
                <Text style={styles.reasonLabel}>{getReasonLabel(item.reason)}</Text>
              </View>
            </View>
            
            <Text style={styles.itemName}>{item.item}</Text>
            <Text style={styles.suggestionDetails}>{item.details}</Text>
            
            {item.price && (
              <View style={styles.priceContainer}>
                {item.discount ? (
                  <View style={styles.discountPrice}>
                    <Text style={styles.originalPrice}>€{item.price.toFixed(2)}</Text>
                    <Text style={styles.discountedPrice}>
                      €{(item.price * (1 - item.discount / 100)).toFixed(2)}
                    </Text>
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>-{item.discount}%</Text>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.price}>€{item.price.toFixed(2)}</Text>
                )}
              </View>
            )}
            
            <View style={styles.suggestionActions}>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => onAddItem(item.item)}
                activeOpacity={0.7}
              >
                <Plus size={14} color={COLORS.card} strokeWidth={2} />
                <Text style={styles.addButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.suggestionsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  title: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  subtitle: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  suggestionsList: {
    paddingHorizontal: SPACING.lg,
  },
  suggestionCard: {
    width: 180,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
    position: 'relative',
  },
  dismissButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 20,
    height: 20,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
    marginRight: SPACING.lg,
  },
  suggestionIcon: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confidenceContainer: {
    alignItems: 'flex-end',
  },
  confidenceText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
  },
  reasonLabel: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  itemName: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  suggestionDetails: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  priceContainer: {
    marginBottom: SPACING.sm,
  },
  price: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
  },
  discountPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  originalPrice: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.success,
  },
  discountBadge: {
    backgroundColor: COLORS.success + '20',
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  discountText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xs,
    color: COLORS.success,
  },
  suggestionActions: {
    marginTop: 'auto',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    gap: 4,
    ...SHADOWS.small,
  },
  addButtonText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.card,
  },
});