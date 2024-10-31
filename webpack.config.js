const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app/components/RentalForm.tsx', // Entry for your component
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Optional, since it may not be used directly by Cypress
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};