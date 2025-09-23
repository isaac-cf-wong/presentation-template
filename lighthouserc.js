module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:8000"],
      startServerCommand: "npm run serve",
      startServerReadyPattern: "Production server started",
      startServerReadyTimeout: 30000,
      numberOfRuns: 3,
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "categories:performance": ["warn", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.8 }],
        "categories:seo": ["warn", { minScore: 0.8 }],
        // Allow some flexibility for presentation templates
        "unused-css-rules": "off",
        "unused-javascript": "off",
        "render-blocking-resources": "off",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
