import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import { ShoppingCart, Scan, Share, Navigation, Users, MapPin, Zap, Clock } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS } from '@/constants/theme';
import { useRouter } from 'expo-router';

interface QuickActionsProps {
  listId: string;
  onShare?: () => void;
}

export default function QuickActions({ listId, onShare }: QuickActionsProps) {
  const router = useRouter();

  const handleShareWithFamily = () => {
    Alert.alert(
      'Partager avec la Famille',
      'Choisissez comment partager cette liste avec votre famille:',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Envoyer le Lien', 
          onPress: () => {
            const shareUrl = `https://shopisbeta-bolt.netlify.app/list/${listId}`;
            if (Platform.OS === 'web') {
              navigator.clipboard?.writeText(shareUrl);
              Alert.alert('Lien Copié', 'Le lien de partage a été copié dans le presse-papiers!');
            } else {
              Alert.alert('Partager le Lien', `Partagez ce lien: ${shareUrl}`);
            }
          }
        },
        { 
          text: 'Inviter par Email', 
          onPress: () => {
            const subject = 'Rejoignez ma liste de courses';
            const body = `Salut! J'ai partagé ma liste de courses avec vous. Cliquez ici pour voir et collaborer: https://shopisbeta-bolt.netlify.app/list/${listId}`;
            const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            if (Platform.OS === 'web') {
              window.open(mailtoUrl);
            } else {
              Linking.openURL(mailtoUrl);
            }
          }
        }
      ]
    );
  };

  const handleFindStores = () => {
    Alert.alert(
      'Trouver des Magasins',
      'Magasins populaires près de vous:',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Lidl (0.8 km)', 
          onPress: () => {
            const storeAddress = 'Lidl, magasin le plus proche';
            const mapsUrl = Platform.select({
              ios: `maps://app?daddr=${encodeURIComponent(storeAddress)}`,
              android: `google.navigation:q=${encodeURIComponent(storeAddress)}`,
              web: `https://maps.google.com/maps?daddr=${encodeURIComponent(storeAddress)}`
            });
            
            if (Platform.OS === 'web') {
              window.open(mapsUrl, '_blank');
            } else {
              Linking.openURL(mapsUrl);
            }
          }
        },
        { 
          text: 'Carrefour (1.2 km)', 
          onPress: () => {
            const storeAddress = 'Carrefour, magasin le plus proche';
            const mapsUrl = Platform.select({
              ios: `maps://app?daddr=${encodeURIComponent(storeAddress)}`,
              android: `google.navigation:q=${encodeURIComponent(storeAddress)}`,
              web: `https://maps.google.com/maps?daddr=${encodeURIComponent(storeAddress)}`
            });
            
            if (Platform.OS === 'web') {
              window.open(mapsUrl, '_blank');
            } else {
              Linking.openURL(mapsUrl);
            }
          }
        }
      ]
    );
  };

  const handleOptimizeRoute = () => {
    Alert.alert(
      'Optimiser l\'Itinéraire',
      'Voulez-vous optimiser votre parcours en magasin?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Optimiser', 
          onPress: () => {
            Alert.alert(
              'Itinéraire Optimisé! 🎯',
              'Votre parcours a été optimisé:\n\n1. Fruits & Légumes (Rayon 2)\n2. Produits Laitiers (Rayon 1)\n3. Boulangerie (Rayon 3)\n4. Viande & Poisson (Rayon 4)\n5. Épicerie (Rayon 5)\n6. Surgelés (Rayon 6)\n7. Boissons (Rayon 7)\n8. Hygiène (Rayon 8)\n\nTemps estimé: 25 minutes',
              [{ text: 'Parfait!' }]
            );
          }
        }
      ]
    );
  };

  const handleQuickAdd = () => {
    Alert.alert(
      'Ajout Rapide',
      'Que voulez-vous ajouter rapidement?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Essentiels du Frigo', onPress: () => Alert.alert('Ajouté!', 'Lait, Œufs, Beurre ajoutés à votre liste') },
        { text: 'Fruits de Saison', onPress: () => Alert.alert('Ajouté!', 'Pommes, Bananes, Oranges ajoutés à votre liste') },
        { text: 'Produits d\'Hygiène', onPress: () => Alert.alert('Ajouté!', 'Dentifrice, Savon, Shampoing ajoutés à votre liste') },
      ]
    );
  };

  const actions = [
    {
      id: 'shopping-mode',
      title: 'Mode Shopping',
      subtitle: 'Optimisé magasin',
      icon: <ShoppingCart size={20} color={COLORS.primary} strokeWidth={2} />,
      color: COLORS.primary,
      onPress: () => router.push(`/(tabs)/shopping-mode?listId=${listId}`)
    },
    {
      id: 'scan',
      title: 'Scanner',
      subtitle: 'Ajouter par caméra',
      icon: <Scan size={20} color={COLORS.success} strokeWidth={2} />,
      color: COLORS.success,
      onPress: () => router.push('/(tabs)/scan')
    },
    {
      id: 'optimize-route',
      title: 'Optimiser',
      subtitle: 'Parcours intelligent',
      icon: <Zap size={20} color={COLORS.warning} strokeWidth={2} />,
      color: COLORS.warning,
      onPress: handleOptimizeRoute
    },
    {
      id: 'quick-add',
      title: 'Ajout Rapide',
      subtitle: 'Catégories prêtes',
      icon: <Clock size={20} color={COLORS.accent} strokeWidth={2} />,
      color: COLORS.accent,
      onPress: handleQuickAdd
    },
    {
      id: 'share-family',
      title: 'Partager',
      subtitle: 'Avec la famille',
      icon: <Users size={20} color={COLORS.error} strokeWidth={2} />,
      color: COLORS.error,
      onPress: handleShareWithFamily
    },
    {
      id: 'find-stores',
      title: 'Magasins',
      subtitle: 'Près de vous',
      icon: <MapPin size={20} color={COLORS.textPrimary} strokeWidth={2} />,
      color: COLORS.textPrimary,
      onPress: handleFindStores
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actions Rapides</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionCard}
            onPress={action.onPress}
            activeOpacity={0.7}
          >
            <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
              {action.icon}
            </View>
            <Text style={styles.actionTitle}>{action.title}</Text>
            <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  title: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  actionCard: {
    width: '31%',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
    minHeight: 100,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  actionTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },
});