import ProductCard from '@/components/ProductCard';
import CategoriesBar from '@/components/CategoriesBar';
import HeroCarousel from '@/components/HeroCarousel';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic'; // Ensures realtime DB fetch when search/category changes

export default async function Home(props) {
  const searchParams = await props.searchParams;
  const { search, category } = searchParams;

  let products = [];
  try {
    let sql = 'SELECT * FROM products';
    const params = [];
    const conditions = [];

    if (search) {
      conditions.push(`name ILIKE $${params.length + 1}`);
      params.push(`%${search}%`);
    }
    if (category) {
      conditions.push(`category = $${params.length + 1}`);
      params.push(category);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    
    sql += ' ORDER BY id DESC';

    const { rows } = await query(sql, params);
    products = rows;
  } catch (e) {
    console.error("Failed to fetch products directly from DB", e);
  }

  // To simulate the 'Add to your wishlist' section, pick first 4 items
  const wishlistSuggestions = products.slice(0, 4);

  return (
    <div className="flex flex-col bg-[#f1f3f6]">
      {!search && <CategoriesBar />}
      {!search && <HeroCarousel />}

      <div className="w-full max-w-[1248px] mx-auto mt-4 px-2 md:px-0">
        
        {/* Wishlist Suggestion Block (Only when not searching) */}
        {!search && !category && wishlistSuggestions.length > 0 && (
          <div className="w-full bg-[#d5f3e6] p-4 rounded-sm shadow-sm mb-4">
            <h2 className="text-[22px] font-medium text-[#212121] mb-4">Add to your wishlist</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wishlistSuggestions.map(product => (
                <ProductCard key={`wishlist-${product.id}`} product={product} />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-2 mt-2">
          {/* Main Content Area */}
          <div className="flex-1 bg-white shadow-sm p-4 min-h-[500px]">
            {(search || category) && (
              <h2 className="text-[16px] mb-4 font-medium border-b pb-2">
                Showing results {search && `for "${search}"`} {category && `in category "${category}"`}
              </h2>
            )}
            
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="No results" className="w-[300px] mb-4" />
                <h3 className="text-[20px] font-medium text-[#212121]">Sorry, no results found!</h3>
                <p className="text-[#878787] mt-2 text-[14px]">Please check the spelling or try searching for something else</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map(product => (
                  <ProductCard key={`main-${product.id}`} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}