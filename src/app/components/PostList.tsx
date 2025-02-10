// PostList.tsx
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchPostsByUserId } from "../store/slices/postsSlice";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";

const PostList = ({ userId }: { userId: number }) => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
    dispatch(fetchPostsByUserId(userId));
  }, [dispatch, userId]);

  if (loading)
    return (
      <div className="space-y-4 sm:space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 sm:h-40 bg-gray-800 rounded-xl animate-pulse" />
        ))}
      </div>
    );

  if (error) return <div className="text-red-400 font-medium">Error: {error}</div>;

  return (
    <div className="space-y-4 sm:space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="p-4 sm:p-6 bg-gray-800 rounded-xl hover:bg-gray-750 transition duration-200">
          <div className="flex items-start sm:items-center gap-3 mb-3 sm:mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
              <FileText size={20} className="text-blue-400" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg text-gray-200">{post.title}</h3>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
            {expandedPostId === post.id ? post.body : `${post.body.slice(0, 100)}...`}
          </p>
          {post.body.length > 100 && (
            <button
              className="mt-3 sm:mt-4 text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-medium transition-colors"
              onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
            >
              {expandedPostId === post.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {expandedPostId === post.id ? "Show Less" : "Read More"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;