const path                    = require( 'path' );

const merge                   = require( 'lodash.merge' );
const MiniCssExtractPlugin    = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const UglifyJsPlugin          = require( 'uglifyjs-webpack-plugin' );

const baseConfig              = require( './base' );


/* webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production */

const distConfig = merge( {}, baseConfig, {
    output : { libraryTarget: 'umd' },

    devtool   : 'source-map',
    externals : {
        'codemirror/mode/jsx/jsx' : {
            commonjs  : 'codemirror/mode/jsx/jsx',
            commonjs2 : 'codemirror/mode/jsx/jsx',
        },
        'componentDriver' : {
            commonjs  : 'nessie-ui/dist/componentDriver',
            commonjs2 : 'nessie-ui/dist/componentDriver',
            'window'  : 'ComponentDriver',
        },
        'flounder/src/core/flounder' : {
            commonjs  : 'flounder/src/core/flounder',
            commonjs2 : 'flounder/src/core/flounder',
            'window'  : 'Flounder',
        },
        'nessie-ui' : {
            'commonjs'  : 'nessie-ui',
            'commonjs2' : 'nessie-ui',
            'window'    : 'Nessie',
        },
        'prop-types' : {
            'commonjs'  : 'prop-types',
            'commonjs2' : 'prop-types',
            'window'    : 'PropTypes',
        },
        addons : {
            'commonjs'  : 'nessie-ui/dist/addons',
            'commonjs2' : 'nessie-ui/dist/addons',
        },
        codemirror : {
            'commonjs'  : 'codemirror',
            'commonjs2' : 'codemirror',
            'window'    : 'CodeMirror',
        },
        react : {
            'commonjs'  : 'react',
            'commonjs2' : 'react',
            'window'    : 'React',
        },
        mode         : 'production',
        optimization : {
            minimizer : [
                new UglifyJsPlugin( {
                    cache     : true,
                    parallel  : true,
                    sourceMap : true,
                } ),
            ],
        },
    },
} );

const components = merge( {}, distConfig, {
    entry   : path.join( __dirname, '../src/index.js' ),
    output  : { filename: 'index.js' },
    plugins : [],
} );
components.module.rules[ 1 ].use[ 0 ] = 'style-loader';

const componentDriver = merge( {}, distConfig, {
    entry  : path.join( __dirname, '../src/Testing/index.js' ),
    output : { filename: 'componentDriver.js' },
} );

const componentsJS = merge( {}, distConfig, {
    entry   : path.join( __dirname, '../src/index.js' ),
    output  : { filename: 'componentsJS.js' },
    plugins : [
        new MiniCssExtractPlugin( {
            allChunks : true,
            filename  : 'styles.css',
        } ),
        new OptimizeCSSAssetsPlugin( {
            cssProcessorOptions : { map: { inline: false } },
        } ),
    ],
} );

const driverSuite = merge( {}, distConfig, {
    entry   : path.join( __dirname, '../src/drivers.js' ),
    output  : { filename: 'driverSuite.js' },
    plugins : [
        new MiniCssExtractPlugin( {
            allChunks : true,
            filename  : 'driverSuite.css',
        } ),
        new OptimizeCSSAssetsPlugin( {
            cssProcessorOptions : { map: { inline: false } },
        } ),
    ],
} );


module.exports = [
    componentDriver,
    components,
    componentsJS,
    driverSuite,
];
