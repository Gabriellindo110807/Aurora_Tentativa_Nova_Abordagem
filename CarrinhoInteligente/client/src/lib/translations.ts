export const translations = {
  "pt-BR": {
    // Navigation
    welcome: "Bem-vindo",
    products: "Produtos",
    lists: "Listas",
    history: "Histórico",
    about: "Sobre",
    contact: "Contato",
    
    // Authentication
    login: "Entrar",
    register: "Cadastrar",
    email: "Email",
    password: "Senha",
    confirmPassword: "Confirmar Senha",
    firstName: "Nome",
    lastName: "Sobrenome",
    phone: "Telefone",
    
    // Dashboard
    hello: "Olá",
    readyToShop: "Pronto para suas compras inteligentes?",
    monthlyLy: "Economia total este mês",
    myShoppingLists: "Minhas Listas de Compras",
    
    // Products
    searchProducts: "Buscar produtos...",
    addToCart: "Adicionar ao carrinho",
    scanProduct: "Escanear Produto",
    
    // Cart
    cart: "Carrinho",
    checkout: "Finalizar Compra",
    total: "Total",
    
    // Common
    save: "Salvar",
    cancel: "Cancelar",
    back: "Voltar",
    next: "Próximo",
    loading: "Carregando...",
  },
  
  "en-US": {
    // Navigation
    welcome: "Welcome",
    products: "Products",
    lists: "Lists", 
    history: "History",
    about: "About",
    contact: "Contact",
    
    // Authentication
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Phone",
    
    // Dashboard
    hello: "Hello",
    readyToShop: "Ready for smart shopping?",
    monthlyLy: "Total savings this month",
    myShoppingLists: "My Shopping Lists",
    
    // Products
    searchProducts: "Search products...",
    addToCart: "Add to cart",
    scanProduct: "Scan Product",
    
    // Cart
    cart: "Cart",
    checkout: "Checkout",
    total: "Total",
    
    // Common
    save: "Save",
    cancel: "Cancel",
    back: "Back",
    next: "Next",
    loading: "Loading...",
  },
  
  "es-ES": {
    // Navigation
    welcome: "Bienvenido",
    products: "Productos",
    lists: "Listas",
    history: "Historial",
    about: "Acerca de",
    contact: "Contacto",
    
    // Authentication
    login: "Iniciar Sesión",
    register: "Registrarse",
    email: "Correo",
    password: "Contraseña",
    confirmPassword: "Confirmar Contraseña",
    firstName: "Nombre",
    lastName: "Apellido",
    phone: "Teléfono",
    
    // Dashboard
    hello: "Hola",
    readyToShop: "¿Listo para compras inteligentes?",
    monthlyLy: "Ahorro total este mes",
    myShoppingLists: "Mis Listas de Compras",
    
    // Products
    searchProducts: "Buscar productos...",
    addToCart: "Añadir al carrito",
    scanProduct: "Escanear Producto",
    
    // Cart
    cart: "Carrito",
    checkout: "Finalizar Compra",
    total: "Total",
    
    // Common
    save: "Guardar",
    cancel: "Cancelar",
    back: "Volver",
    next: "Siguiente",
    loading: "Cargando...",
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations["pt-BR"];
