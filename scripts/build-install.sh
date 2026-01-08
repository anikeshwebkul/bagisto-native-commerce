# Exit immediately if a command fails
set -e

echo "Stop the project..."
pkill -f "next dev" || echo "No next dev process running"

echo "Uninstalling previous local dependencies..."
npm uninstall @bagisto-native/core @bagisto-native/react

echo "Clearing npm cache..."
npm cache clean --force

echo "Installing local dependency (@bagisto-native/core)..."
npm install /home/users/satish.tiwari/www/html/hotwire/bagisto/hotwire-app/core/bagisto-native-core-1.0.1.tgz --force

echo "Installing local dependency (@bagisto-native/react)..."
npm install /home/users/satish.tiwari/www/html/hotwire/bagisto/hotwire-app/packages/react/bagisto-native-react-1.0.0.tgz --force

echo "Run the project..."
npm run dev

echo "Done! Happy Coding!!"
