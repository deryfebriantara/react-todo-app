const API_URL = 'http://localhost:5000';

class ApiService {
  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  async login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    this.setToken(data.access_token);
    return data;
  }

  async getTodos() {
    const response = await fetch(`${API_URL}/todos`, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 422) {
        this.clearToken();
        throw new Error('Unauthorized');
      }
      throw new Error('Failed to fetch todos');
    }

    return response.json();
  }

  async createTodo(text) {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 422) {
        this.clearToken();
        throw new Error('Unauthorized');
      }
      throw new Error('Failed to create todo');
    }

    return response.json();
  }

  async updateTodo(id, updates) {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 422) {
        this.clearToken();
        throw new Error('Unauthorized');
      }
      throw new Error('Failed to update todo');
    }

    return response.json();
  }

  async deleteTodo(id) {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 422) {
        this.clearToken();
        throw new Error('Unauthorized');
      }
      throw new Error('Failed to delete todo');
    }

    return response.json();
  }
}

export default new ApiService();
