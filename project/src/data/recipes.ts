export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  style: '台式經典' | '日韓風味' | '異國西式' | '東南亞酸辣';
  requiredSpices: string[];
  description: string;
  steps: string[];
}

export const recipes: Recipe[] = [
  {
    id: '1',
    name: '番茄炒蛋',
    ingredients: ['雞蛋', '番茄', '蔥'],
    style: '台式經典',
    requiredSpices: ['醬油', '鹽'],
    description: '經典台式家常菜，酸甜開胃',
    steps: ['番茄切塊，雞蛋打散', '熱油鍋炒蛋盛起', '炒番茄至軟爛，加入雞蛋', '調味即可']
  },
  {
    id: '2',
    name: '韓式泡菜炒肉',
    ingredients: ['豬肉', '泡菜', '洋蔥'],
    style: '日韓風味',
    requiredSpices: ['辣醬', '醬油'],
    description: '濃郁下飯，適合上班族快速料理',
    steps: ['豬肉與洋蔥切片', '炒香豬肉', '加入泡菜與洋蔥拌炒', '以辣醬調味即可']
  },
  {
    id: '3',
    name: '義式番茄雞肉燉飯',
    ingredients: ['雞肉', '番茄', '洋蔥'],
    style: '異國西式',
    requiredSpices: ['橄欖油', '起司'],
    description: '西式風味，健康又滿足',
    steps: ['雞肉切塊，番茄洋蔥切丁', '橄欖油爆香洋蔥', '炒香雞肉與番茄', '加入米飯與水燜煮，最後灑上起司']
  },
  {
    id: '4',
    name: '三杯雞',
    ingredients: ['雞肉', '九層塔', '蒜頭', '薑'],
    style: '台式經典',
    requiredSpices: ['醬油'],
    description: '台灣經典料理，香氣撲鼻',
    steps: ['雞肉切塊，薑蒜切片', '熱油爆香薑蒜', '加入雞肉炒至變色', '加醬油燜煮', '起鍋前加入九層塔']
  }
];

export function findRecipesByIngredients(
  ingredientNames: string[], 
  style: string, 
  userSpices: string[]
): Recipe[] {
  return recipes
    .filter(r => r.style === style) // 1. 先篩選風格
    .map(recipe => {
      let score = 0;
      // 2. 計算食材匹配分數 (權重較高)
      recipe.ingredients.forEach(i => {
        if (ingredientNames.some(n => n.includes(i) || i.includes(n))) score += 5;
      });
      
      // 3. 調味料匹配檢查：有的調味料加分，缺少的調味料扣分
      recipe.requiredSpices.forEach(s => {
        if (userSpices.includes(s)) score += 3;
        else score -= 2; 
      });

      return { recipe, score };
    })
    .sort((a, b) => b.score - a.score) // 4. 分數越高越前面
    .map(m => m.recipe)
    .slice(0, 3);
}
