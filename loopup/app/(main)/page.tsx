import { products } from '../_lib/dummy-data'
import ProductCard from '../_components/ui/ProductCard'

export default function HomePage(){
  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">Featured Items</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
