"use client";

import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchUsers } from "../store/slices/usersSlice";
import { useEffect, useState } from "react";
import { Mail, Building, Search, Loader2 } from "lucide-react";

const UserList = ({ setSelectedUserId }: { setSelectedUserId: (id: number) => void }) => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 4;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = currentPage * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);
  
  const hasMore = startIndex + usersPerPage < filteredUsers.length;
  const hasPrevious = currentPage > 0;

  return (
    <div className="space-y-4">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(0);
          }}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-900 rounded-lg border border-gray-800 outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-300 placeholder-gray-500 transition-all text-sm"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-20">
          <Loader2 className="animate-spin text-blue-500" size={24} />
        </div>
      ) : error ? (
        <div className="text-red-400 font-medium">Error: {error}</div>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 bg-gray-900 rounded-lg hover:bg-gray-800 cursor-pointer duration-200 animate-fade-in hover:scale-105 transform transition-all ease-in-out shadow-lg hover:shadow-xl border border-gray-800"
                onClick={() => setSelectedUserId(user.id)}
              >
                <h3 className="font-semibold text-base text-gray-200 break-words">{user.name}</h3>
                <div className="space-y-1.5 mt-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail className="shrink-0 text-gray-500" size={14} />
                    <p className="text-sm break-all">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Building className="shrink-0 text-gray-500" size={14} />
                    <p className="text-sm break-words">{user.company.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex gap-2">
            {hasPrevious && (
              <button
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="flex-1 py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors text-sm font-medium"
              >
                Previous
              </button>
            )}
            {hasMore && (
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="flex-1 py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors text-sm font-medium"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;