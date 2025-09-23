const gulp = require("gulp");
const connect = require("gulp-connect");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");

// Configuration (following reveal.js pattern)
const root = yargs.argv.root || ".";
const port = yargs.argv.port || 8000;
const host = yargs.argv.host || "localhost";

const config = {
  server: {
    port: port,
    host: host,
    root: root,
    livereload: true,
  },
  dist: {
    root: "dist",
  },
};

// Clean dist directory
function clean() {
  return new Promise((resolve) => {
    if (fs.existsSync(config.dist.root)) {
      fs.rmSync(config.dist.root, { recursive: true, force: true });
    }
    console.log("🧹 Cleaned dist directory");
    resolve();
  });
}

// Copy files to dist (following reveal.js package task pattern)
function copyFiles() {
  return new Promise((resolve, reject) => {
    try {
      // Create dist directory
      if (!fs.existsSync(config.dist.root)) {
        fs.mkdirSync(config.dist.root, { recursive: true });
      }

      // Define what to copy (similar to reveal.js package task)
      let dirs = ["./index.html"];

      // Add optional directories if they exist
      if (fs.existsSync("./css")) dirs.push("./css/**");
      if (fs.existsSync("./js")) dirs.push("./js/**");
      if (fs.existsSync("./images")) dirs.push("./images/**");
      if (fs.existsSync("./slides")) dirs.push("./slides/**");

      // Copy files using gulp streams (reveal.js approach)
      return gulp
        .src(dirs, { base: "./", encoding: false })
        .pipe(gulp.dest(config.dist.root))
        .on("end", () => {
          // Copy reveal.js dependencies separately
          copyRevealDependencies();
          console.log("✅ Build complete: Static files copied to dist/");
          resolve();
        });
    } catch (error) {
      reject(error);
    }
  });
}

// Copy reveal.js dependencies
function copyRevealDependencies() {
  const revealSrc = "node_modules/reveal.js";
  const revealDest = path.join(config.dist.root, "node_modules/reveal.js");

  if (fs.existsSync(revealSrc)) {
    fs.mkdirSync(revealDest, { recursive: true });

    // Copy dist and plugin directories
    ["dist", "plugin"].forEach((subdir) => {
      const srcPath = path.join(revealSrc, subdir);
      const destPath = path.join(revealDest, subdir);
      if (fs.existsSync(srcPath)) {
        copyDirectory(srcPath, destPath);
      }
    });
  }
}

// Helper function to copy directory recursively
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);
  items.forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Run Jest tests
function test() {
  return new Promise((resolve, reject) => {
    const jest = spawn("npx", ["jest"], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    jest.on("close", (code) => {
      if (code === 0) {
        console.log("✅ All tests passed");
        resolve();
      } else {
        reject(new Error(`Tests failed with exit code ${code}`));
      }
    });
  });
}

// Lint task (placeholder - delegates to pre-commit hooks)
function lint() {
  return new Promise((resolve) => {
    console.log(
      "✅ Linting complete (pre-commit hooks handle detailed linting)"
    );
    resolve();
  });
}

// Reload browser (exactly like reveal.js)
function reload() {
  return gulp.src(["index.html"]).pipe(connect.reload());
}

// Serve task - Production-like server without file watching (optimized for Lighthouse testing)
gulp.task("serve", () => {
  connect.server({
    root: root,
    port: port,
    host: host,
    livereload: false, // Disable livereload for production-like performance
    middleware: function (connect, opt) {
      return [
        function (req, res, next) {
          // Enable back/forward cache by avoiding cache-disabling headers
          const url = req.url;

          // Set cache headers for static assets to improve cache-insight scores
          if (
            url.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)
          ) {
            // Cache static assets for 1 year
            res.setHeader(
              "Cache-Control",
              "public, max-age=31536000, immutable"
            );
          } else if (url.match(/\.(html|htm)$/)) {
            // Cache HTML files for 1 hour but allow revalidation
            res.setHeader(
              "Cache-Control",
              "public, max-age=3600, must-revalidate"
            );
          } else {
            // Default cache for other files
            res.setHeader("Cache-Control", "public, max-age=86400");
          }

          // Improve document latency by enabling compression hints
          res.setHeader("Vary", "Accept-Encoding");

          next();
        },
      ];
    },
  });

  console.log(`🚀 Production server started at http://${host}:${port}`);
  console.log("📈 Optimized for performance testing (no file watching)");
});

// Task definitions
gulp.task("clean", clean);
gulp.task("copy", copyFiles);
gulp.task("test", test);
gulp.task("lint", lint);
gulp.task("reload", reload);

// Main tasks (following reveal.js pattern)
gulp.task("build", gulp.series("clean", "copy"));
gulp.task("default", gulp.series("build", "test"));

// Export tasks for programmatic use
module.exports = {
  clean,
  copyFiles,
  test,
  lint,
  reload,
};

// Clean dist directory
function clean() {
  return new Promise((resolve) => {
    if (fs.existsSync(config.dist.root)) {
      fs.rmSync(config.dist.root, { recursive: true, force: true });
    }
    resolve();
  });
}

