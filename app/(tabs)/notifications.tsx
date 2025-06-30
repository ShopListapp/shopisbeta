import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Bell, Check, X, Clock, Users, ShoppingCart, CircleAlert as AlertCircle } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS, LAYOUT } from '@/constants/theme';
import ScreenLayout from '@/components/layouts/ScreenLayout';

interface Notification {
  id: string;
  type: 'reminder' | 'shared' | 'suggestion' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionable?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'reminder',
    title: 'Shopping Reminder',
    message: 'Don\'t forget to pick up items from your "Weekly Groceries" list',
    time: '2 hours ago',
    read: false,
    actionable: true,
  },
  {
    id: '2',
    type: 'shared',
    title: 'List Updated',
    message: 'Sarah added 3 items to "BBQ Weekend" list',
    time: '4 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'suggestion',
    title: 'Smart Suggestion',
    message: 'Based on your shopping history, you might need milk soon',
    time: '1 day ago',
    read: true,
    actionable: true,
  },
  {
    id: '4',
    type: 'alert',
    title: 'Price Alert',
    message: 'Organic bananas are 20% off at Lidl this week',
    time: '2 days ago',
    read: true,
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Clock size={16} color={COLORS.warning} strokeWidth={2} />;
      case 'shared':
        return <Users size={16} color={COLORS.primary} strokeWidth={2} />;
      case 'suggestion':
        return <ShoppingCart size={16} color={COLORS.success} strokeWidth={2} />;
      case 'alert':
        return <AlertCircle size={16} color={COLORS.error} strokeWidth={2} />;
      default:
        return <Bell size={16} color={COLORS.textSecondary} strokeWidth={2} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Alerts</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadCount}>{unreadCount} unread</Text>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity 
            style={styles.markAllButton}
            onPress={markAllAsRead}
            activeOpacity={0.7}
          >
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.notificationCard, !item.read && styles.notificationCardUnread]}
            onPress={() => markAsRead(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.notificationHeader}>
              <View style={styles.notificationIcon}>
                {getNotificationIcon(item.type)}
              </View>
              <View style={styles.notificationContent}>
                <Text style={[styles.notificationTitle, !item.read && styles.notificationTitleUnread]}>
                  {item.title}
                </Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteNotification(item.id)}
                activeOpacity={0.7}
              >
                <X size={16} color={COLORS.textSecondary} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            
            {item.actionable && (
              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                  <Text style={styles.actionButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Bell size={32} color={COLORS.textTertiary} strokeWidth={1.5} fill="none" />
            </View>
            <Text style={styles.emptyText}>No notifications</Text>
            <Text style={styles.emptySubText}>You're all caught up!</Text>
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
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT_SIZE.display,
    fontFamily: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  unreadCount: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  markAllButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primaryLight,
  },
  markAllText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  listContent: {
    padding: SPACING.lg,
    paddingBottom: LAYOUT.tabBarHeight + SPACING.lg,
  },
  notificationCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  notificationCardUnread: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  notificationTitleUnread: {
    fontFamily: FONT_WEIGHT.bold,
  },
  notificationMessage: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: SPACING.xs,
  },
  notificationTime: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textTertiary,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.card,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl * 2,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.xxl,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  emptyText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  emptySubText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
});