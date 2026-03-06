export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  description: string;
  steps: string[];
}

export const taiwaneseRecipes: Recipe[] = [
  {
    id: '1',
    name: '番茄炒蛋',
    ingredients: ['雞蛋', '番茄', '蔥'],
    description: '經典台式家常菜，酸甜開胃，營養豐富',
    steps: [
      '番茄切塊，雞蛋打散',
      '熱油鍋，先炒蛋至半熟盛起',
      '炒番茄至軟爛，加入雞蛋',
      '加鹽、糖調味，撒上蔥花'
    ]
  },
  {
    id: '2',
    name: '高麗菜炒蛋',
    ingredients: ['高麗菜', '雞蛋'],
    description: '簡單快速的家常菜，清甜爽口',
    steps: [
      '高麗菜切片，雞蛋打散',
      '熱油鍋炒蛋盛起',
      '炒高麗菜至軟',
      '加入雞蛋拌炒，調味即可'
    ]
  },
  {
    id: '3',
    name: '蔥花蛋',
    ingredients: ['雞蛋', '蔥'],
    description: '最簡單的蛋料理，香氣十足',
    steps: [
      '蔥切末，雞蛋打散',
      '蛋液加入蔥花和鹽',
      '熱油鍋倒入蛋液',
      '煎至兩面金黃'
    ]
  },
  {
    id: '4',
    name: '蒜炒高麗菜',
    ingredients: ['高麗菜', '蒜頭'],
    description: '蒜香濃郁，清脆爽口',
    steps: [
      '高麗菜切片，蒜頭切片',
      '熱油爆香蒜片',
      '加入高麗菜大火快炒',
      '加鹽調味即可'
    ]
  },
  {
    id: '5',
    name: '三杯雞',
    ingredients: ['雞肉', '九層塔', '蒜頭', '薑'],
    description: '台灣經典料理，香氣撲鼻',
    steps: [
      '雞肉切塊，薑蒜切片',
      '熱油爆香薑蒜',
      '加入雞肉炒至變色',
      '加醬油、米酒、麻油燜煮',
      '起鍋前加入九層塔'
    ]
  },
  {
    id: '6',
    name: '蔥爆牛肉',
    ingredients: ['牛肉', '蔥'],
    description: '快炒經典，嫩滑可口',
    steps: [
      '牛肉切片醃製，蔥切段',
      '熱油快炒牛肉至變色',
      '加入蔥段拌炒',
      '調味後即可起鍋'
    ]
  },
  {
    id: '7',
    name: '薑絲炒大腸',
    ingredients: ['大腸', '薑'],
    description: '下酒好菜，薑香四溢',
    steps: [
      '大腸清洗切段，薑切絲',
      '大腸汆燙去腥',
      '熱油爆香薑絲',
      '加入大腸炒香調味'
    ]
  },
  {
    id: '8',
    name: '蛤蜊絲瓜',
    ingredients: ['絲瓜', '蛤蜊', '薑'],
    description: '湯鮮味美，清爽解膩',
    steps: [
      '絲瓜削皮切塊，蛤蜊吐沙',
      '薑片爆香',
      '加入絲瓜拌炒',
      '加水和蛤蜊煮至開口'
    ]
  },
  {
    id: '9',
    name: '麻油雞',
    ingredients: ['雞肉', '薑', '麻油'],
    description: '冬季進補聖品，暖身驅寒',
    steps: [
      '雞肉切塊，薑切片',
      '麻油爆香薑片',
      '加入雞肉炒至變色',
      '加米酒和水燜煮'
    ]
  },
  {
    id: '10',
    name: '洋蔥炒蛋',
    ingredients: ['洋蔥', '雞蛋'],
    description: '甜味十足，營養豐富',
    steps: [
      '洋蔥切絲，雞蛋打散',
      '熱油炒洋蔥至透明',
      '倒入蛋液',
      '炒至蛋液凝固即可'
    ]
  },
  {
    id: '11',
    name: '蒜泥白肉',
    ingredients: ['豬肉', '蒜頭', '小黃瓜'],
    description: '夏日涼菜，清爽不膩',
    steps: [
      '豬肉煮熟放涼切片',
      '蒜頭搗成泥',
      '小黃瓜切絲墊底',
      '淋上蒜泥醬油'
    ]
  },
  {
    id: '12',
    name: '菜脯蛋',
    ingredients: ['蘿蔔乾', '雞蛋'],
    description: '台式經典，鹹香下飯',
    steps: [
      '菜脯切末泡水去鹹',
      '雞蛋打散加入菜脯',
      '熱油鍋倒入蛋液',
      '煎至兩面金黃'
    ]
  }
];

export function findRecipesByIngredients(ingredientNames: string[]): Recipe[] {
  const matches: { recipe: Recipe; score: number }[] = [];

  taiwaneseRecipes.forEach(recipe => {
    let score = 0;
    recipe.ingredients.forEach(recipeIngredient => {
      if (ingredientNames.some(name =>
        name.includes(recipeIngredient) || recipeIngredient.includes(name)
      )) {
        score++;
      }
    });

    if (score > 0) {
      matches.push({ recipe, score });
    }
  });

  matches.sort((a, b) => b.score - a.score);

  return matches.slice(0, 3).map(m => m.recipe);
}
