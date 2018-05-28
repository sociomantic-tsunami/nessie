const path                    = require( 'path' );

const webpack                 = require( 'webpack' );
const HappyPack               = require( 'happypack' );
const UglifyJsPlugin          = require( 'uglifyjs-webpack-plugin' );
const MiniCssExtractPlugin    = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const cloneDeep               = require( 'lodash.clonedeep' );

const baseConfig              = require( './base' );
const defaultSettings         = require( './defaults' );


const commonDistPLugins = [

    new webpack.LoaderOptionsPlugin( {
        debug : false
    } ),

    new HappyPack( {
        id      : 'js',
        loaders : [ 'babel-loader' ],
        threads : 2
    } )

];

const commonJsConfig = Object.assign( {}, baseConfig, {
    entry : {
        index           : path.join( __dirname, '../src/index.js' ),
        componentDriver : path.join( __dirname, '../src/Testing/index.js' ),
        driverSuite     : path.join( __dirname, '../src/drivers.js' ),
        addons          : path.join( __dirname, '../src/addons.js' ),
        css             : [
            path.join( __dirname, '../src/index.js' ),
            path.join( __dirname, '../src/addons.js' ),
        ],
    },
    output : {
        path          : path.join( __dirname, '/../dist' ),
        filename      : '[name].js',
        publicPath    : defaultSettings.publicPath,
        libraryTarget : 'commonjs2'
    },

    cache : false,

    devtool : 'source-map',

    externals :
    {
        'nessie-ui' : 'nessie-ui/dist/index.js',

        'componentDriver' : 'nessie-ui/dist/componentDriver.js',

        'prop-types' :
        {
            window    : 'PropTypes',
            root      : 'PropTypes',
            commonjs2 : 'prop-types',
            commonjs  : 'prop-types',
            amd       : 'prop-types'
        },
        react :
        {
            window    : 'React',
            root      : 'React',
            commonjs2 : 'react',
            commonjs  : 'react',
            amd       : 'react'
        },
        'react-dom' :
        {
            window    : 'ReactDOM',
            root      : 'ReactDOM',
            commonjs2 : 'react-dom',
            commonjs  : 'react-dom',
            amd       : 'react-dom'
        }
    },

    optimization :
    {
        minimizer : [
            new UglifyJsPlugin( {
                cache     : true,
                parallel  : true,
                sourceMap : true // set to true if you want JS source maps
            } ),
            new OptimizeCSSAssetsPlugin( {} )
        ]
    },

    plugins : commonDistPLugins.concat( [
        new MiniCssExtractPlugin( {
            fallback  : 'style-loader',
            filename  : '[name].css',
            allChunks : true
        } ),
        new HappyPack( {
            id      : 'styles',
            loaders : [
                {
                    loader  : 'css-loader',
                    options :
                    {
                        modules        : true,
                        localIdentName : '[name]__[local]',
                        importLoaders  : 1
                    }
                },
                {
                    loader : 'postcss-loader'
                }
            ],
            threads : 2
        } ),

    ] ),

    module : defaultSettings.getDefaultModules()
} );


// Setup
const windowConfig = cloneDeep( commonJsConfig );

windowConfig.entry =  path.join( __dirname, '../src/index.js' );

windowConfig.output.filename = 'displayComponents.js';
windowConfig.output.libraryTarget = 'window';
windowConfig.output.library = 'DisplayComponents';
windowConfig.plugins = commonDistPLugins.concat( [
    new MiniCssExtractPlugin( {
        fallback  : 'style-loader',
        filename  : 'displayComponentStyles.css',
        allChunks : true
    } ),
    new HappyPack( {
        id      : 'styles',
        loaders : [
            {
                loader  : 'css-loader',
                options :
                {
                    modules        : true,
                    localIdentName : '[name]__[local]__[hash:base64:5]',
                    importLoaders  : 1
                }
            },
            {
                loader : 'postcss-loader'
            }
        ],
        threads : 2
    } ),

] );

module.exports = [ commonJsConfig, windowConfig ];
