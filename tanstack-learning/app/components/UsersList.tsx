"use client"

import { useUsers } from "../hooks/useUsers"
import { UserCard } from "./UserCard"

export const UsersList = () => {
    const {
        users,
        isLoading,
        isError,
        error,
        isUpdating,
        isProcessing,
        updateUser,
        refetchUsers
    } = useUsers()

    if (isLoading) return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-xl font-medium animate-pulse text-gray-500">Loading users...</div>
        </div>
    )

    if (isError) return (
        <div className="p-4 rounded-md bg-red-50 text-red-600 border border-red-200">
            Error: {error?.message}
        </div>
    )

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Users List</h2>
                <button
                    onClick={refetchUsers}
                    disabled={isProcessing}
                    className={`
                        px-4 py-2 rounded-lg font-medium transition-all duration-200
                        ${isProcessing
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95"
                        }
                    `}
                >
                    {isUpdating ? "Refreshing..." : "Update List"}
                </button>
            </div>

            <div className={`grid gap-4 transition-opacity duration-200 ${isUpdating ? "opacity-50 pointer-events-none" : ""}`}>
                {users?.map((user) => <UserCard key={user.id} user={user} updateUser={updateUser} />)}
            </div>
        </div>
    )
}