import { DollarSign, Users, ShoppingBag } from 'lucide-react';
import StatsCard from './components/StatsCard';

const stats = [
  { title: 'Gelir', value: '₺24.500', change: 12.5, icon: DollarSign, gradient: 'from-emerald-500 to-teal-500' },
  { title: 'Kullanıcılar', value: '1.240', change: 8.2, icon: Users, gradient: 'from-blue-500 to-indigo-500' },
  { title: 'Siparişler', value: '320', change: -3.1, icon: ShoppingBag, gradient: 'from-pink-500 to-rose-500' },
];

export default function App() {
  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-white">Kontrol Paneli</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>
    </main>
  );
}
