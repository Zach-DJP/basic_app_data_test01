import { useEffect, useState } from 'react';
import { Refrigerator, Sparkles, Camera, AlertCircle } from 'lucide-react';
import { supabase } from './lib/supabase';
import { IngredientForm } from './components/IngredientForm';
import { IngredientList } from './components/IngredientList';
import { RecipeModal } from './components/RecipeModal';
import { calculateFreshness } from './utils/ingredientHelpers';
import { findRecipesByIngredients } from './data/recipes';
import type { Recipe } from './data/recipes';

interface Ingredient {
  id: string;
  name: string;
  purchase_date: string;
  created_at: string;
}

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[]>([]);
  const [showScanMessage, setShowScanMessage] = useState(false);

  useEffect(() => {
    fetchIngredients();
  }, []);

  async function fetchIngredients() {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .order('purchase_date', { ascending: false });

      if (error) throw error;
      setIngredients(data || []);
    } catch (err) {
      setError('無法載入食材清單');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddIngredient(name: string, purchaseDate: string) {
    try {
      const { error } = await supabase
        .from('ingredients')
        .insert([{ name, purchase_date: purchaseDate }]);

      if (error) throw error;
      await fetchIngredients();
    } catch (err) {
      console.error('Failed to add ingredient:', err);
      alert('新增食材失敗，請稍後再試');
    }
  }

  async function handleDeleteIngredient(id: string) {
    try {
      const { error } = await supabase
        .from('ingredients')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchIngredients();
    } catch (err) {
      console.error('Failed to delete ingredient:', err);
      alert('刪除食材失敗，請稍後再試');
    }
  }

  function handleFindRecipes() {
    const expiringIngredients = ingredients.filter(ingredient => {
      const freshness = calculateFreshness(ingredient.purchase_date);
      return freshness.status === 'expiring-soon' || freshness.status === 'expired';
    });

    if (expiringIngredients.length === 0) {
      alert('目前沒有快過期的食材！所有食材都很新鮮 👍');
      return;
    }

    const ingredientNames = expiringIngredients.map(i => i.name);
    const recipes = findRecipesByIngredients(ingredientNames);
    setSuggestedRecipes(recipes);
    setIsRecipeModalOpen(true);
  }

  function handleScanReceipt() {
    setShowScanMessage(true);
    setTimeout(() => setShowScanMessage(false), 3000);
  }

  const expiringCount = ingredients.filter(ingredient => {
    const freshness = calculateFreshness(ingredient.purchase_date);
    return freshness.status === 'expiring-soon' || freshness.status === 'expired';
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#FF8C00] to-[#FF6B00] rounded-2xl shadow-lg">
              <Refrigerator size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF8C00] to-[#4CAF50] bg-clip-text text-transparent">
              冰箱救星
            </h1>
          </div>
          <p className="text-gray-600">智慧管理你的食材，減少食物浪費</p>
        </header>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="text-red-500" size={24} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleFindRecipes}
            disabled={ingredients.length === 0}
            className="bg-gradient-to-r from-[#FF8C00] to-[#FF6B00] hover:from-[#E67E00] hover:to-[#E65C00] text-white font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
          >
            <Sparkles size={24} />
            <div className="text-left">
              <div className="text-lg">救救我的剩食</div>
              {expiringCount > 0 && (
                <div className="text-xs opacity-90">
                  {expiringCount} 項食材需要處理
                </div>
              )}
            </div>
          </button>

          <button
            onClick={handleScanReceipt}
            className="bg-gradient-to-r from-[#4CAF50] to-[#45A049] hover:from-[#45A049] hover:to-[#3D8B40] text-white font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-3"
          >
            <Camera size={24} />
            <span className="text-lg">相機掃描發票</span>
          </button>
        </div>

        {showScanMessage && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6 text-center animate-pulse">
            <p className="text-blue-700 font-medium">
              掃描功能開發中，敬請期待！
            </p>
          </div>
        )}

        <IngredientForm onAdd={handleAddIngredient} />

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            我的食材清單
            {ingredients.length > 0 && (
              <span className="ml-2 text-lg text-gray-500">
                ({ingredients.length} 項)
              </span>
            )}
          </h2>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF8C00] border-t-transparent mx-auto"></div>
            <p className="text-gray-500 mt-4">載入中...</p>
          </div>
        ) : (
          <IngredientList
            ingredients={ingredients}
            onDelete={handleDeleteIngredient}
          />
        )}

        <RecipeModal
          isOpen={isRecipeModalOpen}
          onClose={() => setIsRecipeModalOpen(false)}
          recipes={suggestedRecipes}
        />
      </div>

      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>用心管理食材，珍惜每一份食物</p>
      </footer>
    </div>
  );
}

export default App;
