export function formatUser(user) {
  return {
    name: user.displayName || user.name,
    email: user.email,
    avatar: `https://i.pravatar.cc/100?u=${user.uid}`,
    userID: user.uid || user.userID,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous,
    createdAt: user.createdAt || user.reloadUserInfo.createdAt,
    userToken: user.accessToken,
    message: "",
  };
}

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(
    new Date(date instanceof Date ? date : date.toDate().toLocaleString())
  );
