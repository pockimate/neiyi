export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  badge?: string
  gradient: string
  image: string
}

export const useProducts = () => {
  const products: Product[] = [
    {
      id: 1,
      name: 'Silk Lace Set',
      description: 'Delicate French lace with silk trim',
      price: 89.99,
      category: 'Bras & Sets',
      badge: 'New',
      gradient: 'from-pink-100 to-pink-50',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop'
    },
    {
      id: 2,
      name: 'Satin Bodysuit',
      description: 'Luxurious satin with adjustable straps',
      price: 129.99,
      category: 'Bodysuits',
      badge: 'Bestseller',
      gradient: 'from-purple-100 to-pink-50',
      image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=800&fit=crop'
    },
    {
      id: 3,
      name: 'Mesh Teddy',
      description: 'Sheer mesh with floral embroidery',
      price: 79.99,
      category: 'Bodysuits',
      gradient: 'from-rose-100 to-pink-50',
      image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&h=800&fit=crop'
    },
    {
      id: 4,
      name: 'Velvet Bralette',
      description: 'Soft velvet with gold hardware',
      price: 69.99,
      category: 'Bras & Sets',
      gradient: 'from-pink-100 to-rose-50',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop&sat=-100'
    },
    {
      id: 5,
      name: 'Lace Chemise',
      description: 'Romantic lace with satin bow detail',
      price: 59.99,
      originalPrice: 89.99,
      category: 'Chemises',
      badge: 'Sale',
      gradient: 'from-purple-100 to-rose-50',
      image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=800&fit=crop&hue=30'
    },
    {
      id: 6,
      name: 'Corset Set',
      description: 'Structured corset with garter straps',
      price: 149.99,
      category: 'Corsets',
      gradient: 'from-rose-100 to-purple-50',
      image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&h=800&fit=crop&hue=60'
    },
    {
      id: 7,
      name: 'Lace Bralette',
      description: 'Delicate lace with scalloped edges',
      price: 54.99,
      category: 'Bras & Sets',
      gradient: 'from-pink-100 to-rose-50',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop&hue=90'
    },
    {
      id: 8,
      name: 'Satin Chemise',
      description: 'Flowing satin with lace trim',
      price: 74.99,
      category: 'Chemises',
      badge: 'New',
      gradient: 'from-purple-100 to-pink-50',
      image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=800&fit=crop&hue=120'
    },
    {
      id: 9,
      name: 'Mesh Bodysuit',
      description: 'Sheer mesh with strategic coverage',
      price: 94.99,
      category: 'Bodysuits',
      gradient: 'from-rose-100 to-pink-50',
      image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&h=800&fit=crop&hue=150'
    },
    {
      id: 10,
      name: 'Lace Teddy',
      description: 'All-over lace with snap closure',
      price: 84.99,
      category: 'Bodysuits',
      badge: 'Bestseller',
      gradient: 'from-pink-100 to-purple-50',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop&hue=180'
    },
    {
      id: 11,
      name: 'Satin Robe Set',
      description: 'Matching robe and chemise set',
      price: 119.99,
      category: 'Chemises',
      gradient: 'from-purple-100 to-rose-50',
      image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=800&fit=crop&hue=210'
    },
    {
      id: 12,
      name: 'Velvet Corset',
      description: 'Luxe velvet with boning',
      price: 159.99,
      category: 'Corsets',
      badge: 'New',
      gradient: 'from-rose-100 to-pink-50',
      image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&h=800&fit=crop&hue=240'
    }
  ]

  const getProductById = (id: number) => {
    return products.find(p => p.id === id)
  }

  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category)
  }

  return {
    products,
    getProductById,
    getProductsByCategory
  }
}
