/**
 * AE Buffet e Eventos - Dados dos Pratos e Configurações
 * Base de dados mockada para o catálogo do front-end.
 * Estrutura preparada para integração facilitada com API de backend no futuro.
 */

const BUFFET_CONFIG = {
  name: "AE Buffet e Eventos",
  tagline: "Sabor, sofisticação e afeto em cada celebração",
  whatsapp1: {
    number: "5511999991111",
    display: "(11) 99999-1111",
    label: "WhatsApp 1: Orçamentos & Cardápios",
    attendant: "Equipe de Atendimento 1"
  },
  whatsapp2: {
    number: "5511999992222",
    display: "(11) 99999-2222",
    label: "WhatsApp 2: Coordenação de Eventos & Encomendas",
    attendant: "Equipe de Atendimento 2"
  },
  email: "contato@aebuffet.com.br",
  location: "São Paulo - Atendemos toda a capital e região metropolitana",
  serviceHours: "Segunda a Sábado: 08h às 19h | Domingo: Eventos agendados"
};

const DISHES_DATA = [
  {
    id: 1,
    name: "Prato 1",
    category: "Carnes Nobres",
    shortDesc: "Filé mignon ao molho madeira artesanal com champignon fresco e risoto aromático de parmesão.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    prices: {
      5: 220.00,
      10: 410.00,
      15: 590.00
    },
    ingredients: [
      { name: "Filé Mignon em medalhões selecionados", qty: { 5: "900g", 10: "1.8kg", 15: "2.7kg" } },
      { name: "Cogumelos Champignon frescos", qty: { 5: "200g", 10: "400g", 15: "600g" } },
      { name: "Molho Madeira com redução de vinho", qty: { 5: "300ml", 10: "600ml", 15: "900ml" } },
      { name: "Arroz arbóreo para o risoto", qty: { 5: "350g", 10: "700g", 15: "1.05kg" } },
      { name: "Queijo Parmesão Grana ralado na hora", qty: { 5: "120g", 10: "240g", 15: "360g" } },
      { name: "Manteiga de primeira linha e ervas finas", qty: { 5: "60g", 10: "120g", 15: "180g" } }
    ]
  },
  {
    id: 2,
    name: "Prato 2",
    category: "Pescados & Frutos do Mar",
    shortDesc: "Salmão grelhado na manteiga clarificada com crosta de ervas e aveludado purê de mandioquinha.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
    prices: {
      5: 240.00,
      10: 450.00,
      15: 640.00
    },
    ingredients: [
      { name: "Lombo de Salmão fresco em postas", qty: { 5: "950g", 10: "1.9kg", 15: "2.85kg" } },
      { name: "Mandioquinha (batata baroa) cozida e amassada", qty: { 5: "800g", 10: "1.6kg", 15: "2.4kg" } },
      { name: "Crosta de ervas frescas (alecrim, tomilho e salsa)", qty: { 5: "50g", 10: "100g", 15: "150g" } },
      { name: "Creme de leite fresco para o purê", qty: { 5: "150ml", 10: "300ml", 15: "450ml" } },
      { name: "Manteiga clarificada e azeite extravirgem", qty: { 5: "70g", 10: "140g", 15: "210g" } },
      { name: "Raspas de limão siciliano e flor de sal", qty: { 5: "A gosto", 10: "A gosto", 15: "A gosto" } }
    ]
  },
  {
    id: 3,
    name: "Prato 3",
    category: "Pescados & Frutos do Mar",
    shortDesc: "Bobó de camarão cremoso com leite de coco artesanal, acompanhado de arroz soltinho e farofa crocante.",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
    prices: {
      5: 215.00,
      10: 395.00,
      15: 570.00
    },
    ingredients: [
      { name: "Camarões rosa médios limpos", qty: { 5: "800g", 10: "1.6kg", 15: "2.4kg" } },
      { name: "Mandioca cozida batida em creme sedoso", qty: { 5: "900g", 10: "1.8kg", 15: "2.7kg" } },
      { name: "Leite de coco integral artesanal", qty: { 5: "250ml", 10: "500ml", 15: "750ml" } },
      { name: "Azeite de dendê e pimentões coloridos", qty: { 5: "80ml", 10: "160ml", 15: "240ml" } },
      { name: "Arroz agulhinha branco especial", qty: { 5: "400g", 10: "800g", 15: "1.2kg" } },
      { name: "Farinha de mandioca flocada temperada", qty: { 5: "200g", 10: "400g", 15: "600g" } }
    ]
  },
  {
    id: 4,
    name: "Prato 4",
    category: "Massas Artesanais",
    shortDesc: "Ravioli artesanal recheado com queijo brie cremoso e damasco turco ao molho de nozes tostadas.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
    prices: {
      5: 195.00,
      10: 360.00,
      15: 520.00
    },
    ingredients: [
      { name: "Massa fresca artesanal de ovos caipiras", qty: { 5: "700g", 10: "1.4kg", 15: "2.1kg" } },
      { name: "Queijo Brie francês legítimo", qty: { 5: "350g", 10: "700g", 15: "1.05kg" } },
      { name: "Damasco turco picado em redução suave", qty: { 5: "180g", 10: "360g", 15: "540g" } },
      { name: "Molho bechamel aveludado com noz-moscada", qty: { 5: "400ml", 10: "800ml", 15: "1.2L" } },
      { name: "Nozes chilenas tostadas e picadas", qty: { 5: "100g", 10: "200g", 15: "300g" } },
      { name: "Folhas de manjericão fresco e azeite trufado", qty: { 5: "Toque final", 10: "Toque final", 15: "Toque final" } }
    ]
  },
  {
    id: 5,
    name: "Prato 5",
    category: "Carnes Especiais",
    shortDesc: "Pernil suíno marinado em especiarias e assado lentamente, coberto por redução de frutas vermelhas.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    prices: {
      5: 185.00,
      10: 340.00,
      15: 495.00
    },
    ingredients: [
      { name: "Pernil suíno desossado e fatiado", qty: { 5: "1.1kg", 10: "2.2kg", 15: "3.3kg" } },
      { name: "Redução de frutas vermelhas (framboesa, amora e mirtilo)", qty: { 5: "250ml", 10: "500ml", 15: "750ml" } },
      { name: "Batatas rústicas com alecrim e alho confitado", qty: { 5: "700g", 10: "1.4kg", 15: "2.1kg" } },
      { name: "Marinada especial com vinho branco e especiarias", qty: { 5: "200ml", 10: "400ml", 15: "600ml" } },
      { name: "Cebolas douradas caramelizadas no azeite", qty: { 5: "250g", 10: "500g", 15: "750g" } }
    ]
  },
  {
    id: 6,
    name: "Prato 6",
    category: "Pescados & Tradição",
    shortDesc: "Bacalhau nobre confitado em azeite extravirgem com azeitonas pretas, ovos cozidos e batatas ao murro.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80",
    prices: {
      5: 250.00,
      10: 480.00,
      15: 690.00
    },
    ingredients: [
      { name: "Lombo de Bacalhau Gadus Morhua dessalgado", qty: { 5: "1kg", 10: "2kg", 15: "3kg" } },
      { name: "Batatas bolinha cozidas e douradas (ao murro)", qty: { 5: "800g", 10: "1.6kg", 15: "2.4kg" } },
      { name: "Azeite de oliva extravirgem português", qty: { 5: "250ml", 10: "500ml", 15: "750ml" } },
      { name: "Azeitonas pretas portuguesas selecionadas", qty: { 5: "150g", 10: "300g", 15: "450g" } },
      { name: "Cebolas em rodelas e dentes de alho laminados", qty: { 5: "300g", 10: "600g", 15: "900g" } },
      { name: "Ovos caipiras cozidos e salsinha fresca", qty: { 5: "4 un", 10: "8 un", 15: "12 un" } }
    ]
  },
  {
    id: 7,
    name: "Prato 7",
    category: "Risotos & Vegetarianos",
    shortDesc: "Risoto cremoso de alho-poró tostado na manteiga de ervas com toque suave de queijo gorgonzola e castanhas.",
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=900&q=80",
    prices: {
      5: 175.00,
      10: 320.00,
      15: 460.00
    },
    ingredients: [
      { name: "Arroz Arbóreo especial italiano", qty: { 5: "450g", 10: "900g", 15: "1.35kg" } },
      { name: "Alho-poró fresco fatiado e tostado", qty: { 5: "300g", 10: "600g", 15: "900g" } },
      { name: "Queijo Gorgonzola suave em cubos", qty: { 5: "150g", 10: "300g", 15: "450g" } },
      { name: "Caldo de legumes aromático artesanal", qty: { 5: "1.2L", 10: "2.4L", 15: "3.6L" } },
      { name: "Castanhas-de-caju tostadas crocantes", qty: { 5: "90g", 10: "180g", 15: "270g" } },
      { name: "Manteiga sem sal e vinho branco seco", qty: { 5: "120g/100ml", 10: "240g/200ml", 15: "360g/300ml" } }
    ]
  },
  {
    id: 8,
    name: "Prato 8",
    category: "Clássicos do Buffet",
    shortDesc: "Strogonoff clássico de carne Angus em tiras, cogumelos frescos, creme de leite aveludado e batata palha caseira.",
    image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=900&q=80",
    prices: {
      5: 190.00,
      10: 350.00,
      15: 510.00
    },
    ingredients: [
      { name: "Tiras macias de carne bovina Angus", qty: { 5: "900g", 10: "1.8kg", 15: "2.7kg" } },
      { name: "Champignon Paris fatiado", qty: { 5: "250g", 10: "500g", 15: "750g" } },
      { name: "Molho de tomates selecionados com mostarda dijon e conhaque", qty: { 5: "350ml", 10: "700ml", 15: "1.05L" } },
      { name: "Creme de leite fresco culinário", qty: { 5: "300ml", 10: "600ml", 15: "900ml" } },
      { name: "Arroz branco perfumado com alho", qty: { 5: "450g", 10: "900g", 15: "1.35kg" } },
      { name: "Batata palha extrafina artesanal crocante", qty: { 5: "180g", 10: "360g", 15: "540g" } }
    ]
  },
  {
    id: 9,
    name: "Prato 9",
    category: "Aves Nobres",
    shortDesc: "Supremo de frango recheado com espinafre e queijo provolone, gratinado ao creme quatro queijos e legumes na manteiga.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    prices: {
      5: 180.00,
      10: 330.00,
      15: 480.00
    },
    ingredients: [
      { name: "Peitos de frango selecionados recheados", qty: { 5: "900g (5 peitos)", 10: "1.8kg (10 peitos)", 15: "2.7kg (15 peitos)" } },
      { name: "Espinafre fresco salteado e queijo provolone", qty: { 5: "250g", 10: "500g", 15: "750g" } },
      { name: "Creme aveludado de quatro queijos especiais", qty: { 5: "400ml", 10: "800ml", 15: "1.2L" } },
      { name: "Cenouras baby e vagens francesas salteadas na manteiga", qty: { 5: "400g", 10: "800g", 15: "1.2kg" } },
      { name: "Ervas de Provence e alho assado", qty: { 5: "Temperos", 10: "Temperos", 15: "Temperos" } }
    ]
  },
  {
    id: 10,
    name: "Prato 10",
    category: "Pescados & Tradição",
    shortDesc: "Moqueca mista tradicional de badejo com camarões, pimentões, leite de coco fresco, pirão leve e coentro.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80",
    prices: {
      5: 235.00,
      10: 440.00,
      15: 630.00
    },
    ingredients: [
      { name: "Postas de peixe nobre (Badejo / Robalo)", qty: { 5: "850g", 10: "1.7kg", 15: "2.55kg" } },
      { name: "Camarões médios frescos", qty: { 5: "500g", 10: "1kg", 15: "1.5kg" } },
      { name: "Leite de coco puro e azeite de dendê balanceado", qty: { 5: "300ml / 60ml", 10: "600ml / 120ml", 15: "900ml / 180ml" } },
      { name: "Tomates maduros, pimentões e cebolas em rodelas", qty: { 5: "500g", 10: "1kg", 15: "1.5kg" } },
      { name: "Pirão de peixe aveludado da casa", qty: { 5: "400g", 10: "800g", 15: "1.2kg" } },
      { name: "Coentro fresco picado e pimenta de cheiro", qty: { 5: "A gosto", 10: "A gosto", 15: "A gosto" } }
    ]
  }
];

// Helper para formatar moeda brasileira (BRL)
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}
