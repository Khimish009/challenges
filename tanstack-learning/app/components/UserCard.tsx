import type { User } from "../types"

export const UserCard = ({
    user,
    updateUser
}: {
    user: User,
    updateUser: ({ newTitle, userId }: {
        newTitle: string; userId: number;
    }) => void
}) => (
    <div
        key={user.id}
        onClick={() => updateUser({ newTitle: "User " + Math.floor(Math.random() * 1000), userId: user.id })}
        className="group p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all duration-200"
    >
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {user.name}
                </h3>
                <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                Click to edit
            </div>
        </div>
    </div>
)