const gulp = require('gulp')
const connect = require('gulp-connect')
const fs = require('fs')
const path = require('path')
const yargs = require('yargs')

// Configuration
const root = yargs.argv.root || '.'
const port = yargs.argv.port || 8000
const host = yargs.argv.host || 'localhost'

// Clean dist directory
function clean() {
    return new Promise((resolve) => {
        if (fs.existsSync('dist')) {
            fs.rmSync('dist', { recursive: true, force: true })
        }
        console.log('🧹 Cleaned dist directory')
        resolve()
    })
}

// Helper function to copy directory recursively
function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true })
    }

    const items = fs.readdirSync(src)
    items.forEach((item) => {
        const srcPath = path.join(src, item)
        const destPath = path.join(dest, item)

        if (fs.statSync(srcPath).isDirectory()) {
            copyDirectory(srcPath, destPath)
        } else {
            fs.copyFileSync(srcPath, destPath)
        }
    })
}

// Build task - copy files to dist directory
function copyFiles() {
    return new Promise((resolve, reject) => {
        try {
            // Always start from a clean slate
            if (fs.existsSync('dist')) {
                fs.rmSync('dist', { recursive: true, force: true })
            }
            console.log('🧹 Cleaned dist directory')
            console.log('🔨 Building presentation template...')

            // Create dist directory
            fs.mkdirSync('dist', { recursive: true })

            // Copy main HTML file
            if (fs.existsSync('index.html')) {
                fs.copyFileSync('index.html', 'dist/index.html')
                console.log('✅ Copied index.html')
            }

            // Copy directories if they exist
            const dirsToCopy = ['css', 'js', 'images', 'videos', 'slides']
            dirsToCopy.forEach((dir) => {
                if (fs.existsSync(dir)) {
                    copyDirectory(dir, `dist/${dir}`)
                    console.log(`✅ Copied ${dir}/`)
                }
            })

            // Copy reveal.js dependencies
            const revealSrc = 'node_modules/reveal.js'
            const revealDest = 'dist/node_modules/reveal.js'

            if (fs.existsSync(revealSrc)) {
                fs.mkdirSync(revealDest, { recursive: true })

                // Copy essential reveal.js files
                ;['dist', 'plugin'].forEach((subdir) => {
                    const srcPath = path.join(revealSrc, subdir)
                    const destPath = path.join(revealDest, subdir)
                    if (fs.existsSync(srcPath)) {
                        copyDirectory(srcPath, destPath)
                        console.log(`✅ Copied reveal.js ${subdir}/`)
                    }
                })
            }

            // Copy reveal_external plugin (required for loading slides from external files)
            const revealExternalSrc = 'node_modules/reveal_external'
            const revealExternalDest = 'dist/node_modules/reveal_external'

            if (fs.existsSync(revealExternalSrc)) {
                copyDirectory(revealExternalSrc, revealExternalDest)
                console.log('✅ Copied reveal_external/')
            }

            console.log('🎉 Build complete! Files ready in dist/ directory')
            resolve()
        } catch (error) {
            console.error('❌ Build failed:', error)
            reject(error)
        }
    })
}

// Simple test to verify essential files exist
function test() {
    return new Promise((resolve, reject) => {
        console.log('🧪 Running template tests...')

        const requiredFiles = ['index.html', 'css/custom.css', 'js/custom.js']

        const missing = requiredFiles.filter((file) => !fs.existsSync(file))

        if (missing.length > 0) {
            console.error('❌ Missing required files:', missing)
            reject(new Error(`Missing files: ${missing.join(', ')}`))
            return
        }

        console.log('✅ All required template files found')
        console.log('✅ Template tests passed')
        resolve()
    })
}

// Development server with live reload
function serve(done) {
    const server = connect.server({
        root: root,
        port: port,
        host: host,
        livereload: true,
        open: true,
    })

    server.server.on('error', function (err) {
        if (err.code === 'EADDRINUSE') {
            console.error(
                `❌ Port ${port} is already in use. Run: lsof -ti:${port} | xargs kill -9`
            )
            process.exit(1)
        }
        throw err
    })

    console.log(`🚀 Development server started at http://${host}:${port}`)
    console.log('🔧 Development mode with live reload enabled')

    // Watch for file changes
    gulp.watch(
        ['index.html', 'css/**/*.css', 'js/**/*.js', 'images/**/*'],
        function (cb) {
            console.log('📝 File change detected, reloading browser...')
            return gulp.src('index.html').pipe(connect.reload())
        }
    )

    console.log('👀 Watching files for changes...')
    console.log('Press Ctrl+C to stop the server')
    done()
}

// Production-like server without file watching (for testing/lighthouse)
function serveProduction(done) {
    connect.server({
        root: root,
        port: port,
        host: host,
        livereload: false,
        middleware: function (connect, opt) {
            return [
                function (req, res, next) {
                    const url = req.url

                    // Set cache headers for better performance
                    if (
                        url.match(
                            /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/
                        )
                    ) {
                        res.setHeader(
                            'Cache-Control',
                            'public, max-age=31536000, immutable'
                        )
                    } else if (url.match(/\.(html|htm)$/)) {
                        res.setHeader(
                            'Cache-Control',
                            'public, max-age=3600, must-revalidate'
                        )
                    } else {
                        res.setHeader('Cache-Control', 'public, max-age=86400')
                    }

                    res.setHeader('Vary', 'Accept-Encoding')
                    next()
                },
            ]
        },
    })

    console.log(`🚀 Production server started at http://${host}:${port}`)
    console.log('📈 Optimized for performance testing (no file watching)')
    done()
}

// Preview server for built dist/ output
function servePreview(done) {
    connect.server({
        root: 'dist',
        port: port,
        host: host,
        livereload: false,
        open: true,
    })
    console.log(`🚀 Preview server started at http://${host}:${port}`)
    console.log('Serving built files from dist/')
    done()
}

// Task definitions
gulp.task('clean', clean)
gulp.task('build', gulp.series('clean', copyFiles))
gulp.task('test', test)
gulp.task('serve', serve)
gulp.task('serve:prod', serveProduction)
gulp.task('preview', servePreview)
gulp.task('default', gulp.series('test'))

// Export functions for programmatic use
module.exports = {
    clean,
    build: copyFiles,
    test,
    serve,
    serveProduction,
}
