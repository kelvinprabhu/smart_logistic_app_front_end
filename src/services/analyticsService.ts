const base_url = 'http://localhost:8081'; // Replace with your actual base URL

export const fetchAnalyticsData = async (endpoint: string) => {
  const response = await fetch(`${base_url}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`);
  }
  return response.json();
};
