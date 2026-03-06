import { useState } from 'react';
import { Plus } from 'lucide-react';

interface IngredientFormProps {
  onAdd: (name: string, purchaseDate: string) => Promise<void>;
}

export function IngredientForm({ onAdd }: IngredientFormProps) {
  const [name, setName] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await onAdd(name.trim(), purchaseDate);
      setName('');
      setPurchaseDate(new Date().toISOString().split('T')[0]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4" style={{ color: '#FF8C00' }}>
        新增食材
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            食材名稱
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例如：雞蛋、牛奶、高麗菜"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF8C00] focus:outline-none transition-colors"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            購買日期
          </label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF8C00] focus:outline-none transition-colors"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !name.trim()}
          className="w-full bg-[#FF8C00] hover:bg-[#E67E00] text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          {isSubmitting ? '新增中...' : '新增食材'}
        </button>
      </div>
    </form>
  );
}
