import { 
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct,
  type ShoppingList,
  type InsertShoppingList,
  type ShoppingListItem,
  type InsertShoppingListItem,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductByBarcode(barcode: string): Promise<Product | undefined>;
  searchProducts(query: string): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Shopping list methods
  getUserShoppingLists(userId: string): Promise<ShoppingList[]>;
  getShoppingList(id: string): Promise<ShoppingList | undefined>;
  createShoppingList(list: InsertShoppingList): Promise<ShoppingList>;
  updateShoppingListStatus(id: string, status: string): Promise<void>;

  // Shopping list items
  getShoppingListItems(listId: string): Promise<(ShoppingListItem & { product: Product })[]>;
  addItemToShoppingList(item: InsertShoppingListItem): Promise<ShoppingListItem>;
  updateShoppingListItem(id: string, data: Partial<ShoppingListItem>): Promise<void>;
  removeShoppingListItem(id: string): Promise<void>;

  // Cart methods
  getUserCartItems(userId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<void>;
  removeFromCart(id: string): Promise<void>;
  clearCart(userId: string): Promise<void>;

  // Order methods
  getUserOrders(userId: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private shoppingLists: Map<string, ShoppingList>;
  private shoppingListItems: Map<string, ShoppingListItem>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.shoppingLists = new Map();
    this.shoppingListItems = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    
    // Initialize with sample products
    this.initializeSampleProducts();
  }

  private initializeSampleProducts() {
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "Cerveja Skol 350ml",
        brand: "Skol",
        category: "Bebidas",
        price: "3.50",
        originalPrice: "4.00",
        description: "Cerveja lager gelada",
        barcode: "7891234567890",
        rating: "4.2",
        inStock: true,
        iconType: "wine",
      },
      {
        id: "2",
        name: "Tênis Nike Air Max",
        brand: "Nike",
        category: "Roupas",
        price: "199.90",
        originalPrice: "250.00",
        description: "Tênis esportivo confortável",
        barcode: "7891234567891",
        rating: "4.8",
        inStock: true,
        iconType: "shirt",
      },
      {
        id: "3",
        name: "Maçã Fuji Kg",
        brand: "Hortifruti",
        category: "Alimentação",
        price: "8.90",
        originalPrice: null,
        description: "Maçã fresca e doce",
        barcode: "7891234567892",
        rating: "4.1",
        inStock: true,
        iconType: "apple",
      },
      {
        id: "4",
        name: "Carne Bovina Kg",
        brand: "Açougue Premium",
        category: "Alimentação",
        price: "32.90",
        originalPrice: null,
        description: "Carne bovina de primeira qualidade",
        barcode: "7891234567893",
        rating: "4.9",
        inStock: true,
        iconType: "beef",
      },
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      phone: insertUser.phone || null,
      preferredLanguage: insertUser.preferredLanguage || "pt-BR",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductByBarcode(barcode: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(product => product.barcode === barcode);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.products.values()).filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const newProduct: Product = { 
      ...product, 
      id,
      description: product.description || null,
      barcode: product.barcode || null,
      originalPrice: product.originalPrice || null,
      rating: product.rating || "0",
      inStock: product.inStock ?? true,
      iconType: product.iconType || "box"
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  // Shopping list methods
  async getUserShoppingLists(userId: string): Promise<ShoppingList[]> {
    return Array.from(this.shoppingLists.values()).filter(list => list.userId === userId);
  }

  async getShoppingList(id: string): Promise<ShoppingList | undefined> {
    return this.shoppingLists.get(id);
  }

  async createShoppingList(list: InsertShoppingList): Promise<ShoppingList> {
    const id = randomUUID();
    const newList: ShoppingList = { 
      ...list, 
      id,
      status: list.status || "active",
      createdAt: new Date(),
      completedAt: null,
    };
    this.shoppingLists.set(id, newList);
    return newList;
  }

  async updateShoppingListStatus(id: string, status: string): Promise<void> {
    const list = this.shoppingLists.get(id);
    if (list) {
      list.status = status;
      if (status === "completed") {
        list.completedAt = new Date();
      }
      this.shoppingLists.set(id, list);
    }
  }

  // Shopping list items
  async getShoppingListItems(listId: string): Promise<(ShoppingListItem & { product: Product })[]> {
    const items = Array.from(this.shoppingListItems.values()).filter(item => item.listId === listId);
    return items.map(item => {
      const product = this.products.get(item.productId);
      return { ...item, product: product! };
    });
  }

  async addItemToShoppingList(item: InsertShoppingListItem): Promise<ShoppingListItem> {
    const id = randomUUID();
    const newItem: ShoppingListItem = { 
      ...item, 
      id,
      quantity: item.quantity || 1,
      isCompleted: false,
      addedAt: new Date(),
    };
    this.shoppingListItems.set(id, newItem);
    return newItem;
  }

  async updateShoppingListItem(id: string, data: Partial<ShoppingListItem>): Promise<void> {
    const item = this.shoppingListItems.get(id);
    if (item) {
      Object.assign(item, data);
      this.shoppingListItems.set(id, item);
    }
  }

  async removeShoppingListItem(id: string): Promise<void> {
    this.shoppingListItems.delete(id);
  }

  // Cart methods
  async getUserCartItems(userId: string): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.userId === userId);
    return items.map(item => {
      const product = this.products.get(item.productId);
      return { ...item, product: product! };
    });
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      cartItem => cartItem.userId === item.userId && cartItem.productId === item.productId
    );

    if (existingItem) {
      existingItem.quantity += (item.quantity || 1);
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = randomUUID();
    const newItem: CartItem = { 
      ...item, 
      id,
      quantity: item.quantity || 1,
      addedAt: new Date(),
    };
    this.cartItems.set(id, newItem);
    return newItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<void> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
    }
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(userId: string): Promise<void> {
    Array.from(this.cartItems.entries()).forEach(([id, item]) => {
      if (item.userId === userId) {
        this.cartItems.delete(id);
      }
    });
  }

  // Order methods
  async getUserOrders(userId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const newOrder: Order = { 
      ...order, 
      id,
      status: "pending",
      createdAt: new Date(),
      completedAt: null,
    };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async updateOrderStatus(id: string, status: string): Promise<void> {
    const order = this.orders.get(id);
    if (order) {
      order.status = status;
      if (status === "completed") {
        order.completedAt = new Date();
      }
      this.orders.set(id, order);
    }
  }
}

export const storage = new MemStorage();
