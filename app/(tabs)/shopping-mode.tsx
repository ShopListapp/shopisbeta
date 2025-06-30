import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image, ScrollView, Dimensions } from 'react-native';
import { ArrowLeft, Check, X, MapPin, Clock, ShoppingCart, Navigation, Star, Zap, Timer, Target, Plus, Minus } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS, LAYOUT } from '@/constants/theme';
import ScreenLayout from '@/components/layouts/ScreenLayout';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
  category: string;
  aisle?: string;
  priority?: 'high' | 'medium' | 'low';
  estimatedPrice?: number;
  quantity?: number;
}

interface Store {
  id: string;
  name: string;
  distance: string;
  estimatedTime: string;
  logo?: string;
  rating: number;
  priceLevel: 'low' | 'medium' | 'high';
  features: string[];
  savings?: number;
}

const mockStores: Store[] = [
  { 
    id: '1', 
    name: 'Lidl', 
    distance: '0.8 km', 
    estimatedTime: '15 min',
    rating: 4.2,
    priceLevel: 'low',
    features: ['Meilleurs Prix', 'Produits Frais', 'Caisse Rapide'],
    savings: 15,
    logo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  { 
    id: '2', 
    name: 'Carrefour', 
    distance: '1.2 km', 
    estimatedTime: '20 min',
    rating: 4.5,
    priceLevel: 'medium',
    features: ['Large Sélection', 'Bio', 'Parking Gratuit'],
    savings: 8,
    logo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  { 
    id: '3', 
    name: 'Auchan', 
    distance: '1.5 km', 
    estimatedTime: '25 min',
    rating: 4.0,
    priceLevel: 'medium',
    features: ['Grand Magasin', 'Vrac', 'Électronique'],
    savings: 12,
    logo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  { 
    id: '4', 
    name: 'Monoprix', 
    distance: '2.1 km', 
    estimatedTime: '30 min',
    rating: 4.3,
    priceLevel: 'high',
    features: ['Qualité Premium', 'Centre Ville', 'Mode & Alimentaire'],
    savings: 5,
    logo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
];

const aisleMap: { [key: string]: string } = {
  'Produits Laitiers': 'Rayon 1',
  'Fruits & Légumes': 'Rayon 2',
  'Boulangerie': 'Rayon 3',
  'Viande & Poisson': 'Rayon 4',
  'Épicerie': 'Rayon 5',
  'Surgelés': 'Rayon 6',
  'Boissons': 'Rayon 7',
  'Hygiène': 'Rayon 8',
};

export default function ShoppingModeScreen() {
  const router = useRouter();
  const { listId } = useLocalSearchParams();
  
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: '1', name: 'Lait', checked: false, category: 'Produits Laitiers', aisle: 'Rayon 1', priority: 'high', estimatedPrice: 1.20, quantity: 2 },
    { id: '2', name: 'Bananes', checked: false, category: 'Fruits & Légumes', aisle: 'Rayon 2', priority: 'medium', estimatedPrice: 2.50, quantity: 1 },
    { id: '3', name: 'Pain de mie', checked: false, category: 'Boulangerie', aisle: 'Rayon 3', priority: 'high', estimatedPrice: 1.80, quantity: 1 },
    { id: '4', name: 'Blanc de poulet', checked: false, category: 'Viande & Poisson', aisle: 'Rayon 4', priority: 'medium', estimatedPrice: 6.90, quantity: 1 },
    { id: '5', name: 'Riz basmati', checked: false, category: 'Épicerie', aisle: 'Rayon 5', priority: 'low', estimatedPrice: 3.20, quantity: 1 },
    { id: '6', name: 'Glace vanille', checked: false, category: 'Surgelés', aisle: 'Rayon 6', priority: 'low', estimatedPrice: 4.50, quantity: 1 },
    { id: '7', name: 'Eau minérale', checked: false, category: 'Boissons', aisle: 'Rayon 7', priority: 'medium', estimatedPrice: 2.80, quantity: 2 },
    { id: '8', name: 'Dentifrice', checked: false, category: 'Hygiène', aisle: 'Rayon 8', priority: 'low', estimatedPrice: 3.50, quantity: 1 },
  ]);
  
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [actualTotal, setActualTotal] = useState(0);

  useEffect(() => {
    if (isActive && !startTime) {
      setStartTime(new Date());
    }
  }, [isActive]);

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + ((item.estimatedPrice || 0) * (item.quantity || 1)), 0);
    setEstimatedTotal(total);
    
    const checkedTotal = items
      .filter(item => item.checked)
      .reduce((sum, item) => sum + ((item.estimatedPrice || 0) * (item.quantity || 1)), 0);
    setActualTotal(checkedTotal);
  }, [items]);

  const toggleItem = (itemId: string) => {
    setItems(items.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    ));
  };

  const updateQuantity = (itemId: string, change: number) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, (item.quantity || 1) + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const startShopping = (store: Store) => {
    setSelectedStore(store);
    setIsActive(true);
    Alert.alert(
      'Shopping Commencé! 🛒',
      `Navigation vers ${store.name} activée.\n\nTotal estimé: €${estimatedTotal.toFixed(2)}\nÉconomies prévues: ${store.savings}%\nItinéraire optimal calculé!\n\nBon shopping!`,
      [{ text: 'C\'est parti!' }]
    );
  };

  const finishShopping = () => {
    const completedItems = items.filter(item => item.checked).length;
    const totalItems = items.length;
    const savedMoney = actualTotal * ((selectedStore?.savings || 0) / 100);
    
    Alert.alert(
      'Shopping Terminé! 🎉',
      `Excellent travail! Voici votre résumé:\n\n✅ ${completedItems}/${totalItems} articles collectés\n💰 Total dépensé: €${actualTotal.toFixed(2)}\n🎯 Économies réalisées: €${savedMoney.toFixed(2)}\n⏱️ Temps: ${getElapsedTime()}\n\nVoulez-vous sauvegarder cette session?`,
      [
        { text: 'Continuer', style: 'cancel' },
        { 
          text: 'Terminer & Sauvegarder', 
          onPress: () => {
            setIsActive(false);
            router.back();
          }
        }
      ]
    );
  };

  const getElapsedTime = () => {
    if (!startTime) return '0:00';
    const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return COLORS.error;
      case 'medium': return COLORS.warning;
      case 'low': return COLORS.success;
      default: return COLORS.textSecondary;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Zap size={12} color={COLORS.error} strokeWidth={2} />;
      case 'medium': return <Timer size={12} color={COLORS.warning} strokeWidth={2} />;
      case 'low': return <Target size={12} color={COLORS.success} strokeWidth={2} />;
      default: return null;
    }
  };

  const completedItems = items.filter(item => item.checked).length;
  const totalItems = items.length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  const groupedItems = items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as { [key: string]: ShoppingItem[] });

  const sortedCategories = Object.entries(groupedItems).sort(([, itemsA], [, itemsB]) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const maxPriorityA = Math.max(...itemsA.map(item => priorityOrder[item.priority || 'low']));
    const maxPriorityB = Math.max(...itemsB.map(item => priorityOrder[item.priority || 'low']));
    return maxPriorityB - maxPriorityA;
  });

  if (!isActive) {
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
          <Text style={styles.title}>Shopping Intelligent</Text>
        </View>

        <ScrollView 
          style={styles.setupContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.setupContent}
        >
          <View style={styles.setupHeader}>
            <View style={styles.heroIcon}>
              <ShoppingCart size={48} color={COLORS.primary} strokeWidth={1.5} />
            </View>
            <Text style={styles.setupTitle}>Prêt pour un Shopping Malin?</Text>
            <Text style={styles.setupSubtitle}>
              Itinéraires optimisés par IA, prix en temps réel et recommandations intelligentes
            </Text>
          </View>

          <View style={styles.itemsPreview}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewTitle}>Aperçu de votre Liste</Text>
              <View style={styles.estimatedTotal}>
                <Text style={styles.totalLabel}>Total Estimé</Text>
                <Text style={styles.totalAmount}>€{estimatedTotal.toFixed(2)}</Text>
              </View>
            </View>
            
            <View style={styles.previewStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalItems}</Text>
                <Text style={styles.statLabel}>Articles</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{Object.keys(groupedItems).length}</Text>
                <Text style={styles.statLabel}>Rayons</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{items.filter(i => i.priority === 'high').length}</Text>
                <Text style={styles.statLabel}>Priorité</Text>
              </View>
            </View>
            
            <View style={styles.previewItems}>
              {items.slice(0, 4).map((item, index) => (
                <View key={item.id} style={styles.previewItem}>
                  <View style={styles.previewItemLeft}>
                    {getPriorityIcon(item.priority || 'low')}
                    <Text style={styles.previewItemName}>{item.name}</Text>
                    <Text style={styles.previewItemQuantity}>x{item.quantity}</Text>
                  </View>
                  <Text style={styles.previewItemPrice}>€{((item.estimatedPrice || 0) * (item.quantity || 1)).toFixed(2)}</Text>
                </View>
              ))}
              {totalItems > 4 && (
                <Text style={styles.previewMore}>+{totalItems - 4} autres articles</Text>
              )}
            </View>
          </View>

          <View style={styles.storesSection}>
            <Text style={styles.storesTitle}>Choisissez Votre Magasin</Text>
            <Text style={styles.storesSubtitle}>Optimisé pour votre liste de courses</Text>
            
            {mockStores.map((store) => (
              <TouchableOpacity
                key={store.id}
                style={styles.storeCard}
                onPress={() => startShopping(store)}
                activeOpacity={0.7}
              >
                <View style={styles.storeLogoContainer}>
                  <Image source={{ uri: store.logo }} style={styles.storeLogo} />
                </View>
                
                <View style={styles.storeInfo}>
                  <View style={styles.storeHeader}>
                    <Text style={styles.storeName}>{store.name}</Text>
                    <View style={styles.storeRating}>
                      <Star size={12} color={COLORS.warning} fill={COLORS.warning} strokeWidth={0} />
                      <Text style={styles.ratingText}>{store.rating}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.storeDetails}>
                    <View style={styles.storeDetail}>
                      <MapPin size={12} color={COLORS.textSecondary} strokeWidth={2} />
                      <Text style={styles.storeDetailText}>{store.distance}</Text>
                    </View>
                    <View style={styles.storeDetail}>
                      <Clock size={12} color={COLORS.textSecondary} strokeWidth={2} />
                      <Text style={styles.storeDetailText}>{store.estimatedTime}</Text>
                    </View>
                    <View style={[styles.priceLevel, { backgroundColor: store.priceLevel === 'low' ? COLORS.success + '20' : store.priceLevel === 'medium' ? COLORS.warning + '20' : COLORS.error + '20' }]}>
                      <Text style={[styles.priceLevelText, { color: store.priceLevel === 'low' ? COLORS.success : store.priceLevel === 'medium' ? COLORS.warning : COLORS.error }]}>
                        {store.priceLevel === 'low' ? '€' : store.priceLevel === 'medium' ? '€€' : '€€€'}
                      </Text>
                    </View>
                    {store.savings && (
                      <View style={styles.savingsBadge}>
                        <Text style={styles.savingsText}>-{store.savings}%</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.storeFeatures}>
                    {store.features.slice(0, 2).map((feature, index) => (
                      <View key={index} style={styles.featureTag}>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <Navigation size={16} color={COLORS.primary} strokeWidth={2} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <View style={styles.activeHeader}>
        <View style={styles.activeHeaderTop}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setIsActive(false)}
            activeOpacity={0.7}
          >
            <X size={20} color={COLORS.card} strokeWidth={2} />
          </TouchableOpacity>
          
          <View style={styles.activeHeaderInfo}>
            <Text style={styles.activeStoreName}>{selectedStore?.name}</Text>
            <Text style={styles.activeStoreDetails}>
              {selectedStore?.distance} • {getElapsedTime()} • €{actualTotal.toFixed(2)}/€{estimatedTotal.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.finishButton}
            onPress={finishShopping}
            activeOpacity={0.7}
          >
            <Check size={20} color={COLORS.success} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${progress}%`,
                  backgroundColor: progress === 100 ? COLORS.success : COLORS.card
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {completedItems}/{totalItems} articles • {Math.round(progress)}% terminé
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {sortedCategories.map(([category, categoryItems]) => (
          <View key={category} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryTitleContainer}>
                <Text style={styles.categoryTitle}>{category}</Text>
                <Text style={styles.categoryCount}>
                  {categoryItems.filter(item => item.checked).length}/{categoryItems.length}
                </Text>
              </View>
              <Text style={styles.categoryAisle}>{aisleMap[category]}</Text>
            </View>
            
            {categoryItems
              .sort((a, b) => {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return (priorityOrder[b.priority || 'low'] - priorityOrder[a.priority || 'low']);
              })
              .map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.shoppingItem, item.checked && styles.shoppingItemChecked]}
                onPress={() => toggleItem(item.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
                  {item.checked && (
                    <Check size={16} color={COLORS.card} strokeWidth={2} />
                  )}
                </View>
                
                <View style={styles.itemContent}>
                  <View style={styles.itemHeader}>
                    <Text style={[
                      styles.itemName,
                      item.checked && styles.itemNameChecked
                    ]}>
                      {item.name}
                    </Text>
                    <View style={styles.itemMeta}>
                      {item.priority && (
                        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) + '20' }]}>
                          {getPriorityIcon(item.priority)}
                        </View>
                      )}
                      <Text style={styles.itemPrice}>€{((item.estimatedPrice || 0) * (item.quantity || 1)).toFixed(2)}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.itemFooter}>
                    <Text style={styles.itemAisle}>{item.aisle}</Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity === 1}
                      >
                        <Minus size={14} color={item.quantity === 1 ? COLORS.textTertiary : COLORS.textSecondary} strokeWidth={2} />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, 1)}
                      >
                        <Plus size={14} color={COLORS.textSecondary} strokeWidth={2} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        
        <View style={styles.shoppingSummary}>
          <Text style={styles.summaryTitle}>Résumé du Shopping</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Articles Collectés:</Text>
            <Text style={styles.summaryValue}>{completedItems}/{totalItems}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Actuel:</Text>
            <Text style={styles.summaryValue}>€{actualTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Estimé:</Text>
            <Text style={styles.summaryValue}>€{estimatedTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Temps Écoulé:</Text>
            <Text style={styles.summaryValue}>{getElapsedTime()}</Text>
          </View>
          {selectedStore?.savings && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Économies Prévues:</Text>
              <Text style={[styles.summaryValue, { color: COLORS.success }]}>
                €{(actualTotal * (selectedStore.savings / 100)).toFixed(2)}
              </Text>
            </View>
          )}
        </View>
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
  title: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textPrimary,
  },
  setupContainer: {
    flex: 1,
  },
  setupContent: {
    padding: SPACING.lg,
    paddingBottom: LAYOUT.tabBarHeight + SPACING.lg,
  },
  setupHeader: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.xxl,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  setupTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xxl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  setupSubtitle: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  itemsPreview: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  previewTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    flex: 1,
  },
  estimatedTotal: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  totalAmount: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.primary,
  },
  previewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  previewItems: {
    gap: SPACING.sm,
  },
  previewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  previewItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  previewItemName: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
    flex: 1,
  },
  previewItemQuantity: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  previewItemPrice: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  previewMore: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  storesSection: {
    flex: 1,
  },
  storesTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  storesSubtitle: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  storeLogoContainer: {
    marginRight: SPACING.md,
  },
  storeLogo: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.lg,
  },
  storeInfo: {
    flex: 1,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  storeName: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
  },
  storeRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  storeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.xs,
  },
  storeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storeDetailText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  priceLevel: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  priceLevelText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xs,
  },
  savingsBadge: {
    backgroundColor: COLORS.success + '20',
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  savingsText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xs,
    color: COLORS.success,
  },
  storeFeatures: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  featureTag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  featureText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
  },
  activeHeader: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  activeHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  activeHeaderInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  activeStoreName: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.card,
    marginBottom: 2,
  },
  activeStoreDetails: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  finishButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    marginTop: SPACING.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
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
    color: COLORS.card,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.lg,
    paddingBottom: LAYOUT.tabBarHeight + SPACING.lg,
  },
  categorySection: {
    marginBottom: SPACING.xl,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  categoryTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
  },
  categoryCount: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.md,
  },
  categoryAisle: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
  },
  shoppingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  shoppingItemChecked: {
    backgroundColor: COLORS.surface,
    opacity: 0.7,
  },
  checkbox: {
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
  checkboxChecked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  itemName: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    flex: 1,
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  priorityBadge: {
    width: 20,
    height: 20,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemPrice: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemAisle: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
    minWidth: 20,
    textAlign: 'center',
  },
  shoppingSummary: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  summaryTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
  },
});