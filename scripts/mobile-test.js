import { exec } from "child_process";
import { networkInterfaces } from "os";

function getLocalIP() {
  const interfaces = networkInterfaces();
  for (const interfaceName of Object.keys(interfaces)) {
    for (const networkInterface of interfaces[interfaceName]) {
      if (networkInterface.family === "IPv4" && !networkInterface.internal) {
        return networkInterface.address;
      }
    }
  }
  return "localhost";
}

const ipAddress = getLocalIP();

console.log("\n🚀 Starting development server for mobile testing...\n");
console.log(`📱 Access from mobile devices:`);
console.log(`   http://${ipAddress}:3000\n`);
console.log(`💻 Local access:`);
console.log(`   http://localhost:3000\n`);
console.log("📋 Mobile testing checklist:");
console.log("   □ Navigation menu works on mobile");
console.log("   □ Buttons are touch-friendly (44px minimum)");
console.log("   □ Text is readable without zooming");
console.log("   □ Forms are easy to fill on mobile");
console.log("   □ Images load properly");
console.log("   □ Horizontal scrolling is avoided");
console.log("   □ Page loads quickly on mobile networks");
console.log("   □ Language selector works on mobile");
console.log("   □ Project filters work on touch devices");
console.log("   □ Language cards flip properly on mobile\n");

console.log("💡 Quick testing tips:");
console.log("   • Use Chrome DevTools device emulation (F12 → Device icon)");
console.log("   • Test both portrait and landscape orientations");
console.log("   • Try different device sizes (iPhone, iPad, Android)");
console.log("   • Check touch gestures and scrolling");
console.log("   • Verify text size and readability\n");

exec("npm run dev -- -H 0.0.0.0", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(stdout);
  if (stderr) console.error(stderr);
});
