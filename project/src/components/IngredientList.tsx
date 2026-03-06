import { Trash2, Calendar } from 'lucide-react';
import { calculateFreshness } from '../utils/ingredientHelpers';

interface Ingredient {
  id: string;
  name: string;
  purchase_date: string;
  created_at: string;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  onDelete: (id: string) => Promise<void>;
}

export function IngredientList({ ingredients, onDelete }: IngredientListProps) {
  if (ingredients.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <p className="text-gray-400 text-lg">尚未新增任何食材</p>
        <p className="text-gray-300 text-sm mt-2">開始新增食材來管理你的冰箱吧！</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {ingredients.map((ingredient) => {
        const freshness = calculateFreshness(ingredient.purchase_date);
        const purchaseDate = new Date(ingredient.purchase_date);
        const formattedDate = purchaseDate.toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });

        return (
          <div
            key={ingredient.id}
            className={`${freshness.bgColor} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border-l-4`}
            style={{ borderLeftColor: freshness.color }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    {ingredient.name}
                  </h3>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: freshness.color }}
                  >
                    {freshness.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={14} />
                  <span>購買於 {formattedDate}</span>
                  <span className="text-gray-400">•</span>
                  <span>{freshness.daysOld} 天前</span>
                </div>
              </div>
              <button
                onClick={() => onDelete(ingredient.id)}
                className="ml-4 p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                aria-label="刪除食材"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
