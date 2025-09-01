import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  loginSchema, 
  registerSchema, 
  insertCartItemSchema,
  insertShoppingListSchema,
  insertShoppingListItemSchema,
  insertOrderSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // In a real app, you'd use proper password hashing and session management
      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          preferredLanguage: user.preferredLanguage 
        } 
      });
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(409).json({ message: "Email já cadastrado" });
      }

      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(409).json({ message: "Nome de usuário já existe" });
      }

      const { confirmPassword, ...userToCreate } = userData;
      const user = await storage.createUser(userToCreate);
      
      res.status(201).json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          preferredLanguage: user.preferredLanguage 
        } 
      });
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const { search, category } = req.query;
      
      let products;
      if (search) {
        products = await storage.searchProducts(search as string);
      } else if (category) {
        products = await storage.getProductsByCategory(category as string);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produtos" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produto" });
    }
  });

  app.get("/api/products/barcode/:barcode", async (req, res) => {
    try {
      const product = await storage.getProductByBarcode(req.params.barcode);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produto" });
    }
  });

  // Shopping list routes
  app.get("/api/shopping-lists/:userId", async (req, res) => {
    try {
      const lists = await storage.getUserShoppingLists(req.params.userId);
      res.json(lists);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar listas" });
    }
  });

  app.post("/api/shopping-lists", async (req, res) => {
    try {
      const listData = insertShoppingListSchema.parse(req.body);
      const list = await storage.createShoppingList(listData);
      res.status(201).json(list);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  app.get("/api/shopping-lists/:listId/items", async (req, res) => {
    try {
      const items = await storage.getShoppingListItems(req.params.listId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar itens da lista" });
    }
  });

  app.post("/api/shopping-lists/:listId/items", async (req, res) => {
    try {
      const itemData = insertShoppingListItemSchema.parse({
        ...req.body,
        listId: req.params.listId
      });
      const item = await storage.addItemToShoppingList(itemData);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  app.patch("/api/shopping-lists/:listId/status", async (req, res) => {
    try {
      const { status } = z.object({ status: z.string() }).parse(req.body);
      await storage.updateShoppingListStatus(req.params.listId, status);
      res.json({ message: "Status atualizado" });
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  // Cart routes
  app.get("/api/cart/:userId", async (req, res) => {
    try {
      const cartItems = await storage.getUserCartItems(req.params.userId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar carrinho" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const cartData = insertCartItemSchema.parse(req.body);
      const item = await storage.addToCart(cartData);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  app.patch("/api/cart/:itemId", async (req, res) => {
    try {
      const { quantity } = z.object({ quantity: z.number().min(1) }).parse(req.body);
      await storage.updateCartItem(req.params.itemId, quantity);
      res.json({ message: "Carrinho atualizado" });
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  app.delete("/api/cart/:itemId", async (req, res) => {
    try {
      await storage.removeFromCart(req.params.itemId);
      res.json({ message: "Item removido do carrinho" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao remover item" });
    }
  });

  app.delete("/api/cart/clear/:userId", async (req, res) => {
    try {
      await storage.clearCart(req.params.userId);
      res.json({ message: "Carrinho limpo" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao limpar carrinho" });
    }
  });

  // Order routes
  app.get("/api/orders/:userId", async (req, res) => {
    try {
      const orders = await storage.getUserOrders(req.params.userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar pedidos" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      
      // Clear cart after order creation
      await storage.clearCart(orderData.userId);
      
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
