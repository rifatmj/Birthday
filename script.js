const introText = document.getElementById("introText");
const intro = document.getElementById("intro");
const walk = document.getElementById("walk");
const player = document.querySelector(".player");
const doorScene = document.getElementById("doorScene");
const door = document.getElementById("door");
const room = document.getElementById("room");
const party = document.getElementById("party");
const lightSwitch = document.getElementById("switch");
const boy = document.getElementById("boy");
const message = document.getElementById("message");

const music = document.getElementById("music");
const voice = document.getElementById("voice");

/* INTRO */
const introMsg = "Nitu... this is for you ❤️";
let i = 0;

function typeIntro() {
  if (i < introMsg.length) {
    introText.innerHTML += introMsg[i++];
    setTimeout(typeIntro, 60);
  } else {
    setTimeout(() => {
      intro.classList.add("hidden");
      walk.classList.remove("hidden");
    }, 800);
  }
}
typeIntro();

/* WALK */
walk.addEventListener("click", () => {
  player.style.left = "70%";

  setTimeout(() => {
    walk.classList.add("hidden");
    doorScene.classList.remove("hidden");
  }, 2000);
});

/* DOOR */
door.addEventListener("click", () => {
  door.classList.add("open");

  setTimeout(() => {
    doorScene.classList.add("hidden");
    room.classList.remove("hidden");
    startParticles();
  }, 1000);
});

/* SWITCH */
lightSwitch.addEventListener("click", () => {
  room.classList.add("hidden");
  party.classList.remove("hidden");

  music.play().catch(()=>{});
  voice.play().catch(()=>{});

  boy.style.opacity = 1;

  typeMessage();
  startFireworks();
});

/* MESSAGE */
const msg = "Happy Birthday Nitu 💖";
let j = 0;

function typeMessage() {
  if (j < msg.length) {
    message.innerHTML += msg[j++];
    setTimeout(typeMessage, 50);
  }
}

/* PARTICLES */
function startParticles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const dots = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    dots.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.y += 0.5;
      if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* FIREWORKS (FIXED) */
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  let particles = [];

  function burst(x, y) {
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: `hsl(${Math.random() * 360},100%,60%)`
      });
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.01;

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, 2, 2);

      if (p.alpha <= 0) particles.splice(i, 1);
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  animate();

  setInterval(() => {
    burst(
      Math.random() * canvas.width,
      Math.random() * canvas.height / 2
    );
  }, 700);
}