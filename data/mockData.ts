export const mockLists = [
  {
    id: '1',
    name: 'Weekly Groceries',
    items: [
      { id: '1-1', name: 'Milk', checked: true },
      { id: '1-2', name: 'Eggs', checked: true },
      { id: '1-3', name: 'Bread', checked: false },
      { id: '1-4', name: 'Butter', checked: false },
      { id: '1-5', name: 'Cheese', checked: false },
    ],
    shared: true,
    date: 'Jun 15, 2025',
  },
  {
    id: '2',
    name: 'Party Supplies',
    items: [
      { id: '2-1', name: 'Paper plates', checked: true },
      { id: '2-2', name: 'Plastic cups', checked: false },
      { id: '2-3', name: 'Napkins', checked: false },
    ],
    shared: false,
    date: 'Jun 20, 2025',
  },
  {
    id: '3',
    name: 'BBQ Weekend',
    items: [
      { id: '3-1', name: 'Burger patties', checked: false },
      { id: '3-2', name: 'Hot dog buns', checked: false },
      { id: '3-3', name: 'Ketchup', checked: true },
      { id: '3-4', name: 'Mustard', checked: true },
      { id: '3-5', name: 'Lettuce', checked: false },
      { id: '3-6', name: 'Tomatoes', checked: false },
    ],
    shared: true,
    date: 'Jun 24, 2025',
  },
];

export const mockCategories = [
  {
    id: '1',
    name: 'Groceries',
    spent: 180,
    budget: 200,
    icon: null,
    color: '#3466FE',
  },
  {
    id: '2',
    name: 'Dining Out',
    spent: 85,
    budget: 100,
    icon: null,
    color: '#FF9500',
  },
  {
    id: '3',
    name: 'Household',
    spent: 45,
    budget: 75,
    icon: null,
    color: '#34C759',
  },
  {
    id: '4',
    name: 'Health',
    spent: 10,
    budget: 50,
    icon: null,
    color: '#FF3B30',
  },
];

export const mockRecentTransactions = [
  {
    id: '1',
    store: 'Whole Foods Market',
    amount: 75.32,
    date: 'June 15, 2025',
    category: 'Groceries',
  },
  {
    id: '2',
    store: 'Target',
    amount: 45.67,
    date: 'June 14, 2025',
    category: 'Household',
  },
  {
    id: '3',
    store: 'Trader Joe\'s',
    amount: 32.45,
    date: 'June 12, 2025',
    category: 'Groceries',
  },
  {
    id: '4',
    store: 'Walgreens',
    amount: 15.99,
    date: 'June 10, 2025',
    category: 'Health',
  },
];