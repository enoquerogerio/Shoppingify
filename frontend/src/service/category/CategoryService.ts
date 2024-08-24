import { IApiService, ApiService } from "../apiService";
import { Category } from "../../types/Category";

export class CategoryService {
  private apiService: IApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async createCategory(category: Category.Add): Promise<string> {
    const userString = localStorage.getItem("user");
    const userStored = userString ? JSON.parse(userString) : null;

    return this.apiService.post("/categories", category, {
      headers: {
        Authorization: `Bearer ${userStored.token}`,
      },
    });
  }

  async updateCategory(category: Category.Entity): Promise<string> {
    const userString = localStorage.getItem("user");
    const userStored = userString ? JSON.parse(userString) : null;

    return this.apiService.put(`/categories/${category.id}`, category, {
      headers: {
        Authorization: `Bearer ${userStored.token}`,
      },
    });
  }

  async deteleCategory(categoryId: string): Promise<string> {
    const userString = localStorage.getItem("user");
    const userStored = userString ? JSON.parse(userString) : null;

    return this.apiService.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${userStored.token}`,
      },
    });
  }

  async getCategory(categoryId: string): Promise<Category.Entity> {
    const userString = localStorage.getItem("user");
    const userStored = userString ? JSON.parse(userString) : null;

    return this.apiService.get(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${userStored.token}`,
      },
    });
  }

  async getAllCategories(): Promise<Category.Entity[]> {
    const userString = localStorage.getItem("user");
    const userStored = userString ? JSON.parse(userString) : null;

    return this.apiService.get(`/categories`, {
      headers: {
        Authorization: `Bearer ${userStored.token}`,
      },
    });
  }
}

export const categoryService = new CategoryService();
