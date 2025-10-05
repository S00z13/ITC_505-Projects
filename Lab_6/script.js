function sayHello() {
  const name = document.getElementById('nameInput').value;
  const greeting = `🚀 Welcome aboard, Captain ${name}! Take your protein pill and get your JavaScript helmet on!. 🌌`;
  document.getElementById('greeting').textContent = greeting;
}
