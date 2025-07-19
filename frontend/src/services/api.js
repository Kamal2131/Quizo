const API_BASE_URL = "/api"

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        return await response.json()
      }

      return await response.text()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Quiz endpoints
  async getQuizzes() {
    return this.request("/quizzes")
  }

  async getQuiz(id) {
    return this.request(`/quizzes/${id}`)
  }

  async createQuiz(quizData) {
    return this.request("/quizzes", {
      method: "POST",
      body: quizData,
    })
  }

  async updateQuiz(id, quizData) {
    return this.request(`/quizzes/${id}`, {
      method: "PUT",
      body: quizData,
    })
  }

  async deleteQuiz(id) {
    return this.request(`/quizzes/${id}`, {
      method: "DELETE",
    })
  }

  // Quiz attempt endpoints
  async submitQuizAttempt(quizId, answers) {
    return this.request(`/quizzes/${quizId}/attempts`, {
      method: "POST",
      body: { answers },
    })
  }

  async getQuizResults(attemptId) {
    return this.request(`/quiz-attempts/${attemptId}/results`)
  }

  // Leaderboard endpoints
  async getLeaderboard() {
    return this.request("/leaderboard")
  }

  // User endpoints
  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: credentials,
    })
  }

  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: userData,
    })
  }

  async getCurrentUser() {
    return this.request("/auth/me")
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    })
  }
}

export const apiService = new ApiService()