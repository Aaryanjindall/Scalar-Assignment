"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Store, TrendingUp, ShieldCheck, HeartHandshake, UploadCloud, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BecomeSeller() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    stock: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock) || 10,
          specs: { Brand: 'Seller Added' }
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', description: '', price: '', category: 'Electronics', stock: '', image_url: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert(data.error || 'Failed to add product');
      }
    } catch (err) {
      alert('Error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header specific for Seller */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/')} className="hover:bg-gray-100 p-2 rounded-full transition-colors group">
              <ArrowLeft className="text-gray-600 group-hover:text-black" />
            </button>
            <div className="flex items-center gap-2">
              <Store className="text-fk-blue" size={28} />
              <span className="font-bold text-xl tracking-tight text-gray-900">Seller Hub</span>
            </div>
          </div>
          <Link href="/" className="text-sm font-medium text-fk-blue hover:underline">
            Go back to Flipkart
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#003B95] to-[#1464F4] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-sm">
              Sell Online with Flipkart <br /> <span className="text-fk-yellow drop-shadow-sm">Grow your business!</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-xl">
              Join India's leading e-commerce platform and reach millions of customers instantly. Start selling your products today.
            </p>
          </div>
          <div className="flex-1 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">Add a New Product</h2>
              <p className="text-sm text-gray-500">List your item instantly on the marketplace.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {success && (
                <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm font-medium border border-green-200">
                  🎉 Product added successfully! It is now live on the main page.
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border-gray-300 border px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-fk-blue focus:border-transparent outline-none transition-all text-gray-900 bg-gray-50 focus:bg-white" placeholder="e.g. Sony Headphones" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border-gray-300 border px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-fk-blue focus:border-transparent outline-none transition-all text-gray-900 bg-gray-50 focus:bg-white" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full border-gray-300 border px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-fk-blue focus:border-transparent outline-none transition-all text-gray-900 bg-gray-50 focus:bg-white">
                    <option>Mobiles</option>
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Home</option>
                    <option>Beauty</option>
                    <option>Appliances</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full border-gray-300 border px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-fk-blue focus:border-transparent outline-none transition-all text-gray-900 bg-gray-50 focus:bg-white" placeholder="https://..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full border-gray-300 border px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-fk-blue focus:border-transparent outline-none transition-all text-gray-900 bg-gray-50 focus:bg-white h-24 resize-none" placeholder="Describe your product..."></textarea>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-fk-orange hover:bg-[#ff5500] text-white py-3.5 rounded-lg font-bold shadow-lg shadow-orange-500/30 transition-all flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? 'Adding Product...' : <><UploadCloud size={20} className="group-hover:-translate-y-1 transition-transform" /> Publish Product</>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 w-full">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Sell with Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow text-center group">
             <div className="w-16 h-16 bg-blue-50 text-fk-blue rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
               <TrendingUp size={32} />
             </div>
             <h3 className="text-xl font-bold mb-3 text-gray-900">Reach Millions</h3>
             <p className="text-gray-500">Tap into India's largest customer base and watch your daily orders skyrocket from day one.</p>
           </div>
           
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow text-center group">
             <div className="w-16 h-16 bg-orange-50 text-fk-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
               <ShieldCheck size={32} />
             </div>
             <h3 className="text-xl font-bold mb-3 text-gray-900">Secure Payments</h3>
             <p className="text-gray-500">Enjoy safe, regular, and timely payments directly credited to your bank account.</p>
           </div>
           
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow text-center group">
             <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
               <HeartHandshake size={32} />
             </div>
             <h3 className="text-xl font-bold mb-3 text-gray-900">Dedicated Support</h3>
             <p className="text-gray-500">Access our seller portal and dedicated account managers to help you grow your business effortlessly.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
