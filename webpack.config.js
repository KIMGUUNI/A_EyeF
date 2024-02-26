const path = require('path');

module.export ={
    name : 'webpack-install-test',
    mode : 'development',
    devtool : 'eval',
    resolve : {
        extensions:['.js', '.jsx'],
    },
    entry :{
        app:['./client'],

    },
    output : {
        path : path.join(__dirname, 'dist'),
        filename : 'app.js'
    }
}