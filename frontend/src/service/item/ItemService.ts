import { IApiService, ApiService } from "../apiService";
import { Item } from "../../types/Item";

export class ItemService {
  private apiService: IApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async createItem(item: Item.Add): Promise<string> {
    const userString = localStorage.getItem("user");
    const userStored = userString ? JSON.parse(userString) : null;

    return this.apiService.post("/items", item, {
      headers: {
        Authorization: `Bearer ${userStored.token}`,
      },
    });
  }

  async updateItem(item: Item.Entity): Promise<string> {
    const userString = localStorage.getItem("user");
    const userStored = userString ? JSON.parse(userString) : null;

    return this.apiService.put(`/items/${item.id}`, item, {
      headers: {
        Authorization: `Bearer ${userStored.token}`,
      },
    });
  }

  async deleteItem(itemId: string): Promise<string> {
    const userString = localStorage.getItem("user");
    const userStored = userString ? JSON.parse(userString) : null;

    return this.apiService.delete(`/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${userStored.token}`,
      },
    });
  }

  async getItemById(itemId: string): Promise<Item.Entity> {
    const userString = localStorage.getItem("user");
    const userStored = userString ? JSON.parse(userString) : null;

    return this.apiService.get(`/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${userStored.token}`,
      },
    });
  }

  async getAllItems(): Promise<any> {
    const userString = localStorage.getItem("user");
    const userStored = userString ? JSON.parse(userString) : null;

    const response: any = this.apiService.get(`/items`, {
      headers: {
        Authorization: `Bearer ${userStored.token}`,
      },
    });

    return response;
  }
}

export const itemService = new ItemService();
