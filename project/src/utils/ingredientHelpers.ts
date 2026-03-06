export type FreshnessStatus = 'fresh' | 'expiring-soon' | 'expired';

export interface FreshnessInfo {
  status: FreshnessStatus;
  daysOld: number;
  color: string;
  bgColor: string;
  label: string;
}

export function calculateFreshness(purchaseDate: string): FreshnessInfo {
  const purchase = new Date(purchaseDate);
  const today = new Date();
  const diffTime = today.getTime() - purchase.getTime();
  const daysOld = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (daysOld <= 7) {
    return {
      status: 'fresh',
      daysOld,
      color: '#4CAF50',
      bgColor: 'bg-green-50',
      label: '新鮮'
    };
  } else if (daysOld <= 10) {
    return {
      status: 'expiring-soon',
      daysOld,
      color: '#FF8C00',
      bgColor: 'bg-orange-50',
      label: '快過期'
    };
  } else {
    return {
      status: 'expired',
      daysOld,
      color: '#EF4444',
      bgColor: 'bg-red-50',
      label: '已過期'
    };
  }
}
