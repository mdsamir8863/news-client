export default function NewsItem({ news }) {
    return (
      <div className="p-4 bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-white">{news.title}</h2>
        <p className="text-gray-300">{news.content}</p>
        <p className="mt-2 text-sm text-gray-400">
          📚 {news.category} | 👀 {news.views} Views | 👍 {news.likes} Likes
        </p>
      </div>
    );
  }
  