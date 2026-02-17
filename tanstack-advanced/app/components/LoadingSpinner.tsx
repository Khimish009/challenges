export const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
            </div>
            <p className="text-sm text-gray-500 animate-pulse">Loading posts...</p>
        </div>
    )
}
