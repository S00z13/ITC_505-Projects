function sayHello() {
  const name = document.getElementById('nameInput').value;
  const greeting = `🚀 Welcome aboard, Captain ${name}! You're cleared for JavaScript liftoff. 🌌`;
  document.getElementById('greeting').textContent = greeting;
}
