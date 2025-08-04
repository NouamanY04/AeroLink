export function getStableAvatarColor(username) {
    const key = `avatarColor_${username}`;
    let color = localStorage.getItem(key);
    if (!color) {
        const avatarColors = [
            'from-blue-500 to-blue-600',
            'from-red-500 to-red-600',
            'from-yellow-400 to-yellow-500',
            'from-green-500 to-green-600',
            'from-purple-500 to-purple-600',
            'from-pink-500 to-pink-600',
            'from-teal-500 to-teal-600',
            'from-indigo-500 to-indigo-600'
        ];
        color = avatarColors[Math.floor(Math.random() * avatarColors.length)];
        localStorage.setItem(key, color);
    }
    return color;
}
