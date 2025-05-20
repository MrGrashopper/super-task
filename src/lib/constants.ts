export const getStatusClass = (status: string): string => {
  switch (status) {
    case "Open":
      return "bg-blue-100 text-blue-800";
    case "InProgress":
      return "bg-yellow-100 text-yellow-800";
    case "Done":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
