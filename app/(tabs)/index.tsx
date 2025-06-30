import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Dimensions, Modal, Alert } from 'react-native';
import { MoveVertical as MoreVertical, Search, Plus, Filter, X, Check, Share, Trash2, CreditCard as Edit3 } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS, LAYOUT } from '@/constants/theme';
import ScreenLayout from '@/components/layouts/ScreenLayout';
import GroceryListCard from '@/components/grocery/GroceryListCard';
import CreateListModal from '@/components/grocery/CreateListModal';
import { mockLists } from '@/data/mockData';

const { width } = Dimensions.get('window');

export default function ListsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [lists, setLists] = useState(mockLists);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'shared' | 'personal' | 'completed'>('all');
  
  const filteredLists = lists.filter(list => {
    const matchesSearch = list.name.toLowerCase().includes(searchQuery.toLowerCase());
    const completedItems = list.items.filter(item => item.checked).length;
    const isCompleted = completedItems === list.items.length && list.items.length > 0;
    
    switch (selectedFilter) {
      case 'shared':
        return matchesSearch && list.shared;
      case 'personal':
        return matchesSearch && !list.shared;
      case 'completed':
        return matchesSearch && isCompleted;
      default:
        return matchesSearch;
    }
  });

  const handleCreateList = (name: string, isShared: boolean) => {
    const newList = {
      id: Date.now().toString(),
      name,
      items: [],
      shared: isShared,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
    };
    setLists([newList, ...lists]);
    setShowCreateModal(false);
  };

  const handleDeleteList = (listId: string) => {
    Alert.alert(
      'Delete List',
      'Are you sure you want to delete this list? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setLists(lists.filter(list => list.id !== listId))
        }
      ]
    );
  };

  const FilterModal = () => (
    <Modal
      visible={showFilters}
      transparent
      animationType="fade"
      onRequestClose={() => setShowFilters(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1}
        onPress={() => setShowFilters(false)}
      >
        <View style={styles.filterModal}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Filter Lists</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <X size={20} color={COLORS.textSecondary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          {[
            { key: 'all', label: 'All Lists', count: lists.length },
            { key: 'shared', label: 'Shared Lists', count: lists.filter(l => l.shared).length },
            { key: 'personal', label: 'Personal Lists', count: lists.filter(l => !l.shared).length },
            { key: 'completed', label: 'Completed Lists', count: lists.filter(l => {
              const completed = l.items.filter(item => item.checked).length;
              return completed === l.items.length && l.items.length > 0;
            }).length }
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterOption,
                selectedFilter === filter.key && styles.filterOptionActive
              ]}
              onPress={() => {
                setSelectedFilter(filter.key as any);
                setShowFilters(false);
              }}
            >
              <Text style={[
                styles.filterOptionText,
                selectedFilter === filter.key && styles.filterOptionTextActive
              ]}>
                {filter.label}
              </Text>
              <View style={[
                styles.filterCount,
                selectedFilter === filter.key && styles.filterCountActive
              ]}>
                <Text style={[
                  styles.filterCountText,
                  selectedFilter === filter.key && styles.filterCountTextActive
                ]}>
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
  
  return (
    <ScreenLayout>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.title}>My Lists</Text>
          </View>
          <TouchableOpacity style={styles.optionsButton} activeOpacity={0.7}>
            <MoreVertical size={20} color={COLORS.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Search size={18} color={COLORS.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search your lists..."
              placeholderTextColor={COLORS.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
          </View>
          <TouchableOpacity 
            style={[styles.filterButton, showFilters && styles.filterButtonActive]} 
            activeOpacity={0.7}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} color={showFilters ? COLORS.primary : COLORS.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {selectedFilter !== 'all' && (
          <View style={styles.activeFilterContainer}>
            <Text style={styles.activeFilterText}>
              Showing {selectedFilter} lists
            </Text>
            <TouchableOpacity 
              onPress={() => setSelectedFilter('all')}
              style={styles.clearFilterButton}
            >
              <Text style={styles.clearFilterText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <FlatList
        data={filteredLists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroceryListCard 
            list={item} 
            onDelete={() => handleDeleteList(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Plus size={32} color={COLORS.textTertiary} strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No lists found' : 'No grocery lists yet'}
            </Text>
            <Text style={styles.emptySubText}>
              {searchQuery 
                ? 'Try adjusting your search or filters' 
                : 'Create your first list to get started with smart shopping'
              }
            </Text>
            {!searchQuery && (
              <TouchableOpacity 
                style={styles.emptyCreateButton}
                onPress={() => setShowCreateModal(true)}
              >
                <Text style={styles.emptyCreateButtonText}>Create List</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
      
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => setShowCreateModal(true)}
      >
        <Plus size={20} color={COLORS.card} strokeWidth={2.5} />
      </TouchableOpacity>

      <FilterModal />
      <CreateListModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateList={handleCreateList}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
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
  },
  optionsButton: {
    width: LAYOUT.minTouchTarget,
    height: LAYOUT.minTouchTarget,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    paddingHorizontal: SPACING.md,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  activeFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.primaryLight,
    borderRadius: BORDER_RADIUS.lg,
  },
  activeFilterText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  clearFilterButton: {
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
  },
  clearFilterText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  listContent: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },
  separator: {
    height: SPACING.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl * 2,
    paddingHorizontal: SPACING.xl,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.xxl,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  emptyText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptySubText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
    marginBottom: SPACING.lg,
  },
  emptyCreateButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.medium,
  },
  emptyCreateButtonText: {
    color: COLORS.card,
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.xl + LAYOUT.tabBarHeight + 20,
    right: SPACING.xl,
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  filterModal: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    width: '100%',
    maxWidth: 320,
    ...SHADOWS.large,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  filterTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xs,
  },
  filterOptionActive: {
    backgroundColor: COLORS.primaryLight,
  },
  filterOptionText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
  },
  filterOptionTextActive: {
    color: COLORS.primary,
  },
  filterCount: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
    minWidth: 24,
    alignItems: 'center',
  },
  filterCountActive: {
    backgroundColor: COLORS.primary,
  },
  filterCountText: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  filterCountTextActive: {
    color: COLORS.card,
  },
});