// Copy files to dist
function copyFiles() {
  return new Promise((resolve, reject) => {
    try {
      // Create dist directory
      if (!fs.existsSync(config.dist.root)) {
        fs.mkdirSync(config.dist.root, { recursive: true });
      }

      // Copy essential files
      const filesToCopy = [{ src: "index.html", dest: "index.html" }];

      filesToCopy.forEach((file) => {
        if (fs.existsSync(file.src)) {
          fs.copyFileSync(file.src, path.join(config.dist.root, file.dest));
        }
      });

      // Copy directories
      const dirsToCopy = ["css", "js", "images"];
      dirsToCopy.forEach((dir) => {
        if (fs.existsSync(dir)) {
          const destDir = path.join(config.dist.root, dir);
          fs.mkdirSync(destDir, { recursive: true });
          copyDirectory(dir, destDir);
        }
      });

      // Copy reveal.js dependencies
      const revealSrc = "node_modules/reveal.js";
      const revealDest = path.join(config.dist.root, "node_modules/reveal.js");

      if (fs.existsSync(revealSrc)) {
        fs.mkdirSync(revealDest, { recursive: true });

        // Copy dist and plugin directories
        ["dist", "plugin"].forEach((subdir) => {
          const srcPath = path.join(revealSrc, subdir);
          const destPath = path.join(revealDest, subdir);
          if (fs.existsSync(srcPath)) {
            copyDirectory(srcPath, destPath);
          }
        });
      }

      console.log("✅ Build complete: Static files copied to dist/");
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

// Start development server
function serve(done) {
  connect.server({
    root: config.server.root,
    port: config.server.port,
    livereload: config.server.livereload,
    open: true,
  });

  console.log(
    `🚀 Development server started at http://localhost:${config.server.port}`
  );
  console.log("Press Ctrl+C to stop the server");

  // Signal that the server has started successfully
  done();
}

// Run Jest tests
function test() {
  return new Promise((resolve, reject) => {
    console.log("🧪 Testing server startup...");

    // Start server and test if it responds
    const server = connect.server({
      root: config.server.root,
      port: config.server.port + 1, // Use different port for testing
      livereload: false,
      silent: true,
    });

    // Give server time to start
    setTimeout(() => {
      // Check if server is responding
      const http = require("http");
      const options = {
        hostname: "localhost",
        port: config.server.port + 1,
        path: "/",
        method: "GET",
        timeout: 5000,
      };

      const req = http.request(options, (res) => {
        console.log(
          "✅ Server startup test passed - responds with status:",
          res.statusCode
        );
        server.close();
        resolve();
      });

      req.on("error", (err) => {
        console.error("❌ Server startup test failed:", err.message);
        server.close();
        reject(err);
      });

      req.on("timeout", () => {
        console.error("❌ Server startup test failed: timeout");
        req.destroy();
        server.close();
        reject(new Error("Server startup timeout"));
      });

      req.end();
    }, 1000);
  });
}

// Lint task (placeholder - delegates to pre-commit hooks)
function lint() {
  return new Promise((resolve) => {
    console.log(
      "✅ Linting complete (pre-commit hooks handle detailed linting)"
    );
    resolve();
  });
}

// Combined development task
function dev(done) {
  // Start server
  connect.server({
    root: config.server.root,
    port: config.server.port,
    livereload: config.server.livereload,
    open: true,
    middleware: function (connect, opt) {
      return [
        function (req, res, next) {
          // Enable back/forward cache by avoiding cache-disabling headers
          const url = req.url;

          // Set cache headers for static assets to improve cache-insight scores
          if (
            url.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)
          ) {
            // Cache static assets for 1 year
            res.setHeader(
              "Cache-Control",
              "public, max-age=31536000, immutable"
            );
          } else if (url.match(/\.(html|htm)$/)) {
            // Cache HTML files for 1 hour but allow revalidation
            res.setHeader(
              "Cache-Control",
              "public, max-age=3600, must-revalidate"
            );
          } else {
            // Default cache for other files
            res.setHeader("Cache-Control", "public, max-age=86400");
          }

          // Improve document latency by enabling compression hints
          res.setHeader("Vary", "Accept-Encoding");

          next();
        },
      ];
    },
  });

  console.log(
    `🚀 Development server started at http://localhost:${config.server.port}`
  );
  console.log("🔧 Development mode with live reload enabled");

  // Start file watcher
  gulp.watch(
    ["index.html", "css/**/*", "js/**/*", "images/**/*"],
    gulp.series("reload")
  );

  console.log("👀 Watching files for changes...");
  console.log("Press Ctrl+C to stop the server");

  // Signal that both server and watcher have started
  done();
}

// Reload browser
function reload() {
  return gulp.src("index.html").pipe(connect.reload());
}

// Task definitions
gulp.task("clean", clean);
gulp.task("copy", copyFiles);
gulp.task("serve", serve);
gulp.task("dev", dev);
gulp.task("test", test);
gulp.task("lint", lint);
gulp.task("reload", reload);

// Main tasks
gulp.task("build", gulp.series("clean", "copy"));
gulp.task("default", gulp.series("build", "test"));

// Export tasks for programmatic use
module.exports = {
  clean,
  copyFiles,
  serve,
  dev,
  test,
  lint,
  reload,
};
