import { X, ChefHat, UtensilsCrossed } from 'lucide-react';
import type { Recipe } from '../data/recipes';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
}

export function RecipeModal({ isOpen, onClose, recipes }: RecipeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-[#FF8C00] to-[#FF6B00] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChefHat size={32} />
            <h2 className="text-2xl font-bold">AI 食譜建議</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          {recipes.length === 0 ? (
            <div className="text-center py-12">
              <UtensilsCrossed size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">找不到合適的食譜</p>
              <p className="text-gray-400 text-sm mt-2">
                請新增更多食材，或確認食材名稱正確
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-gray-600 mb-4">
                根據你的快過期食材，我們為你推薦以下台式家常菜：
              </p>
              {recipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-[#FF8C00] border-opacity-20"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: '#FF8C00' }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {recipe.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {recipe.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <span
                        className="w-1 h-4 rounded"
                        style={{ backgroundColor: '#4CAF50' }}
                      ></span>
                      所需食材
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recipe.ingredients.map((ingredient, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border-2 border-gray-200"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <span
                        className="w-1 h-4 rounded"
                        style={{ backgroundColor: '#FF8C00' }}
                      ></span>
                      料理步驟
                    </h4>
                    <ol className="space-y-2">
                      {recipe.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-gray-700">
                          <span className="font-bold text-[#FF8C00] min-w-[20px]">
                            {idx + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
