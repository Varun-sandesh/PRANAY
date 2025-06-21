import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Share2, Flag, Plus, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  replies: number;
  tags: string[];
  isLiked: boolean;
}

const Community: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const tags = ['all', 'anxiety', 'depression', 'stress', 'self-care', 'motivation', 'support'];

  useEffect(() => {
    // Load mock posts
    const mockPosts: Post[] = [
      {
        id: '1',
        content: 'Just wanted to share that I completed my first week of daily meditation. Small steps, but feeling more centered already. 🧘‍♀️',
        author: 'Anonymous User',
        timestamp: '2 hours ago',
        likes: 12,
        replies: 3,
        tags: ['meditation', 'self-care'],
        isLiked: false
      },
      {
        id: '2',
        content: 'Having a tough day with anxiety. Trying to remember that this feeling is temporary and I will get through it. Sending love to anyone else struggling today. 💙',
        author: 'Anonymous User',
        timestamp: '4 hours ago',
        likes: 28,
        replies: 8,
        tags: ['anxiety', 'support'],
        isLiked: true
      },
      {
        id: '3',
        content: 'Therapist recommended the 5-4-3-2-1 grounding technique and it really helped during my panic attack yesterday. Sharing in case it helps someone else!',
        author: 'Anonymous User',
        timestamp: '1 day ago',
        likes: 45,
        replies: 12,
        tags: ['anxiety', 'coping-strategies'],
        isLiked: false
      }
    ];

    setPosts(mockPosts);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    ));
  };

  const handleNewPost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      content: newPost,
      author: user?.name || 'Anonymous User',
      timestamp: 'Just now',
      likes: 0,
      replies: 0,
      tags: ['support'],
      isLiked: false
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setShowNewPostForm(false);
  };

  const filteredPosts = selectedTag === 'all' 
    ? posts 
    : posts.filter(post => post.tags.includes(selectedTag));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-blue-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
            Community Support
          </h1>
          <p className="text-indigo-600 dark:text-indigo-300">
            A safe space to share experiences and support each other
          </p>
        </div>

        {/* Community Guidelines */}
        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Community Guidelines</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Be kind and respectful to all members</li>
            <li>• Share experiences, not medical advice</li>
            <li>• Use content warnings for sensitive topics</li>
            <li>• Report inappropriate content</li>
          </ul>
        </div>

        {/* New Post Button */}
        {user && (
          <div className="mb-6">
            <button
              onClick={() => setShowNewPostForm(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Share Your Experience
            </button>
          </div>
        )}

        {/* New Post Form */}
        {showNewPostForm && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-200 mb-4">
              Share with the community
            </h3>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts, experiences, or words of encouragement..."
              className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowNewPostForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleNewPost}
                disabled={!newPost.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Share
              </button>
            </div>
          </div>
        )}

        {/* Filter Tags */}
        <div className="flex items-center space-x-2 mb-6 overflow-x-auto">
          <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tag === 'all' ? 'All Posts' : `#${tag}`}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No posts found for this category.</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      {post.author}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {post.timestamp}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Flag className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {post.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      post.isLiked 
                        ? 'text-red-500' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{post.likes}</span>
                  </button>

                  <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{post.replies}</span>
                  </button>

                  <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;