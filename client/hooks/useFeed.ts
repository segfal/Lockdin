/**
 * Feed Hook
 * 
 * Custom hook for handling feed-related functionality.
 * Provides feed post fetching, creation, liking, and commenting.
 */

import { useState, useEffect } from 'react';
import apiService, { FeedPost } from '@/lib/api';
import { dummyNewsFeed } from '@/lib/dummy-data';

interface UseFeedReturn {
  feedPosts: FeedPost[];
  isLoading: boolean;
  error: string | null;
  createPost: (post: Omit<FeedPost, 'id' | 'createdAt'>) => Promise<FeedPost>;
  likePost: (postId: number) => Promise<void>;
  commentOnPost: (postId: number, comment: string) => Promise<void>;
}

export function useFeed(): UseFeedReturn {
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch feed posts on mount
  useEffect(() => {
    const fetchFeedPosts = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, we would call the API
        // const postsData = await apiService.feed.getFeedPosts();
        // setFeedPosts(postsData);
        
        // For development, use dummy data
        setFeedPosts(dummyNewsFeed);
      } catch (err) {
        console.error('Fetch feed posts error:', err);
        setError('Failed to fetch feed posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedPosts();
  }, []);

  const createPost = async (post: Omit<FeedPost, 'id' | 'createdAt'>) => {
    try {
      setIsLoading(true);
      
      // In a real app, we would call the API
      // const newPost = await apiService.feed.createFeedPost(post);
      
      // For development, simulate API call
      const newPost: FeedPost = {
        ...post,
        id: Math.max(0, ...feedPosts.map(p => p.id)) + 1,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0
      };
      
      setFeedPosts(prevPosts => [newPost, ...prevPosts]);
      
      return newPost;
    } catch (err) {
      console.error('Create post error:', err);
      setError('Failed to create post');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const likePost = async (postId: number) => {
    try {
      setIsLoading(true);
      
      // In a real app, we would call the API
      // await apiService.feed.likePost(postId);
      
      // For development, simulate API call
      setFeedPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, likes: (post.likes || 0) + 1 } 
            : post
        )
      );
    } catch (err) {
      console.error(`Like post ${postId} error:`, err);
      setError('Failed to like post');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const commentOnPost = async (postId: number, comment: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, we would call the API
      // await apiService.feed.commentOnPost(postId, comment);
      
      // For development, simulate API call
      setFeedPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, comments: (post.comments || 0) + 1 } 
            : post
        )
      );
    } catch (err) {
      console.error(`Comment on post ${postId} error:`, err);
      setError('Failed to comment on post');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    feedPosts,
    isLoading,
    error,
    createPost,
    likePost,
    commentOnPost
  };
}

export default useFeed; 