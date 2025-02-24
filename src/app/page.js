"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNews, addNews, setCategory } from '../store/newsSlice';
import socket from '../utils/socket';
import axios from 'axios';
import NewsItem from '../components/NewsItem';

const categories = ['Technology', 'Business', 'Sports', 'Entertainment'];

export default function Home() {
  const dispatch = useDispatch();
  const { news, category } = useSelector((state) => state.news);

  // Fetch Initial Trending News
  const fetchNews = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/news/trending?category=${category}`
      );
      dispatch(setNews(data));
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();

    // Subscribe to the category for real-time updates
    socket.emit('subscribe', category);
    socket.on('newNews', (newNews) => {
      dispatch(addNews(newNews));
    });

    return () => {
      socket.off('newNews');
    };
  }, [category, dispatch]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          📰 Real-Time News Feed
        </h1>

        {/* Category Navigation */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                category === cat 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
              onClick={() => dispatch(setCategory(cat))}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Feed Section */}
        <div className="relative">
          {news.length === 0 ? (
            <div className="text-center p-8 bg-gray-800 rounded-lg">
              <p className="text-xl text-gray-400">No news available in "{category}" category.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              {news.map((item) => (
                <div key={item._id} className="transform hover:scale-[1.02] transition-transform duration-200">
                  <NewsItem news={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
