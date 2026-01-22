class AppConfig {
	private readonly baseUrl = import.meta.env.VITE_API_URL;
	
	// Normal API calls (fast)
	public readonly productsUrl = this.baseUrl + "products";
	
	// Testing API calls with delay (slow) 
	// public readonly productsUrl = this.baseUrl + "products?delay=2000"; // 2 second delay for testing loader
}

export const appConfig = new AppConfig();