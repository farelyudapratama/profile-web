<script setup lang="ts"></script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="error-code">404</h1>
      <h2 class="error-message">Page Not Found</h2>
      <p class="error-description">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div class="action-buttons">
        <RouterLink to="/" class="btn btn-primary">Go Home</RouterLink>
        <RouterLink to="/about" class="btn btn-secondary">About Me</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
}

.not-found-content {
  text-align: center;
  max-width: 600px;
}

.error-code {
  font-size: 6rem;
  color: #64748b;
  margin-bottom: 1rem;
  font-weight: 700;
}

.error-message {
  font-size: 2.5rem;
  color: #64748b;
  margin-bottom: 1rem;
}

.error-description {
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  border: 1px solid #3b82f6;
}

.btn-primary:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #f8fafc;
  color: #1e293b;
  border: 1px solid #cbd5e1;
}

.btn-secondary:hover {
  background-color: #e2e8f0;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .error-code {
    font-size: 4rem;
  }

  .error-message {
    font-size: 2rem;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>
