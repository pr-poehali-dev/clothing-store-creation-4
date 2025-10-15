import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  size: string[];
  color: string;
  brand: string;
  isNew?: boolean;
  discount?: number;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    price: 14990,
    image: 'https://cdn.poehali.dev/projects/4e47b175-b72e-4e05-b7a0-2887ba3dfc45/files/b3edd821-6c4c-4f67-b5a6-40a3dbb819aa.jpg',
    category: 'Lifestyle',
    size: ['40', '41', '42', '43', '44', '45'],
    color: 'Черный/Белый',
    brand: 'Nike',
    isNew: true
  },
  {
    id: 2,
    name: 'Adidas Ultraboost 22',
    price: 16990,
    image: 'https://cdn.poehali.dev/projects/4e47b175-b72e-4e05-b7a0-2887ba3dfc45/files/b7a0f941-9734-4ce2-8991-6d4801093591.jpg',
    category: 'Running',
    size: ['40', '41', '42', '43', '44'],
    color: 'Черный',
    brand: 'Adidas',
    discount: 15
  },
  {
    id: 3,
    name: 'New Balance 574',
    price: 8990,
    image: 'https://cdn.poehali.dev/projects/4e47b175-b72e-4e05-b7a0-2887ba3dfc45/files/f63f9865-c638-4085-9ad2-5ffe96ba9734.jpg',
    category: 'Lifestyle',
    size: ['39', '40', '41', '42', '43'],
    color: 'Серый/Синий',
    brand: 'New Balance',
    isNew: true
  },
  {
    id: 4,
    name: 'Asics Gel-Kayano 29',
    price: 13990,
    image: 'https://cdn.poehali.dev/projects/4e47b175-b72e-4e05-b7a0-2887ba3dfc45/files/b3edd821-6c4c-4f67-b5a6-40a3dbb819aa.jpg',
    category: 'Running',
    size: ['40', '41', '42', '43', '44'],
    color: 'Синий',
    brand: 'Asics',
    discount: 20
  },
  {
    id: 5,
    name: 'Nike React Infinity Run',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/4e47b175-b72e-4e05-b7a0-2887ba3dfc45/files/b3edd821-6c4c-4f67-b5a6-40a3dbb819aa.jpg',
    category: 'Running',
    size: ['40', '41', '42', '43', '44', '45'],
    color: 'Белый/Синий',
    brand: 'Nike',
    isNew: true
  },
  {
    id: 6,
    name: 'Adidas Originals Superstar',
    price: 9990,
    image: 'https://cdn.poehali.dev/projects/4e47b175-b72e-4e05-b7a0-2887ba3dfc45/files/b7a0f941-9734-4ce2-8991-6d4801093591.jpg',
    category: 'Lifestyle',
    size: ['39', '40', '41', '42', '43', '44'],
    color: 'Белый/Черный',
    brand: 'Adidas',
    discount: 10
  },
  {
    id: 7,
    name: 'New Balance Fresh Foam',
    price: 11990,
    image: 'https://cdn.poehali.dev/projects/4e47b175-b72e-4e05-b7a0-2887ba3dfc45/files/f63f9865-c638-4085-9ad2-5ffe96ba9734.jpg',
    category: 'Running',
    size: ['40', '41', '42', '43', '44'],
    color: 'Серый',
    brand: 'New Balance'
  },
  {
    id: 8,
    name: 'Asics GT-2000 10',
    price: 10990,
    image: 'https://cdn.poehali.dev/projects/4e47b175-b72e-4e05-b7a0-2887ba3dfc45/files/b3edd821-6c4c-4f67-b5a6-40a3dbb819aa.jpg',
    category: 'Running',
    size: ['40', '41', '42', '43', '44', '45'],
    color: 'Черный/Оранжевый',
    brand: 'Asics',
    isNew: true
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const sizes = ['39', '40', '41', '42', '43', '44', '45'];
  const colors = ['Черный', 'Белый', 'Серый', 'Синий', 'Оранжевый'];
  const brands = ['Nike', 'Adidas', 'New Balance', 'Asics'];

  const filteredProducts = products.filter(product => {
    const sizeMatch = selectedSizes.length === 0 || product.size.some(s => selectedSizes.includes(s));
    const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return sizeMatch && colorMatch && brandMatch;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedSize: product.size[0] }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const totalPrice = cart.reduce((sum, item) => {
    const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    return sum + price * item.quantity;
  }, 0);

  const toggleFilter = (value: string, filterType: 'size' | 'color' | 'brand') => {
    if (filterType === 'size') {
      setSelectedSizes(prev => 
        prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
      );
    } else if (filterType === 'color') {
      setSelectedColors(prev => 
        prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
      );
    } else {
      setSelectedBrands(prev => 
        prev.includes(value) ? prev.filter(b => b !== value) : [...prev, value]
      );
    }
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Sparkles" className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SNEAKER STORE
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {['Главная', 'Каталог', 'Новинки', 'Распродажа', 'Доставка', 'Контакты'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className="text-sm font-medium hover:text-primary transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                </button>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative animate-scale-in">
                  <Icon name="ShoppingCart" className="w-5 h-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center animate-scale-in">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Icon name="ShoppingBag" className="w-5 h-5" />
                    Корзина ({cart.length})
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingCart" className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <Card key={item.id} className="p-4 animate-slide-up">
                          <div className="flex gap-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.selectedSize}</p>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" className="w-4 h-4" />
                                  </Button>
                                  <span className="font-semibold">{item.quantity}</span>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" className="w-4 h-4" />
                                  </Button>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-lg">
                                    {((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toLocaleString()} ₽
                                  </p>
                                  {item.discount && (
                                    <p className="text-xs text-muted-foreground line-through">
                                      {(item.price * item.quantity).toLocaleString()} ₽
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="Trash2" className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-semibold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                          <Icon name="ArrowRight" className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <Badge className="mb-4 animate-scale-in">Новая коллекция 2024</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
              Легендарные <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                кроссовки
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Nike, Adidas, New Balance, Asics — топовые бренды в одном месте
            </p>
            <Button size="lg" className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              Смотреть каталог
              <Icon name="ArrowRight" className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Каталог</h3>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Icon name="SlidersHorizontal" className="w-4 h-4" />
                  Фильтры
                  {(selectedSizes.length + selectedColors.length + selectedBrands.length) > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedSizes.length + selectedColors.length + selectedBrands.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-between">
                    <span>Фильтры</span>
                    {(selectedSizes.length + selectedColors.length + selectedBrands.length) > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Сбросить
                      </Button>
                    )}
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Ruler" className="w-4 h-4" />
                      Размер
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {sizes.map(size => (
                        <Button
                          key={size}
                          variant={selectedSizes.includes(size) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => toggleFilter(size, 'size')}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Palette" className="w-4 h-4" />
                      Цвет
                    </h4>
                    <div className="space-y-2">
                      {colors.map(color => (
                        <div key={color} className="flex items-center gap-2">
                          <Checkbox
                            id={color}
                            checked={selectedColors.includes(color)}
                            onCheckedChange={() => toggleFilter(color, 'color')}
                          />
                          <label htmlFor={color} className="text-sm cursor-pointer">
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Tag" className="w-4 h-4" />
                      Бренд
                    </h4>
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <div key={brand} className="flex items-center gap-2">
                          <Checkbox
                            id={brand}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => toggleFilter(brand, 'brand')}
                          />
                          <label htmlFor={brand} className="text-sm cursor-pointer">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden aspect-square bg-muted">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-3 left-3 bg-secondary">
                      Новинка
                    </Badge>
                  )}
                  {product.discount && (
                    <Badge className="absolute top-3 right-3 bg-primary">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                    </div>
                    <Button size="icon" variant="ghost">
                      <Icon name="Heart" className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {product.color}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {product.size.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {product.discount 
                          ? (product.price * (1 - product.discount / 100)).toLocaleString()
                          : product.price.toLocaleString()
                        } ₽
                      </p>
                      {product.discount && (
                        <p className="text-sm text-muted-foreground line-through">
                          {product.price.toLocaleString()} ₽
                        </p>
                      )}
                    </div>
                    <Button onClick={() => addToCart(product)} className="gap-2">
                      <Icon name="ShoppingCart" className="w-4 h-4" />
                      В корзину
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Package" className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-xl text-muted-foreground mb-4">Товары не найдены</p>
              <Button variant="outline" onClick={clearFilters}>
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Icon name="Store" className="w-5 h-5" />
                Sneaker Store
              </h4>
              <p className="text-sm text-muted-foreground">
                Оригинальные кроссовки мировых брендов
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О компании</li>
                <li>Доставка</li>
                <li>Оплата</li>
                <li>Возврат</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" className="w-4 h-4" />
                  +7 (999) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" className="w-4 h-4" />
                  info@fashion.store
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-2">
                <Button size="icon" variant="outline">
                  <Icon name="Facebook" className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon name="Instagram" className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon name="Twitter" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Sneaker Store. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}